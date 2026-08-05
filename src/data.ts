import { getCollection } from "astro:content";
import type { CollectionEntry } from "astro:content";
import type { Contributor, Repo } from "./types/theme";

const generatedOgImage = (name: string) =>
	`https://rose-pine-images.vercel.app/${encodeURIComponent(name)}.png?theme=default`;

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

function buildSearchText(
	name: string,
	tags: string[],
	subthemes: { name: string }[],
): string {
	return (
		name +
		" " +
		tags.join(" ") +
		" " +
		subthemes.map((t) => t.name).join(" ")
	).toLowerCase();
}

function normalizeOfficial(entry: CollectionEntry<"officialRepos">): Repo {
	const d = entry.data;
	const name = d.name ?? entry.id;
	const tags = d.tags ?? [];
	const subthemes = d.subthemes ?? [];
	return {
		slug: entry.id,
		name,
		url: d.url,
		tags,
		contributors: d.contributors.map((c) => ({
			...c,
			image: contributorImage(c),
		})),
		category: d.category,
		subthemes,
		related: d.related ?? [],
		ogImage: generatedOgImage(name),
		searchText: buildSearchText(name, tags, subthemes),
		updatedAt: d.updatedAt?.toISOString(),
	};
}

function normalizeCommunity(entry: CollectionEntry<"communityRepos">): Repo {
	const d = entry.data;
	const tags = d.tags ?? [];
	const subthemes = d.subthemes ?? [];
	return {
		slug: d.name.toLowerCase().replaceAll(" ", "-"),
		name: d.name,
		url: d.url,
		tags,
		contributors: d.contributors.map((c) => ({
			...c,
			image: contributorImage(c),
		})),
		category: d.category,
		subthemes,
		related: d.related ?? [],
		ogImage: generatedOgImage(d.name),
		searchText: buildSearchText(d.name, tags, subthemes),
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

export async function getRecentRepos(): Promise<Repo[]> {
	const official = await getCollection("officialRepos");
	return official
		.map(normalizeOfficial)
		.filter((r) => r.updatedAt)
		.sort((a, b) => b.updatedAt!.localeCompare(a.updatedAt!))
		.slice(0, 10);
}

export async function getSortedRepos(): Promise<Repo[]> {
	const repos = await getAllRepos();
	return repos.sort((a, b) => a.name.localeCompare(b.name));
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
