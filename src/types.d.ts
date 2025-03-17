type Repo = {
	url: string;
	slug: string;
	name: string;
	description: string;
	tags: Array<string>;
	contributors: Array<string> | Array<{ name: string; url?: string }>;
	hidden?: string;
	updatedAt?: string;
	stargazerCount?: number;
	[key?: string]: any;
};

type Contributor = {
	name: string;
	url?: string;
};
