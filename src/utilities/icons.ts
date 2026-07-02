import type { AstroComponent } from "@lucide/astro";
import BoxAstroIcon from "@lucide/astro/icons/box";
import CpuAstroIcon from "@lucide/astro/icons/cpu";
import GlobeAstroIcon from "@lucide/astro/icons/globe";
import LibraryBigAstroIcon from "@lucide/astro/icons/library-big";
import NotebookPenAstroIcon from "@lucide/astro/icons/notebook-pen";
import ShapesAstroIcon from "@lucide/astro/icons/shapes";
import SquareTerminalAstroIcon from "@lucide/astro/icons/square-terminal";
import type { IconProps } from "@lucide/svelte";
import BoxSvelteIcon from "@lucide/svelte/icons/box";
import CpuSvelteIcon from "@lucide/svelte/icons/cpu";
import GlobeSvelteIcon from "@lucide/svelte/icons/globe";
import LibraryBigSvelteIcon from "@lucide/svelte/icons/library-big";
import NotebookPenSvelteIcon from "@lucide/svelte/icons/notebook-pen";
import ShapesSvelteIcon from "@lucide/svelte/icons/shapes";
import SquareTerminalSvelteIcon from "@lucide/svelte/icons/square-terminal";
import type { Component } from "svelte";
import categories from "../data/categories.json";

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

export const astroIconMap = {
	browser: GlobeAstroIcon,
	editor: NotebookPenAstroIcon,
	library: LibraryBigAstroIcon,
	none: BoxAstroIcon,
	social: ShapesAstroIcon,
	system: CpuAstroIcon,
	terminal: SquareTerminalAstroIcon,
} satisfies Record<IconCategory, AstroComponent>;

export const svelteIconMap = {
	browser: GlobeSvelteIcon,
	editor: NotebookPenSvelteIcon,
	library: LibraryBigSvelteIcon,
	none: BoxSvelteIcon,
	social: ShapesSvelteIcon,
	system: CpuSvelteIcon,
	terminal: SquareTerminalSvelteIcon,
} satisfies Record<IconCategory, Component<IconProps, {}, "">>;

const categorySet = new Set(categories);

export function isValidIconCategory(
	category: string,
): category is IconCategory {
	return categorySet.has(category);
}

export function getAstroIconComponent(category: string) {
	if (!isValidIconCategory(category)) return BoxAstroIcon;
	return astroIconMap[category] || BoxAstroIcon;
}

export function getSvelteIconComponent(category: string) {
	if (!isValidIconCategory(category)) return BoxSvelteIcon;
	return svelteIconMap[category] || BoxSvelteIcon;
}
