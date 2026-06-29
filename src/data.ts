import { getCollection } from "astro:content";
import type { CollectionEntry } from "astro:content";
import type { Contributor, Repo } from "./types/theme";

function contributorImage(contributor: {
	url: string;
	image?: string;
}): string | undefined {
	if (contributor.image) return contributor.image;
	if (contributor.url.startsWith("https://github.com/")) {
		const username = contributor.url.replace("https://github.com/", "");
		return `https://avatars.githubusercontent.com/${username}?size=80`;
	}
}

function normalizeOfficial(entry: CollectionEntry<"officialRepos">): Repo {
	const d = entry.data;
	const name = d.name ?? entry.id;
	return {
		slug: entry.id,
		name,
		url: `https://github.com/rose-pine/${entry.id}`,
		tags: d.tags ?? [],
		contributors: d.contributors.map((c: Contributor) => ({
			...c,
			image: contributorImage(c),
		})),
		category: d.category,
		subthemes: d.subthemes ?? [],
		related: d.related ?? [],
		featured: (d.stargazersCount ?? 0) > 100,
		stargazersCount: d.stargazersCount,
		updatedAt: d.updatedAt?.toISOString(),
	};
}

function normalizeCommunity(entry: CollectionEntry<"communityRepos">): Repo {
	const d = entry.data;
	return {
		slug: d.name.toLowerCase().replaceAll(" ", "-"),
		name: d.name,
		url: d.url,
		tags: [...(d.tags ?? []), "community"],
		contributors: d.contributors.map((c: Contributor) => ({
			...c,
			image: contributorImage(c),
		})),
		category: d.category,
		subthemes: d.subthemes ?? [],
		related: d.related ?? [],
		featured: false,
	};
}

export async function getAllRepos(): Promise<Repo[]> {
	const [official, community] = await Promise.all([
		getCollection("officialRepos"),
		getCollection("communityRepos"),
	]);
	return [
		...official.map(normalizeOfficial),
		...community.map(normalizeCommunity),
	];
}

export async function getFeaturedRepos(): Promise<Repo[]> {
	const official = await getCollection("officialRepos");
	return official
		.map(normalizeOfficial)
		.filter((r) => r.featured)
		.sort((a, b) => (b.stargazersCount ?? 0) - (a.stargazersCount ?? 0));
}

export async function getSortedRepos(): Promise<Repo[]> {
	const repos = await getAllRepos();
	return repos.sort((a, b) => a.name.localeCompare(b.name));
}

export async function getRepoBySlug(slug: string): Promise<Repo | undefined> {
	const repos = await getAllRepos();
	return repos.find((r) => r.slug === slug);
}

export async function getAllRepoSlugs(): Promise<string[]> {
	const repos = await getAllRepos();
	return repos.map((r) => r.slug);
}

export async function getContributorCount(): Promise<number> {
	const [official, community] = await Promise.all([
		getCollection("officialRepos"),
		getCollection("communityRepos"),
	]);
	const names = new Set([
		...official.flatMap((e) =>
			e.data.contributors.map((c: Contributor) => c.name),
		),
		...community.flatMap((e) =>
			e.data.contributors.map((c: Contributor) => c.name),
		),
	]);
	return names.size;
}
