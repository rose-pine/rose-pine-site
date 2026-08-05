import { Octokit, type RestEndpointMethodTypes } from "@octokit/rest";
import { readdir, readFile, writeFile } from "node:fs/promises";
import YAML from "yaml";

type CustomProperties = {
	hidden?: string;
	name?: string;
	category?: string;
};

type Repo =
	RestEndpointMethodTypes["repos"]["listForOrg"]["response"]["data"][number] & {
		custom_properties?: CustomProperties;
	};

type Contributor = { name: string; image?: string; url: string };

type Subtheme = { name: string; url: string };

type RepoData = {
	name?: string;
	url: string;
	category: string;
	updatedAt: string;
	tags?: string[];
	contributors: Contributor[];
	subthemes?: Subtheme[];
	related?: string[];
};

type RepoOutput = { slug: string; data: RepoData };

const ORG = "rose-pine";
const REPOS_DIR = "src/content/official-repos";
const CONCURRENCY = 20;

const token = process.env.GITHUB_TOKEN;
if (!token) {
	throw new Error(
		"missing GITHUB_TOKEN. try: export GITHUB_TOKEN=$(gh auth token)",
	);
}

const octokit = new Octokit({ auth: token });

async function listRepos(octokit: Octokit): Promise<Repo[]> {
	const repos = await octokit.paginate(octokit.rest.repos.listForOrg, {
		org: ORG,
		type: "public",
		per_page: 100,
	});
	return repos;
}

async function listContributors(
	octokit: Octokit,
	repo: string,
): Promise<Contributor[]> {
	const users = await octokit.paginate(octokit.rest.repos.listContributors, {
		owner: ORG,
		repo,
		per_page: 100,
	});
	return users.map(toContributor);
}

async function listSubthemeDirs(octokit: Octokit): Promise<string[]> {
	const { data } = await octokit.rest.repos.getContent({
		owner: ORG,
		repo: "userstyles",
		path: "styles",
	});
	if (!Array.isArray(data)) {
		throw new Error("missing directories in styles/");
	}
	return data
		.filter((entry) => entry.type === "dir")
		.map((entry) => entry.name);
}

async function getSubthemeName(octokit: Octokit, dir: string): Promise<string> {
	const { data } = await octokit.rest.repos.getContent({
		owner: ORG,
		repo: "userstyles",
		path: `styles/${dir}/style.json`,
	});
	if (!("content" in data)) {
		throw new Error(`missing style.json in styles/${dir}`);
	}

	const style = JSON.parse(Buffer.from(data.content, "base64").toString());
	return style.name;
}

async function getSubtheme(octokit: Octokit, dir: string): Promise<Subtheme> {
	const name = await getSubthemeName(octokit, dir);
	return {
		name,
		url: `https://github.com/${ORG}/userstyles/tree/main/styles/${dir}`,
	};
}

async function listSubthemes(octokit: Octokit): Promise<Subtheme[]> {
	const dirs = await listSubthemeDirs(octokit);
	return mapWithConcurrency(dirs, CONCURRENCY, (dir) =>
		getSubtheme(octokit, dir),
	);
}

async function enrichRepo(octokit: Octokit, repo: Repo): Promise<RepoOutput> {
	const [contributors, subthemes] = await Promise.all([
		listContributors(octokit, repo.name),
		repo.name === "userstyles" ? listSubthemes(octokit) : undefined,
	]);
	return toRepoData(repo, { contributors, subthemes });
}

function visibleRepos(repos: Repo[]): Repo[] {
	return repos.filter(
		(repo) => !repo.archived && repo.custom_properties?.hidden !== "true",
	);
}

function toContributor(user: {
	login?: string;
	html_url?: string;
	avatar_url?: string;
}): Contributor {
	return {
		name: user.login!,
		url: user.html_url!,
		...(user.avatar_url && { image: user.avatar_url }),
	};
}

