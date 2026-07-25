<script lang="ts">
	import type { Component } from "svelte";
	import {
		getLocaleFromUrl,
		useTranslatedPath,
		useTranslations,
	} from "../utilities/i18n";
	import type { IconCategory } from "../utilities/icons";
	import ColorSwatch from "./color-swatch.svelte";
	import {
		ArrowDownIcon,
		ArrowSWIcon,
		ArrowUpIcon,
		ChevronRightIcon,
		Dice3Icon,
		DiscordIcon,
		FolderIcon,
		GithubIcon,
		HomeIcon,
		InboxIcon,
		RainbowIcon,
		SearchIcon,
		SparklesIcon,
		XIcon,
	} from "./icons";
	import ThemeIcon from "./theme-icon.svelte";

	const iconComponents: Record<string, Component<{ size?: number }>> = {
		discord: DiscordIcon,
		folder: FolderIcon,
		github: GithubIcon,
		home: HomeIcon,
		inbox: InboxIcon,
		rainbow: RainbowIcon,
		sparkles: SparklesIcon,
	};

	type Item = {
		label: string;
		searchText: string;
		href: string;
		icon: string;
		subthemes?: { name: string }[];
	};

	export type Group = {
		heading: string;
		kind: "icon" | "theme" | "color";
		items: Item[];
	};

	type Props = {
		defaultGroups: Group[];
		searchGroups: Group[];
		repoSlugs: string[];
	};

	let { defaultGroups, searchGroups, repoSlugs }: Props = $props();

	let locale = getLocaleFromUrl();
	let t = useTranslations(locale);
	let translatePath = useTranslatedPath(locale);

	let search = $state("");
	let activeHref: string | null = $state(null);
	let dialogElement: HTMLDialogElement | undefined = $state();
	let open = $state(false);
	let lastInputSource: "keyboard" | "pointer" = "pointer";

	let query = $derived(search.toLowerCase());
	let renderedGroups = $derived(
		query
			? searchGroups
					.map((group) => ({
						...group,
						items: group.items.filter((item) =>
							item.searchText.includes(query),
						),
					}))
					.filter((group) => group.items.length > 0)
			: defaultGroups,
	);
	let flatItems = $derived(renderedGroups.flatMap((group) => group.items));

	let randomSlug = $derived(
		open ? repoSlugs[Math.floor(Math.random() * repoSlugs.length)] : "",
	);

	let luckyHref = $derived(
		query && flatItems.length === 0
			? translatePath(`/themes/${randomSlug}`)
			: null,
	);

	$effect(() => {
		activeHref = flatItems[0]?.href ?? luckyHref;
	});

	function matchHint(item: Item): string | null {
		if (!query || item.label.toLowerCase().includes(query)) return null;
		const subtheme = item.subthemes?.find((s) =>
			s.name.toLowerCase().includes(query),
		);
		return subtheme?.name ?? null;
	}

	function openMenu() {
		activeHref = flatItems[0]?.href ?? null;
		dialogElement?.showModal();
	}

	function closeMenu() {
		dialogElement?.close();
		search = "";
	}

	function handlePageKeydown(e: KeyboardEvent) {
		if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
			e.preventDefault();
			open ? closeMenu() : openMenu();
		}
	}

	function handleMenuKeydown(e: KeyboardEvent) {
		lastInputSource = "keyboard";

		if (e.key === "Enter") {
			e.preventDefault();
			if (activeHref) window.location.href = activeHref;
			return;
		}

		const length = flatItems.length;
		if (length === 0) return;

		const currentIndex = activeHref
			? flatItems.findIndex((item) => item.href === activeHref)
			: -1;

		switch (e.key) {
			case "ArrowDown":
				e.preventDefault();
				activeHref =
					currentIndex < length - 1
						? flatItems[currentIndex + 1].href
						: flatItems[0].href;
				document
					.getElementById(activeHref)
					?.scrollIntoView({ block: "nearest" });
				break;
			case "ArrowUp":
				e.preventDefault();
				activeHref =
					currentIndex > 0
						? flatItems[currentIndex - 1].href
						: flatItems[length - 1].href;
				document
					.getElementById(activeHref)
					?.scrollIntoView({ block: "nearest" });
				break;
		}
	}

	function handlePointerMove(e: PointerEvent) {
		if (lastInputSource === "keyboard") {
			lastInputSource = "pointer";
			return;
		}

		const target = (e.target as HTMLElement).closest<HTMLElement>(
			"li[data-command-item]",
		);

		if (!target) return;

		const href = target.dataset.href;

		if (href && href !== activeHref) {
			activeHref = href;
		}
	}
