type Variant = "main" | "moon" | "dawn";

type Color = {
	role: string;
	hex: string;
	hsl: number[];
	rgb: number[];
};

type ColorFormat = "hex" | "hsl" | "rgb";

type Contributor = {
	name: string;
	image?: string;
	url: string;
};

type Repo = {
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
