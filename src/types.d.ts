type Variant = "main" | "moon" | "dawn";

type Color = {
	role: string;
	hex: string;
	hsl: number[];
	rgb: number[];
};
type ColorFormat = "hex" | "hsl" | "rgb";
type ColorStyle = "plain" | "styled";

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
