import type { ReactNode } from "react";
import { IconSearch } from "@tabler/icons-react";
import { searchIsOpen } from "$store";

type Props = {
	children: ReactNode;
	size?: "sm" | "lg";
};

const sizes = {
	sm: "h-7 px-1.5",
	lg: "h-10 px-3",
};

const CommandMenuTrigger = ({ children, size = "sm" }: Props) => (
	<button
		onClick={() => searchIsOpen.set(true)}
		className={`${sizes[size]} flex w-full items-center rounded-md border bg-overlay text-sm font-[550] hover:bg-muted/10`}
	>
		<IconSearch size={16} className="text-subtle" />
		<span className="pl-1.5 pr-3">{children}</span>
		<div className="flex-1"></div>
		<kbd className="font-mono text-xs text-muted">⌘K</kbd>
	</button>
);

export default CommandMenuTrigger;
