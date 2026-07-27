import type { Component } from "svelte";
import {
	BrowserIcon,
	DesktopIcon,
	GridIcon,
	LibraryIcon,
	NotebookIcon,
	SocialIcon,
	TerminalIcon,
} from "../components/icons";
import categories from "../data/categories.json";
import type { IconProps } from "../types/icon";

export type IconSize = "sm" | "md" | "lg";

export type IconCategory =
	"browser" | "editor" | "library" | "none" | "social" | "system" | "terminal";

export const categoryColorMap = {
	browser: "tonal-love",
	editor: "tonal-gold",
	library: "tonal-rose",
	none: "tonal-subtle",
	social: "tonal-pine",
	system: "tonal-foam",
	terminal: "tonal-iris",
} satisfies Record<IconCategory, string>;

export const iconSizeMap = {
	sm: 14,
	md: 20,
	lg: 32,
} satisfies Record<IconSize, number>;

export const containerSizeMap = {
	sm: "size-6",
	md: "size-9",
	lg: "size-12",
} satisfies Record<IconSize, string>;

export const radiusMap = {
	sm: "rounded-sm",
	md: "rounded-md",
	lg: "rounded-lg",
} satisfies Record<IconSize, string>;

export const svelteIconMap = {
	browser: BrowserIcon,
	editor: NotebookIcon,
	library: LibraryIcon,
	none: GridIcon,
	social: SocialIcon,
	system: DesktopIcon,
	terminal: TerminalIcon,
} satisfies Record<IconCategory, Component<IconProps>>;

const categorySet = new Set(categories);

export function isValidIconCategory(
	category: string,
): category is IconCategory {
	return categorySet.has(category);
}

export function getSvelteIconComponent(category: string) {
	if (!isValidIconCategory(category)) return GridIcon;
	return svelteIconMap[category] || GridIcon;
}
