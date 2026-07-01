export type Variant = "main" | "moon" | "dawn";

export type Color = {
	name: string;
	slug: string;
	hex: string;
	hsl: number[];
	rgb: number[];
};

export type ColorFormat = "hex" | "hsl" | "rgb";
