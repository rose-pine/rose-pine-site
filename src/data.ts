import categoriesData from "./data/categories.json";
import communityReposData from "./data/community-repos.json";
import contributors from "./data/contributors.json";
import reposData from "./data/repos.json";

const categories = [...categoriesData] as const;
export type Category = (typeof categories)[number];

const repos = reposData as Repo[];
const communityRepos = communityReposData as Array<{
	name: string;
	url: string;
	tags: string[];
	contributors: Array<{ name: string; url?: string }>;
	category: Category;
}>;

export function getAllRepos(): Repo[] {
	return [
		...repos.filter((repo) => repo.hidden !== "true"),
		...communityRepos.map((repo) => ({
			...repo,
			slug: repo.name.toLowerCase().replaceAll(" ", "-"),
			description: `Soho vibes for ${repo.name}`,
			tags: [...(repo.tags ?? []), "Community"],
			hidden: "false" as const,
		})),
	];
}

export function getFeaturedRepos(): Repo[] {
	return repos
		.filter(
			(repo) => repo.hidden !== "true" && (repo.stargazerCount ?? 0) > 100,
		)
		.sort((a, b) => (b.stargazerCount ?? 0) - (a.stargazerCount ?? 0));
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

export function getContributor(contributor: string | Contributor): Contributor {
	// Official themes on GitHub only include the username
	if (typeof contributor === "string") {
		return { name: contributor, url: `https://github.com/${contributor}` };
	}
	return contributor;
}

export function getAllCategories(): readonly Category[] {
	return categories;
}

export function getContributorCount(): number {
	return new Set([
		...contributors,
		...communityRepos.flatMap((repo) =>
			repo.contributors.map((contributor) => contributor.name),
		),
	]).size;
}
