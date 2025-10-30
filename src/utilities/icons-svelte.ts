import BoxIcon from "@lucide/svelte/icons/box";
import CpuIcon from "@lucide/svelte/icons/cpu";
import GlobeIcon from "@lucide/svelte/icons/globe";
import LibraryBigIcon from "@lucide/svelte/icons/library-big";
import NotebookPenIcon from "@lucide/svelte/icons/notebook-pen";
import ShapesIcon from "@lucide/svelte/icons/shapes";
import SquareTerminalIcon from "@lucide/svelte/icons/square-terminal";
import { isValidCategory } from "./icon-config";

export const svelteIconMap = {
	browser: GlobeIcon,
	editor: NotebookPenIcon,
	library: LibraryBigIcon,
	social: ShapesIcon,
	system: CpuIcon,
	terminal: SquareTerminalIcon,
} as const;

export function getSvelteIconComponent(category: string) {
	if (!category || !isValidCategory(category)) {
		return BoxIcon;
	}
	return svelteIconMap[category as keyof typeof svelteIconMap] || BoxIcon;
}
