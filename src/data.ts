import communityReposData from "./data/community-repos.json";
import contributorsData from "./data/contributors.json";
import reposData from "./data/repos.json";
import type { Contributor, Repo } from "./types/theme";

const repos = (reposData as Repo[]).map((repo) => ({
	...repo,
	featured: (repo.stargazersCount ?? 0) > 100,
}));
const communityRepos = (communityReposData as Repo[]).map((repo) => ({
	...repo,
	contributors: repo.contributors.map((contributor) => {
		return {
			...contributor,
			image: getContributorImage(contributor),
		};
	}),
	slug: repo.name.toLowerCase().replaceAll(" ", "-"),
	description: repo.description ?? `Soho vibes for ${repo.name}`,
	tags: [...(repo.tags ?? []), "community"],
}));

export function getAllRepos(): Repo[] {
	return [...repos, ...communityRepos];
}

export function getFeaturedRepos(): Repo[] {
	return repos
		.filter((repo) => repo.featured)
		.sort((a, b) => (b.stargazersCount ?? 0) - (a.stargazersCount ?? 0));
}

export function getSortedRepos(): Repo[] {
	return getAllRepos().sort((a, b) => {
		const nameA = a.name ?? a.slug;
		const nameB = b.name ?? b.slug;
		return nameA.localeCompare(nameB);
	});
}

export function getRepoBySlug(slug: string): Repo | undefined {
	return getAllRepos().find((repo) => repo.slug === slug);
}

export function getAllRepoSlugs(): string[] {
	return getAllRepos().map((repo) => repo.slug);
}

export function getRandomRepo(): Repo {
	const repos = getAllRepos();
	return repos[Math.floor(Math.random() * repos.length)];
}

export function getContributorCount(): number {
	return new Set([
		...contributorsData.map((c) => c.name),
		...communityRepos.flatMap((repo) =>
			repo.contributors.map((contributor) => contributor.name),
		),
	]).size;
}

function getContributorImage(contributor: Contributor) {
	let username = contributor.url.replace("https://github.com/", "");
	if (contributor.url.startsWith("https://github.com/")) {
		return `https://avatars.githubusercontent.com/${username}?size=80`;
	}
}