</script>

<svelte:document onkeydown={handlePageKeydown} />

<button
	type="button"
	onclick={openMenu}
	aria-label={t("command.trigger")}
	aria-haspopup="dialog"
	aria-keyshortcuts="Control+k Meta+k"
	class="hidden h-7 cursor-pointer items-center justify-center gap-1.5 rounded-full border border-muted/20 bg-muted/5 px-2 transition hover:bg-muted/10 md:flex"
>
	<SearchIcon size={16} />
	<kbd
		aria-hidden="true"
		class="rounded-full font-mono text-sm tracking-widest text-subtle">⌘K</kbd
	>
</button>

<button
	type="button"
	onclick={openMenu}
	aria-haspopup="dialog"
	aria-label={t("command.trigger")}
	class="relative z-50 flex size-(--badge-size) cursor-pointer items-center justify-center rounded-card-inner transition hover:bg-muted/10 md:hidden"
>
	<SearchIcon size={20} />
</button>

<div class="z-50 ms-6 h-7 w-px bg-text/20 md:-me-(--nav-item-space)"></div>

<dialog
	bind:this={dialogElement}
	aria-labelledby="command-title"
	onkeydown={handleMenuKeydown}
	ontoggle={() => {
		open = dialogElement?.open ?? false;
	}}
	onclose={closeMenu}
	class="fixed top-auto bottom-0 left-1/2 z-90 w-full max-w-xl -translate-x-1/2 overflow-hidden rounded-t-dialog border-0 bg-surface p-0 shadow-xl open:backdrop:bg-black/50 sm:top-20 sm:bottom-auto sm:w-9/10 sm:rounded-b-dialog"
