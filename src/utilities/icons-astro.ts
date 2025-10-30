import BoxIcon from "@lucide/astro/icons/box";
import CpuIcon from "@lucide/astro/icons/cpu";
import GlobeIcon from "@lucide/astro/icons/globe";
import LibraryBigIcon from "@lucide/astro/icons/library-big";
import NotebookPenIcon from "@lucide/astro/icons/notebook-pen";
import ShapesIcon from "@lucide/astro/icons/shapes";
import SquareTerminalIcon from "@lucide/astro/icons/square-terminal";
import { isValidCategory } from "./icon-config";

export const astroIconMap = {
	browser: GlobeIcon,
	editor: NotebookPenIcon,
	library: LibraryBigIcon,
	social: ShapesIcon,
	system: CpuIcon,
	terminal: SquareTerminalIcon,
} as const;

export function getAstroIconComponent(category: string) {
	if (!category || !isValidCategory(category)) {
		return BoxIcon;
	}
	return astroIconMap[category as keyof typeof astroIconMap] || BoxIcon;
}
