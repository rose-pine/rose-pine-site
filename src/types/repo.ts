export type Contributor = {
	name: string;
	image?: string;
	url: string;
};

export type Userstyle = {
	name: string;
	url: string;
};

export type RepoData = {
	type: "official" | "community";
	slug?: string;
	name: string;
	url: string;
	category: string;
	tags?: string[];
	contributors: Contributor[];
	userstyles?: Userstyle[];
	updatedAt?: Date;
	related?: string[];
};

export type Repo = {
	type: "official" | "community";
	slug: string;
	name: string;
	url: string;
	category: string;
	tags: string[];
	contributors: Contributor[];
	userstyles: Userstyle[];
	updatedAt?: Date;
	related: string[];
	searchText: string;
};
