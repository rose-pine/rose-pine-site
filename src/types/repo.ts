export type Contributor = {
	name: string;
	image?: string;
	url: string;
};

export type Userstyle = {
	name: string;
	url: string;
};

export type Repo = {
	type: "official" | "community";
	slug: string;
	name: string;
	url: string;
	category: string;
	tags: string[];
	contributors: Contributor[];
	userstyles?: Userstyle[];
	updatedAt?: string;
	related?: string[];
	ogImage?: string;
	ogImageAlt?: string;
};

export type StrictRepo = Required<Repo> & { searchText: string };
