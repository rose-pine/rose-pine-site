import { getCollection, type CollectionEntry } from "astro:content";
import type { Repo } from "../types/repo";

let reposPromise: Promise<Repo[]> | undefined;

function allRepos(): Promise<Repo[]> {
	return (reposPromise ??= getCollection("repos").then((entries) =>
		entries.map(normalizeRepo),
	));
}

export async function getAllRepos(): Promise<Repo[]> {
	return allRepos();
}

export async function getRepoCount(): Promise<number> {
	return (await allRepos()).length;
}

export async function getSortedRepos(): Promise<Repo[]> {
	return (await allRepos()).sort((a, b) => a.name.localeCompare(b.name));
}

export async function getRecentRepos(): Promise<Repo[]> {
	return (await allRepos())
		.filter((r) => r.updatedAt)
		.sort((a, b) => b.updatedAt!.getTime() - a.updatedAt!.getTime())
		.slice(0, 10);
}

export async function getContributorCount(): Promise<number> {
	const names = new Set(
		(await allRepos()).flatMap((r) => r.contributors.map((c) => c.name)),
	);
	return names.size;
}

export function normalizeRepo(entry: CollectionEntry<"repos">): Repo {
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
		updatedAt: repo.updatedAt ?? undefined,
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
