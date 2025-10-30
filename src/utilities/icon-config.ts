import categories from "../data/categories.json";

export const iconCategories = categories as readonly string[];

export type IconCategory = (typeof iconCategories)[number];

export function isValidCategory(category: string): category is IconCategory {
	return iconCategories.includes(category as IconCategory);
}
