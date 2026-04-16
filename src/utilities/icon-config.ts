import categories from "../data/categories.json";

export const iconCategories = categories as readonly string[];

export type IconCategory = (typeof iconCategories)[number];

export const categoryColorMap: { [category: IconCategory]: string } = {
	browser: "tonal-love",
	editor: "tonal-gold",
	library: "tonal-rose",
	social: "tonal-pine",
	system: "tonal-foam",
	terminal: "tonal-iris",
};

export function isValidCategory(category: string): category is IconCategory {
	return iconCategories.includes(category as IconCategory);
}
