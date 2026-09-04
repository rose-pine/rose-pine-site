import { readdir, readFile, writeFile } from "node:fs/promises";
import { parse, stringify } from "yaml";
import type { Contributor, RepoData, Userstyle } from "../src/types/repo.ts";

const ORG = "rose-pine";
const OUTPUT = "./src/content/repos";
const BATCH_SIZE = 20;

const GITHUB_URL_PATTERN = /github\.com\/([^/\s]+)\/([^/\s/?#]+)/;

type GithubContent = {
	name: string;
	content: string;
	type: "file" | "dir";
};

type GithubContributor = {
	login: string;
	html_url: string;
	avatar_url: string;
};

type GithubRepo = {
	name: string;
	full_name: string;
	private: boolean;
	owner: {
		login: string;
	};
	html_url: string;
	pushed_at: string;
	archived: boolean;
	topics: string[];
	custom_properties?: {
		hidden: "true" | "false";
		category: string;
		name?: string;
	};
};

async function github<T>(url: string): Promise<T> {
	const token = process.env.GITHUB_TOKEN;
	if (!token) {
		throw new Error("missing GITHUB_TOKEN");
	}

	const headers = {
		Accept: "application/vnd.github+json",
		Authorization: `Bearer ${token}`,
		"User-Agent": "rose-pine",
	};

	const response = await fetch(`https://api.github.com${url}`, { headers });
	if (!response.ok) {
		throw new Error(`Unable to fetch ${url} (${response.status})`);
	}

	return (await response.json()) as T;
}

function githubSlugFromURL(url: string): string | null {
	const match = url.match(GITHUB_URL_PATTERN);
	return match ? `${match[1]}/${match[2]}` : null;
}

function isRepoActive(repo: GithubRepo): boolean {
	return (
		repo.custom_properties?.hidden !== "true" && !repo.private && !repo.archived
	);
}

function ordinaryTopics(repo: GithubRepo): string[] | undefined {
	const name = repo.custom_properties?.name;
	const category = repo.custom_properties?.category?.toLowerCase();
	const repetitive = new Set([
		"rose-pine",
		"soho-vibes",
		"theme",
		"app",
		name?.toLowerCase().replaceAll(" ", "-"),
		category,
	]);
	const tags = repo.topics.filter((topic) => !repetitive.has(topic));
	return tags.length ? tags : undefined;
}

async function* paginate<T>(url: string, page = 1): AsyncGenerator<T> {
	const data = await github<T[]>(`${url}?per_page=100&page=${page}`);
	if (!data.length) return;

	yield* data;
	yield* paginate<T>(url, page + 1);
}

async function inBatches<T, R>(
	items: T[],
	fn: (item: T) => Promise<R>,
): Promise<R[]> {
	const results: R[] = [];
	for (let i = 0; i < items.length; i += BATCH_SIZE) {
		results.push(
			...(await Promise.all(items.slice(i, i + BATCH_SIZE).map(fn))),
		);
	}
	return results;
}

async function fetchOrgRepos(org = ORG): Promise<GithubRepo[]> {
	return (
		await Array.fromAsync(paginate<GithubRepo>(`/orgs/${org}/repos`))
	).filter(isRepoActive);
}

async function fetchRepo(fullName: string): Promise<GithubRepo> {
	return await github(`/repos/${fullName}`);
}

async function fetchContributors(fullName: string): Promise<Contributor[]> {
	try {
		const contributors = await Array.fromAsync(
			paginate<GithubContributor>(`/repos/${fullName}/contributors`),
		);
		return contributors
			.filter((contributor) => !contributor.login.includes("[bot]"))
			.map((contributor) => ({
				name: contributor.login,
				url: contributor.html_url,
				image: contributor.avatar_url,
			}));
	} catch (error) {
		console.warn(
			`Skipping contributors for ${fullName}: ${(error as Error).message}`,
		);
		return [];
	}
}

async function fetchUserstyles(): Promise<Userstyle[]> {
	const dirs = (
		await github<GithubContent[]>(`/repos/${ORG}/userstyles/contents/styles`)
	)
		.filter((entry) => entry.type === "dir")
		.map((entry) => entry.name);

	const userstyles = await inBatches(dirs, async (name) => {
		try {
			const file = await github<GithubContent>(
				`/repos/${ORG}/userstyles/contents/styles/${name}/style.json`,
			);
			const style = JSON.parse(Buffer.from(file.content, "base64").toString());
			return {
				name: style.name,
				url: `https://github.com/${ORG}/userstyles/tree/main/styles/${name}`,
			};
		} catch (error) {
			console.warn(`Skipping userstyle ${name}: ${(error as Error).message}`);
			return null;
		}
	});

	return userstyles.filter(
		(userstyle): userstyle is Userstyle => userstyle !== null,
	);
}

async function readLocalRepos(): Promise<{ repo: RepoData; file: string }[]> {
	const files = (await readdir(OUTPUT)).filter((f) => f.endsWith(".yaml"));
	return await Promise.all(
		files.map(async (file) => ({
			repo: parse(await readFile(`${OUTPUT}/${file}`, "utf-8")) as RepoData,
			file,
		})),
	);
}

function isOrgRepo(remote: GithubRepo): boolean {
	return remote.owner.login === ORG;
}

async function enrichRepo(
	local: RepoData | undefined,
	remote: GithubRepo,
): Promise<RepoData> {
	const org = isOrgRepo(remote);
	const fullName = githubSlugFromURL(remote.html_url) ?? "";
	const contributors = await fetchContributors(fullName);
	const userstyles =
		fullName === `${ORG}/userstyles`
			? await fetchUserstyles()
			: local?.userstyles;

	return {
		...local,
		type: org ? "official" : "community",
		name: org
			? (remote.custom_properties?.name ?? remote.name)
			: (local?.name ?? remote.name),
		category: remote.custom_properties?.category ?? local?.category ?? "none",
		url: remote.html_url,
		tags: org ? (ordinaryTopics(remote) ?? []) : local?.tags,
		contributors,
		updatedAt: new Date(remote.pushed_at),
		...(userstyles && { userstyles }),
	};
}

async function seedOrgRepos(
	localRepos: { repo: RepoData; file: string }[],
): Promise<{ repo: RepoData; file: string }[]> {
	const remotes = await fetchOrgRepos();
	const newRepos = await Promise.all(
		remotes
			.filter(
				(remote) =>
					!localRepos.some((local) => local.repo.url === remote.html_url),
			)
			.map(async (remote) => ({
				repo: await enrichRepo(undefined, remote),
				file: `${remote.name}.yaml`,
			})),
	);

	if (newRepos.length) {
		console.info(
			`Adding ${newRepos.length} new org repo(s): ${newRepos
				.map(({ repo }) => repo.name)
				.join(", ")}`,
		);
	} else {
		console.info("No new org repos to add");
	}

	return [...localRepos, ...newRepos];
}

async function enrichEntry(entry: {
	repo: RepoData;
	file: string;
}): Promise<{ repo: RepoData; file: string }> {
	const { repo: local, file } = entry;
	const fullName = githubSlugFromURL(local.url);
	if (!fullName) {
		console.warn(`Skipping ${local.name}: unable to parse URL ${local.url}`);
		return entry;
	}

	let remote: GithubRepo;
	try {
		remote = await fetchRepo(fullName);
	} catch (error) {
		console.warn(`Skipping ${local.name}: ${(error as Error).message}`);
		return entry;
	}

	const moved = remote.html_url !== local.url;
	if (moved) {
		console.info(`Moving ${local.name}: ${local.url} → ${remote.html_url}`);
	}

	const repo = await enrichRepo(local, remote);
	const newFile = moved && isOrgRepo(remote) ? `${remote.name}.yaml` : file;
	return { repo, file: newFile };
}

async function writeRepos(
	items: { repo: RepoData; file: string }[],
): Promise<void> {
	const written = new Set<string>();
	const seen = new Set<string>();

	for (const { repo, file } of items) {
		if (seen.has(file)) {
			console.warn(`Skipping ${repo.name}: conflicts with existing ${file}`);
			continue;
		}
		seen.add(file);
		await writeFile(`${OUTPUT}/${file}`, stringify(repo));
		written.add(file);
	}

	const leftover = (await readdir(OUTPUT))
		.filter((f) => f.endsWith(".yaml"))
		.filter((f) => !written.has(f));

	for (const file of leftover) {
		console.warn(`Skipping stale file ${file}`);
	}
}

async function main(): Promise<void> {
	const localRepos = await readLocalRepos();
	console.info(`Found ${localRepos.length} local repo(s)`);

	const allRepos = await seedOrgRepos(localRepos);
	console.info(`Fetching details for ${allRepos.length} repo(s)`);
	const items = await inBatches(allRepos, enrichEntry);

	await writeRepos(items);
	console.info("Done writing repos");
}

main();
