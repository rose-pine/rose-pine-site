export type Contributor = { name: string; image?: string; url: string };

export type Userstyle = {
	name: string;
	url: string;
};

export type Repo = {
	slug: string;
	name: string;
	url: string;
	tags: string[];
	contributors: Contributor[];
	category: string;
	userstyles: Userstyle[];
	related: string[];
	searchText: string;
	ogImage: string;
	ogImageAlt: string;
	updatedAt?: string;
};
