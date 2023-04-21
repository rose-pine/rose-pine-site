import React from "react";
import { Command } from "cmdk";
import {
	IconBrandDiscordFilled,
	IconBrandGithubFilled,
	IconBrandTwitterFilled,
	IconChevronRight,
	IconFileDescription,
	IconHome,
	IconNotebook,
	IconPalette,
	IconSailboat,
	IconSalt,
	IconSearch,
} from "@tabler/icons-react";
import { searchIsOpen } from "$store";

const icons = {
	BrandDiscordFilled: IconBrandDiscordFilled,
	BrandGithubFilled: IconBrandGithubFilled,
	BrandTwitterFilled: IconBrandTwitterFilled,
	FileDescription: IconFileDescription,
	Home: IconHome,
	Notebook: IconNotebook,
	Palette: IconPalette,
	Sailboat: IconSailboat,
	Salt: IconSalt,
} as const;

type Item = {
	icon?: keyof typeof icons;
	color?: string;
	name: string;
	href: string;
};

type Group = {
	name: string;
	featuredName?: string;
	items: Item[];
	featuredItems?: Item[];
};

type Props = {
	groups: Group[];
	triggerText: string;
	searchText: string;
	emptyText: string;
	emptyResults: [name: string, href: string][];
};

const CommandMenu = ({
	groups,
	triggerText,
	searchText,
	emptyText,
	emptyResults,
}: Props) => {
	const [open, setOpen] = React.useState(false);
	const [search, setSearch] = React.useState("");

	React.useEffect(() => {
		// Inform the other components of the search state
		searchIsOpen.set(open);
	}, [open]);

	// Toggle the menu when ⌘K is pressed
	React.useEffect(() => {
		const down = (e: KeyboardEvent) => {
			if (e.key === "k" && e.metaKey) {
				e.preventDefault();
				e.stopPropagation();
				setOpen((open) => !open);
			}
		};

		document.addEventListener("keydown", down);
		return () => document.removeEventListener("keydown", down);
	}, []);

	function goto(url: string) {
		setOpen(false);
		window.location = url;
	}

	return (
		<>
			<button
				onClick={() => setOpen(true)}
				className="flex h-7 items-center rounded-md border bg-muted/5 px-1.5 text-sm font-[550] hover:bg-muted/10"
			>
				<IconSearch size={16} className="text-subtle" />
				<span className="pl-1.5 pr-3">{triggerText}</span>
				<kbd className="font-mono text-xs text-muted">⌘K</kbd>
			</button>

			<Command.Dialog
				open={open}
				onOpenChange={setOpen}
				label="Global Command Menu"
			>
				<div cmdk-input-container="">
					<Command.Input
						value={search}
						onValueChange={setSearch}
						placeholder={searchText}
					/>

					<button
						onClick={() => setOpen(false)}
						className="rounded-md transition focus:outline-none focus:ring"
					>
						<kbd className="pointer-events-none flex h-6 min-w-[1.25rem] items-center justify-center rounded-md border border-muted/20 bg-muted/10 px-1 font-mono text-[11px] font-semibold uppercase text-subtle">
							esc
						</kbd>
					</button>
				</div>

				<Command.List>
					<div
						aria-hidden="true"
						className="pointer-events-none sticky top-0 h-6 w-full bg-gradient-to-b from-surface/80 to-transparent blur-md"
					/>
					<Command.Empty>
						<p className="text-center text-sm">{emptyText}</p>

						<div className="divide-y overflow-hidden rounded-xl border bg-muted/5">
							{emptyResults.map(([name, href]) => (
								<a
									key={`empty-${name}`}
									href={href}
									className="group flex items-center space-x-2 p-3 text-sm text-subtle transition first:rounded-t-xl last:rounded-b-xl hover:bg-muted/20 focus:outline-none focus:ring focus:ring-inset"
								>
									<span className="transition group-hover:text-text">
										{name}
									</span>

									<div className="flex-1" />

									<span className="text-muted transition group-hover:text-text">
										<IconChevronRight size={18} />
									</span>
								</a>
							))}
						</div>
					</Command.Empty>

					{groups.map((group) => (
						<Command.Group
							key={group.name}
							heading={
								search.length > 0
									? group.name
									: group.featuredName ?? group.name
							}
						>
							{(search.length > 0
								? group.items
								: group.featuredItems ?? group.items
							).map((item) => (
								<Command.Item
									key={`${group.name}-${item.name}`}
									value={`${group.name}-${item.name}`}
									onSelect={() => goto(item.href)}
								>
									<div className="flex h-5 w-5 items-center justify-center text-subtle transition">
										{!!item.icon && React.createElement(icons[item.icon])}
										{!!item.color && (
											<div
												className="h-[18px] w-[18px] rounded-full border"
												style={{ backgroundColor: item.color }}
											/>
										)}
									</div>

									<p className="truncate">{item.name}</p>

									<div className="flex-1" />

									<p className="flex items-center space-x-2 text-muted transition">
										{item.href.startsWith("http") ? (
											<span>{new URL(item.href).hostname}&nbsp;↗</span>
										) : (
											<IconChevronRight size={18} />
										)}
									</p>
								</Command.Item>
							))}
						</Command.Group>
					))}

					<div
						aria-hidden="true"
						className="pointer-events-none sticky bottom-0 -mt-5 h-8 w-full bg-gradient-to-t from-surface/80 to-transparent blur-md"
					/>
				</Command.List>
			</Command.Dialog>
		</>
	);
};

export default CommandMenu;
