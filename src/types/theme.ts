export type Contributor = { name: string; image?: string; url: string };

export type Repo = {
	url: string;
	slug: string;
	name: string;
	description: string;
	tags: string[];
	contributors: Contributor[];
	featured: boolean;
	updatedAt?: string;
	stargazersCount?: number;
	category: string;
	children?: string[];
};
