// @ts-check

// This script fetches the latest Rosé Pine repos from GitHub and updates the
// src/data/repos.json file accordingly.
//
// Requires a GITHUB_TOKEN, available in CI or via the gh CLI:
// export GITHUB_TOKEN=$(gh auth token)

import { z } from "astro/zod";
import { writeFile } from "node:fs/promises";
import * as prettier from "prettier";
import communityRepos from "../src/data/community-repos.json" with { type: "json" };

const token = process.env.GITHUB_TOKEN;
if (!token) {
	console.error(
		"missing GITHUB_TOKEN. try: export GITHUB_TOKEN=$(gh auth token)",
	);
	process.exit(1);
}

const headers = {
	Authorization: `Bearer ${token}`,
	Accept: "application/vnd.github+json",
	"X-GitHub-Api-Version": "2022-11-28",
};

async function fetchAllPages(url) {
	const results = [];
	let nextUrl = url;

	while (nextUrl) {
		const res = await fetch(nextUrl, { headers });
		const data = await res.json();
		results.push(...data);

		const link = res.headers.get("Link");
		const match = link?.match(/<([^>]+)>;\s*rel="next"/);
		nextUrl = match ? match[1] : null;
	}

	return results;
}

async function withConcurrency(items, limit, fn) {
	const results = [];
	let index = 0;

	async function worker() {
		while (index < items.length) {
			const i = index++;
			results[i] = await fn(items[i], i);
		}
	}

	await Promise.all(Array.from({ length: limit }, worker));
	return results;
}

function sortItemsByKey(items, key) {
	return items.sort((a, b) =>
		(a[key] ?? "").toLowerCase().localeCompare((b[key] ?? "").toLowerCase()),
	);
}

const prettierConfigFile = await prettier.resolveConfigFile();
const prettierConfigOptions = await prettier.resolveConfig(
	prettierConfigFile ?? "",
);
const prettierOptions = {
	...prettierConfigOptions,
	parser: "json",
};
async function formatData(data) {
	return await prettier.format(
		JSON.stringify(data, null, "\t"),
		prettierOptions,
	);
}

const github = z.object({
	name: z.string(),
	description: z.string().nullable(),
	stargazers_count: z.number(),
	topics: z.array(z.string()),
	updated_at: z.string(),
	html_url: z.url(),
	open_issues_count: z.number(),
	custom_properties: z.object({
		hidden: z.enum(["true", "false"]),
		name: z.string(),
		category: z.string(),
	}),
	visibility: z.string(),
});

console.log("fetching latest repos...");

const rawRepos = await fetchAllPages(
	"https://api.github.com/orgs/rose-pine/repos?type=public&per_page=100",
).then((repos) => repos.filter((r) => r.custom_properties?.hidden !== "true"));

const repos = sortItemsByKey(
	await withConcurrency(rawRepos, 10, async (r) => {
		const repo = github.parse(r);

		const contributors = await fetchAllPages(
			`https://api.github.com/repos/rose-pine/${repo.name}/contributors?per_page=100`,
		)
			.then((list) =>
				list.map((c) => ({
					name: c.login,
					image: c.avatar_url,
					url: c.html_url,
				})),
			)
			.catch(() => []);

		const children =
			repo.name === "userstyles"
				? await fetch(
						"https://api.github.com/repos/rose-pine/userstyles/contents/styles",
						{ headers },
					)
						.then((res) => res.json())
						.then((entries) =>
							entries.filter((e) => e.type === "dir").map((e) => e.name),
						)
						.catch(() => [])
				: [];

		return {
			slug: repo.name,
			description: repo.description,
			stargazersCount: repo.stargazers_count,
			updatedAt: repo.updated_at,
			tags: repo.topics,
			url: repo.html_url,
			name: r.custom_properties.name ?? repo.name,
			category: r.custom_properties.category ?? "",
			contributors,
			children,
		};
	}),
	"name",
);

console.log("writing repos to src/data/repos.json...");
await writeFile("src/data/repos.json", await formatData(repos));
console.log(`wrote ${repos.length} repos.`);

const sortedCommunityRepos = sortItemsByKey(
	communityRepos.map((r) => ({
		...r,
		// sort tags
		tags: [...(r.tags ?? [])].sort((a, b) =>
			a.toLowerCase().localeCompare(b.toLowerCase()),
		),
	})),
	"name",
);

console.log("sorting community repos...");
await writeFile(
	"src/data/community-repos.json",
	await formatData(sortedCommunityRepos),
);
console.log(`sorted ${communityRepos.length} community repos.`);

const contributors = sortItemsByKey(
	[
		...new Map(
			repos.flatMap((r) => r.contributors).map((c) => [c.name, c]),
		).values(),
	],
	"name",
);

console.log("writing contributors to src/data/contributors.json...");
await writeFile("src/data/contributors.json", await formatData(contributors));
console.log(`wrote ${contributors.length} contributors.`);

const categories = await fetch(
	"https://api.github.com/orgs/rose-pine/properties/schema/category",
	{ headers },
)
	.then((res) => res.json())
	.then((prop) => (prop.allowed_values ?? []).sort());

console.log("writing categories to src/data/categories.json...");
await writeFile("src/data/categories.json", await formatData(categories));
console.log(`wrote ${categories.length} categories.`);

console.log(`done.`);