>
	<h2 id="command-title" class="sr-only">{t("command.title")}</h2>

	<div
		class="flex h-full w-full flex-col-reverse overflow-hidden [--close-size:calc(var(--input-height)-var(--spacing-dialog-gutters))] [--input-height:--spacing(15)] [--toolbar-height:--spacing(7.5)] sm:flex-col"
	>
		<div
			class="flex h-(--input-height) items-center gap-3 border-bs border-muted/10 bg-surface supports-backdrop-filter:bg-surface/95 supports-backdrop-filter:backdrop-blur-sm sm:border-bs-0 sm:border-be"
		>
			<label for="global-search" class="ps-dialog-gutters text-subtle">
				<SearchIcon size={20} />
			</label>
			<input
				id="global-search"
				bind:value={search}
				oninput={() => {
					activeHref = flatItems[0]?.href ?? luckyHref;
				}}
				placeholder={t("command.search_placeholder")}
				role="combobox"
				aria-autocomplete="list"
				aria-expanded={open}
				aria-controls="command-list"
				aria-activedescendant={activeHref ?? undefined}
				class="h-full w-full placeholder-muted focus:outline-none max-sm:placeholder:text-sm"
			/>
			<button
				aria-label={t("command.close")}
				onclick={closeMenu}
				class="me-dialog-gutters-half flex size-(--close-size) shrink-0 cursor-pointer items-center justify-center rounded-dialog-inner text-subtle transition hover:bg-muted/10 hover:text-text"
			>
				<XIcon size={24} />
			</button>
		</div>

		<ul
			id="command-list"
			role="listbox"
			onpointermove={handlePointerMove}
			aria-label={t("command.description")}
			class="flex max-h-74 list-none flex-col overflow-x-hidden overflow-y-auto py-dialog-gutters-half"
		>
			{#if query && flatItems.length === 0}
				<li class="mbe-3 px-dialog-gutters">
					<p
						title={`No results for "${query}"`}
						class="truncate font-serif text-sm text-subtle italic"
					>
						No results for "{query}"
					</p>
				</li>
				<li
					id={luckyHref}
					role="option"
					aria-selected={activeHref === luckyHref}
					data-command-item=""
					data-href={luckyHref}
					class="px-dialog-gutters-half"
				>
					<a
						href={luckyHref}
						data-selected={activeHref === luckyHref ? "" : undefined}
						class="group flex h-11 items-center gap-3 rounded-lg px-dialog-gutters-half text-subtle data-selected:bg-muted/10 data-selected:text-text"
					>
						<div class="flex size-6 items-center justify-center">
							<Dice3Icon size={16} />
						</div>
						<div class="h-6 flex-1 truncate text-sm font-medium text-text">
							{t("command.feeling_lucky")}
						</div>
						<ChevronRightIcon
							size={18}
							class="text-muted group-data-selected:text-text rtl:rotate-180"
						/>
					</a>
				</li>
			{/if}
			{#each renderedGroups as group, i}
				<li class="px-dialog-gutters {i > 0 ? 'mbs-3' : ''} mbe-3">
					<h3 class="font-serif text-sm text-subtle italic">
						{group.heading}
					</h3>
				</li>
				{#each group.items as item}
					{@const hint = query ? matchHint(item) : null}
					<li
						id={item.href}
						role="option"
						aria-selected={activeHref === item.href}
						data-command-item=""
						data-href={item.href}
						class="scroll-mbs-11 scroll-mbe-dialog-gutters-half px-dialog-gutters-half"
					>
						<a
							href={item.href}
							data-selected={activeHref === item.href ? "" : undefined}
							class="group flex h-11 items-center gap-3 rounded-lg px-dialog-gutters-half text-subtle data-selected:bg-muted/10 data-selected:text-text"
						>
							{#if group.kind === "icon"}
								{@const IconComponent =
									typeof item.icon === "string"
										? iconComponents[item.icon]
										: item.icon}
								<div class="flex size-6 items-center justify-center">
									<IconComponent size={14} />
								</div>
							{:else if group.kind === "theme"}
								<div class="text-subtle hover:text-text">
									<ThemeIcon size="sm" category={item.icon as IconCategory} />
								</div>
							{:else}
								<div class="flex size-6 items-center justify-center">
									<ColorSwatch color={item.icon} size="sm" />
								</div>
							{/if}
							<div
								class="flex-1 truncate pbe-0.5 text-sm font-medium text-text"
							>
								{item.label}
								{#if hint}
									<span class="ms-1 text-xs font-normal text-subtle">
										— "{hint}"
									</span>
								{/if}
							</div>
							<ChevronRightIcon
								size={18}
								class="text-muted group-data-selected:text-text rtl:rotate-180"
							/>
						</a>
					</li>
				{/each}
			{/each}
		</ul>

		<!-- Toolbar -->
		<div
			class="hidden h-(--toolbar-height) items-center border-bs border-muted/10 bg-base ps-dialog-gutters sm:flex"
		>
			<ul role="list" class="flex h-full items-center gap-6">
				<li class="flex shrink-0 items-center font-mono text-xs font-medium">
					<ArrowUpIcon size={12} class="text-subtle" />
					<span class="text-muted">&nbsp;move up</span>
				</li>
				<li class="flex shrink-0 items-center font-mono text-xs font-medium">
					<ArrowDownIcon size={12} class="text-subtle" />
					<span class="text-muted">&nbsp;move down</span>
				</li>
				<li class="flex shrink-0 items-center font-mono text-xs font-medium">
					<ArrowSWIcon size={12} class="text-subtle" />
					<span class="text-muted">&nbsp;select</span>
				</li>
				<li class="flex shrink-0 items-center font-mono text-xs font-medium">
					<span class="font-mono text-xs text-subtle">esc</span>
					<span class="text-muted">&nbsp;close</span>
				</li>
			</ul>
		</div>

		<!-- Overflow start gradient -->
		<div
			aria-hidden="true"
			class="pointer-events-none absolute inset-x-dialog-gutters-half top-0 h-dialog-gutters-half bg-linear-to-b from-surface/95 to-surface/1 sm:top-(--input-height)"
		></div>

		<!-- Overflow end gradient -->
		<div
			aria-hidden="true"
			class="pointer-events-none absolute inset-x-dialog-gutters-half bottom-(--input-height) h-dialog-gutters-half bg-linear-to-t from-surface/95 to-surface/1 sm:bottom-(--toolbar-height)"
		></div>
	</div>
</dialog>
