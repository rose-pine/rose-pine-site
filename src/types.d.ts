type Variant = "main" | "moon" | "dawn";

type Color = {
	role: string;
	hex: string;
	hsl: number[];
	rgb: number[];
};
type ColorFormat = "hex" | "hsl" | "rgb";

type Repo = {
	url: string;
	slug: string;
	name: string;
	description: string;
	tags: Array<string>;
	contributors: Array<string> | Array<{ name: string; url?: string }>;
	hidden: "true" | "false";
	updatedAt?: string;
	stargazerCount?: number;
	category: string;
	children?: string[];
	[key?: string]: any;
};

type Contributor = {
	name: string;
	url?: string;
};

type Author = {
	name: string;
	url?: string;
	avatarUrl: string;
};
