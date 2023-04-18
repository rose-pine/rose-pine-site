import {
	IconAppWindow,
	IconBrandAppgallery,
	IconBrandChrome,
	IconBrandDiscord,
	IconBrandFirefox,
	IconBrandGit,
	IconBrandGithub,
	IconBrandReddit,
	IconBrandSlack,
	IconBrandSpotify,
	IconBrandSteam,
	IconBrandSublimeText,
	IconBrandTailwind,
	IconBrandVscode,
	IconBrandYoutube,
	IconColorSwatch,
	IconFileCode,
	IconMusic,
	IconPackage,
	IconTerminal,
	IconTerminal2,
	IconWallpaper,
	IconWorld,
	IconWorldSearch,
} from "$components/icons";
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
			icon: getIcon(repo.repositoryTopics),
			url: repo.url,
			tags: [repo.stargazerCount > 40 && "featured", ...repo.repositoryTopics],
			has_variants: true,
			featured: repo.stargazerCount > 40,
		})),
	...communityRepos.map((repo) => {
		repo.authors.map((author) => {
			authors.add({ name: author.name, url: author.url ?? repo.url });
		});
		return {
			name: repo.name,
			icon: getIcon(repo.tags),
			url: repo.url,
			tags: [repo.featured && "featured", ...repo.tags],
			has_variants: repo.has_variants,
			featured: repo.featured,
		};
	}),
].sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));

// TODO: Clean up generated tags and use those instead
const tags = [
	"app",
	"CLI",
	"editor",
	"mobile",
	"music",
	"palette",
	"shell",
	"terminal",
	"terminal-emulator",
];

function getIcon(tags: string[]) {
	// Order determines priority when multiple tags are matched

	if (tags.includes("chrome")) return IconBrandChrome;
	if (tags.includes("discord")) return IconBrandDiscord;
	if (tags.includes("firefox")) return IconBrandFirefox;
	if (tags.includes("git")) return IconBrandGit;
	if (tags.includes("github")) return IconBrandGithub;
	if (tags.includes("mobile")) return IconBrandAppgallery;
	if (tags.includes("reddit")) return IconBrandReddit;
	if (tags.includes("slack")) return IconBrandSlack;
	if (tags.includes("spotify")) return IconBrandSpotify;
	if (tags.includes("steam")) return IconBrandSteam;
	if (tags.includes("sublime-text")) return IconBrandSublimeText;
	if (tags.includes("tailwind")) return IconBrandTailwind;
	if (tags.includes("vscode")) return IconBrandVscode;
	if (tags.includes("youtube")) return IconBrandYoutube;

	if (tags.includes("editor")) return IconFileCode;
	if (tags.includes("music")) return IconMusic;
	if (tags.includes("palette")) return IconColorSwatch;
	if (tags.includes("search-engine")) return IconWorldSearch;
	if (tags.includes("wallpapers")) return IconWallpaper;

	if (tags.includes("web")) return IconWorld;
	if (tags.includes("app")) return IconAppWindow;
	if (tags.includes("cli")) return IconTerminal;
	if (tags.includes("shell")) return IconTerminal;
	if (tags.includes("terminal")) return IconTerminal2;
	if (tags.includes("terminal-emulator")) return IconTerminal2;

	return IconPackage;
}

export { themes, authors, tags, orgRepos, orgMembers };
