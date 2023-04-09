import orgRepos from "./org-repos.json";
import orgMembers from "./org-members.json";
import communityRepos from "./community-repos.json";

const authors = new Set();
orgMembers.map((member) => {
	authors.add({
		name: member.login,
		url: `https://github.com/${member.login}`,
	});
});

const themes = [
	...orgRepos
		.filter((repo) => repo.repositoryTopics.includes("theme"))
		.map((repo) => ({
			name: repo.description
				? repo.description.replace("Soho vibes for ", "")
				: repo.name,
			url: repo.url,
			repositoryTopics: repo.repositoryTopics,
			has_variants: true,
			featured: repo.stargazerCount > 40,
		})),
	...communityRepos.map((repo) => {
		repo.authors.map((author) => {
			authors.add({ name: author.name, url: author.url ?? repo.url });
		});
		return {
			name: repo.name,
			url: repo.url,
			repositoryTopics: repo.tags,
			has_variants: repo.has_variants,
			featured: repo.featured,
		};
	}),
].sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));

export { themes, authors, orgRepos, orgMembers };
