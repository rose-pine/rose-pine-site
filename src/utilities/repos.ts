import { getCollection, type CollectionEntry } from "astro:content";
import type { StrictRepo } from "../types/repo";

let reposPromise: Promise<StrictRepo[]> | undefined;

function allRepos(): Promise<StrictRepo[]> {
	return (reposPromise ??= getCollection("repos").then((entries) =>
		entries.map(normalizeRepo),
	));
}

export async function getAllRepos(): Promise<StrictRepo[]> {
	return allRepos();
}

export async function getRepoCount(): Promise<number> {
	return (await allRepos()).length;
}

export async function getSortedRepos(): Promise<StrictRepo[]> {
	return (await allRepos()).sort((a, b) => a.name.localeCompare(b.name));
}

export async function getRecentRepos(): Promise<StrictRepo[]> {
	return (await allRepos())
		.filter((r) => r.updatedAt)
		.sort((a, b) => b.updatedAt!.localeCompare(a.updatedAt!))
		.slice(0, 10);
}

export async function getContributorCount(): Promise<number> {
	const names = new Set(
		(await allRepos()).flatMap((r) => r.contributors.map((c) => c.name)),
	);
	return names.size;
}

export function normalizeRepo(entry: CollectionEntry<"repos">): StrictRepo {
	const repo = entry.data;
	const tags = repo.tags ?? [];
	const userstyles = repo.userstyles ?? [];
	return {
		type: repo.type,
		slug: entry.id,
		name: repo.name,
		url: repo.url,
		tags: repo.tags ?? [],
		contributors: repo.contributors,
		category: repo.category,
		userstyles: repo.userstyles ?? [],
		related: repo.related ?? [],
		ogImage: `https://rose-pine-images.vercel.app/${encodeURIComponent(repo.name)}.png?theme=default`,
		ogImageAlt: `Rosé Pine for ${repo.name}`,
		// TODO: toISOString in sync script
		updatedAt: repo.updatedAt?.toISOString() ?? "",
		searchText: [
			repo.name,
			repo.category,
			...tags,
			...userstyles.map((s) => s.name),
		]
			.join(" ")
			.toLowerCase(),
	};
}
