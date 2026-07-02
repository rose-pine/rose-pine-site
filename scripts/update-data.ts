import { Octokit } from "@octokit/rest";
import { writeFile, readdir } from "node:fs/promises";
import YAML from "yaml";

const token = process.env.GITHUB_TOKEN;
if (!token) {
	console.error(
		"missing GITHUB_TOKEN. try: export GITHUB_TOKEN=$(gh auth token)",
	);
	process.exit(1);
}

const octokit = new Octokit({ auth: token });

interface RepoResult {
	repoName: string;
	data: Record<string, unknown>;
}

console.log("fetching latest repos...");

const rawRepos = await octokit.paginate(octokit.rest.repos.listForOrg, {
	org: "rose-pine",
	type: "public",
	per_page: 100,
});

const visible = rawRepos.filter(
	(repo) =>
		!repo.archived && (repo as any).custom_properties?.hidden !== "true",
);

const repos: RepoResult[] = [];
let index = 0;
const workers = Array.from({ length: 10 }, async () => {
	while (index < visible.length) {
		const i = index++;
		const repo = visible[i];
		const { name, stargazers_count, updated_at, topics } = repo;
		const customProperties = (repo as any).custom_properties as
			Record<string, string> | undefined;

		let contributors: { name: string; url: string }[] = [];
		try {
			const list = await octokit.paginate(octokit.rest.repos.listContributors, {
				owner: "rose-pine",
				repo: name,
				per_page: 100,
			});
			contributors = list.map((contributor) => ({
				name: contributor.login!,
				url: contributor.html_url!,
			}));
		} catch {}

		let subthemes: { name: string; author: string; url: string }[] = [];
		if (name === "userstyles") {
			try {
				const { data: entries } = await octokit.rest.repos.getContent({
					owner: "rose-pine",
					repo: "userstyles",
					path: "styles",
				});
				if (Array.isArray(entries)) {
					const dirs = entries.filter((e) => e.type === "dir");
					subthemes = await Promise.all(
						dirs.map(async (dir) => {
							try {
								const { data } = await octokit.rest.repos.getContent({
									owner: "rose-pine",
									repo: "userstyles",
									path: `styles/${dir.name}/style.json`,
								});
								if ("content" in data) {
									const content = Buffer.from(
										data.content,
										"base64",
									).toString();
									const json = JSON.parse(content);
									return {
										name: json.name,
										author: json.author,
										url: `https://github.com/rose-pine/userstyles/tree/main/styles/${dir.name}`,
									};
								}
							} catch {}
							return {
								name: dir.name,
								author: "",
								url: `https://github.com/rose-pine/userstyles/tree/main/styles/${dir.name}`,
							};
						}),
					);
				}
			} catch {}
		}

		const displayName =
			customProperties?.name !== "App" ? customProperties?.name : undefined;
		const repetitiveTopics = [
			"rose-pine",
			"soho-vibes",
			"theme",
			"app",
			displayName?.toLowerCase().replace(" ", "-"),
			customProperties?.category.toLowerCase(),
		];
		const tags =
			topics?.filter((topic) => !repetitiveTopics.includes(topic)) ?? [];

		const data: Record<string, unknown> = {
			...(displayName && { name: displayName }),
			category: customProperties?.category ?? "",
			stargazersCount: stargazers_count,
			updatedAt: updated_at,
			...(tags.length > 0 && { tags }),
			...(subthemes.length > 0 && { subthemes }),
			contributors,
		};

		repos[i] = { repoName: name, data };
	}
});

await Promise.all(workers);

console.log(`fetched data for ${repos.length} repos.`);

const REPOS_DIR = "src/content/official-repos";

console.log(`writing ${repos.length} repos to ${REPOS_DIR}/*.yaml...`);
for (const { repoName, data } of repos) {
	await writeFile(`${REPOS_DIR}/${repoName}.yaml`, YAML.stringify(data));
}
console.log(`wrote ${repos.length} repos.`);

const localFiles = await readdir(REPOS_DIR);
const remoteNames = new Set(repos.map((r) => r.repoName));
const localOnly = localFiles
	.map((f) => f.replace(/\.yaml$/, ""))
	.filter((name) => !remoteNames.has(name));

if (localOnly.length > 0) {
	console.warn(
		`\nthese local files have no remote counterpart and may have been deleted upstream:`,
	);
	localOnly.forEach((slug) => console.warn(`  ${REPOS_DIR}/${slug}.yaml`));
}

console.log("done.");
