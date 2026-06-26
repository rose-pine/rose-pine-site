export type Contributor = { name: string; image?: string; url: string };

export type Repo = {
	slug: string;
	name: string;
	url: string;
	tags: string[];
	contributors: Contributor[];
	category: string;
	subthemes: { name: string; author: string; url: string }[];
	related: string[];
	featured: boolean;
	stargazersCount?: number;
	updatedAt?: string;
};
