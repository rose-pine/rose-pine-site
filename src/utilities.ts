import repos from "./data/repos.json";
import communityRepos from "./data/community-repos.json";
import contributors from "./data/contributors.json";

export function getAllRepos(): Repo[] {
	return [
		...repos.filter((repo) => repo?.hidden !== "true"),
		...communityRepos.map((repo) => ({
			...repo,
			slug: repo.name.toLowerCase().replaceAll(" ", ""),
			description: `Soho vibes for ${repo.name}`,
			tags: [...(repo.tags ?? []), "Community"],
		})),
	];
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

export function getAllSlugs(): string[] {
	return getAllRepos().map((repo) => repo.slug);
}

export function getContributor(contributor: string | Contributor): Contributor {
	// Official themes on GitHub only include the username
	if (typeof contributor === "string") {
		return { name: contributor, url: `https://github.com/${contributor}` };
	}
	return contributor;
}

export function getContributorCount(): number {
	return new Set([
		...contributors,
		...communityRepos.flatMap((repo) =>
			repo.contributors.map((contributor) => contributor.name),
		),
	]).size;
}