function isRepetitiveTopic(
	topic: string,
	displayName?: string,
	category?: string,
): boolean {
	return [
		"rose-pine",
		"soho-vibes",
		"theme",
		"app",
		displayName?.toLowerCase().replaceAll(" ", "-"),
		category?.toLowerCase(),
	].includes(topic);
}

function toRepoData(
	repo: Repo,
	enrichment: { contributors: Contributor[]; subthemes?: Subtheme[] },
): RepoOutput {
	const { name, html_url, pushed_at, topics, custom_properties } = repo;
	const displayName =
		custom_properties?.name !== "App" ? custom_properties?.name : undefined;
	const tags =
		topics?.filter(
			(topic) =>
				!isRepetitiveTopic(topic, displayName, custom_properties?.category),
		) ?? [];

	return {
		slug: name,
		data: {
			name: displayName,
			url: html_url,
			category: custom_properties?.category ?? "",
			updatedAt: pushed_at!,
			tags: tags.length > 0 ? tags : undefined,
			subthemes: enrichment.subthemes,
			contributors: enrichment.contributors,
		},
	};
}

function mergeRepoData(
	existing: Record<string, unknown>,
	incoming: RepoData,
): RepoData {
	return {
		name: incoming.name,
		url: incoming.url,
		category: incoming.category,
		related: existing.related as string[] | undefined,
		updatedAt: incoming.updatedAt,
		tags: incoming.tags,
		subthemes: incoming.subthemes,
		contributors: incoming.contributors,
	};
}

function localOnlyFiles(
	localFiles: string[],
	remoteNames: Set<string>,
): string[] {
	return localFiles
		.map((file) => file.replace(/\.yaml$/, ""))
		.filter((name) => !remoteNames.has(name));
}

function chunk<T>(items: T[], size: number): T[][] {
	return Array.from({ length: Math.ceil(items.length / size) }, (_, i) =>
		items.slice(i * size, i * size + size),
	);
}

async function mapWithConcurrency<T, R>(
	items: T[],
	limit: number,
	fn: (item: T) => Promise<R>,
): Promise<R[]> {
	const groups: R[][] = [];
	for (const group of chunk(items, limit)) {
		groups.push(await Promise.all(group.map(fn)));
	}
	return groups.flat();
}

function isMissingFile(error: unknown): boolean {
	return (error as NodeJS.ErrnoException)?.code === "ENOENT";
}

async function readRepoYaml(
	filePath: string,
): Promise<Record<string, unknown>> {
	try {
		const raw = await readFile(filePath, "utf-8");
		return YAML.parse(raw) ?? {};
	} catch (error) {
		if (isMissingFile(error)) {
			return {};
		}
		throw error;
	}
}

async function writeRepoYaml(
	filePath: string,
	repo: RepoOutput,
): Promise<void> {
	const existing = await readRepoYaml(filePath);
	await writeFile(filePath, YAML.stringify(mergeRepoData(existing, repo.data)));
}

async function writeRepos(repos: RepoOutput[]): Promise<void> {
	await Promise.all(
		repos.map((repo) => writeRepoYaml(`${REPOS_DIR}/${repo.slug}.yaml`, repo)),
	);
}

async function reportLocalOnly(repos: RepoOutput[]): Promise<void> {
	const localFiles = await readdir(REPOS_DIR);
	const remoteNames = new Set(repos.map((repo) => repo.slug));
	const localOnly = localOnlyFiles(localFiles, remoteNames);
	if (localOnly.length > 0) {
		console.warn("\nfound local files with no matching upstream:");
		for (const slug of localOnly) {
			console.warn(`- ${REPOS_DIR}/${slug}.yaml`);
		}
	}
}

async function main() {
	const repos = await listRepos(octokit);
	const visible = visibleRepos(repos);

	console.log(`enriching ${visible.length} repos...`);

	const enriched = await mapWithConcurrency(visible, CONCURRENCY, (repo) =>
		enrichRepo(octokit, repo),
	);
	await writeRepos(enriched);
	if (!process.env.CI) {
		await reportLocalOnly(enriched);
	}

	console.log("done.");
}

main();
