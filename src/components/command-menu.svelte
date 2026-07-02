<script lang="ts">
	import BookTextIcon from "@lucide/svelte/icons/book-text";
	import ChevronRightIcon from "@lucide/svelte/icons/chevron-right";
	import Dice3Icon from "@lucide/svelte/icons/dice-3";
	import HouseIcon from "@lucide/svelte/icons/house";
	import ImageIcon from "@lucide/svelte/icons/image";
	import MailIcon from "@lucide/svelte/icons/mail";
	import PaletteIcon from "@lucide/svelte/icons/palette";
	import SearchIcon from "@lucide/svelte/icons/search";
	import SparklesIcon from "@lucide/svelte/icons/sparkles";
	import XIcon from "@lucide/svelte/icons/x";
	import { Command, Dialog } from "bits-ui";
	import {
		getLocaleFromUrl,
		useTranslatedPath,
		useTranslations,
	} from "../utilities/i18n";
	import { isValidIconCategory } from "../utilities/icons";
	import ColorSwatch from "./color-swatch.svelte";
	import DiscordIcon from "./discord-icon.svelte";
	import GithubIcon from "./github-icon.svelte";
	import ThemeIcon from "./theme-icon.svelte";

	type Item = {
		label: string;
		searchText: string;
		href: string;
		icon: string;
		subthemes?: { name: string }[];
	};

	type Group = {
		heading: string;
		kind: "page" | "theme" | "color" | "link";
		items: Item[];
	};

	type Props = {
		defaultGroups: Group[];
		searchGroups: Group[];
		repoSlugs: string[];
	};
	let { defaultGroups, searchGroups, repoSlugs }: Props = $props();

	let open = $state(false);
	let search = $state("");
	let previouslyActiveElement = $state<Element | null>(null);
	let isSearching = $derived(search.length > 0);
	let query = $derived(search.toLowerCase());

	function matchHint(item: Item): string | null {
		if (!query || item.label.toLowerCase().includes(query)) return null;
		const subtheme = item.subthemes?.find((s) =>
			s.name.toLowerCase().includes(query),
		);
		return subtheme?.name ?? null;
	}

	let filteredGroups = $derived(
		isSearching
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
	let randomSlug = $derived(
		open ? repoSlugs[Math.floor(Math.random() * repoSlugs.length)] : "",
	);

	let locale = getLocaleFromUrl();
	let t = useTranslations(locale);
	let translatePath = useTranslatedPath(locale);

	let iconMap = {
		"book-text": BookTextIcon,
		discord: DiscordIcon,
		github: GithubIcon,
		house: HouseIcon,
		image: ImageIcon,
		mail: MailIcon,
		palette: PaletteIcon,
		sparkles: SparklesIcon,
	};

	function isIconName(name: string): name is keyof typeof iconMap {
		return Object.hasOwn(iconMap, name);
	}

	function openCommandMenu(e: KeyboardEvent) {
		if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
			e.preventDefault();
			open = true;
		}
	}
</script>

<svelte:document onkeydown={openCommandMenu} />

<Dialog.Root bind:open>
	<!-- Desktop trigger -->
	<Dialog.Trigger
		class="hidden h-7 cursor-pointer items-center justify-center gap-1.5 rounded-full border border-muted/20 bg-muted/5 px-2 transition hover:bg-muted/10 md:flex"
	>
		<SearchIcon size="16" />
		<span class="sr-only">{t("command.trigger")}</span>
		<kbd class="rounded-full font-mono text-sm tracking-widest text-subtle"
			>⌘K</kbd
		>
	</Dialog.Trigger>

	<!-- Mobile trigger -->
	<Dialog.Trigger
		class="relative z-50 flex size-(--badge-size) cursor-pointer items-center justify-center rounded-(--card-inner-radius) transition hover:bg-muted/10 md:hidden"
	>
		<SearchIcon size="20" />
		<span class="sr-only">{t("command.trigger")}</span>
	</Dialog.Trigger>

	<Dialog.Portal>
		<Dialog.Overlay class="fixed inset-0 z-80 bg-black/50" />

		<Dialog.Content
			onOpenAutoFocus={() => {
				previouslyActiveElement = document.activeElement;
			}}
			onCloseAutoFocus={(e) => {
				e.preventDefault();
				if (document.activeElement instanceof HTMLElement) {
					// Prevent scroll jump to active element
					document.activeElement.blur();
				}
				if (previouslyActiveElement instanceof HTMLElement) {
					// Restore active element focus
					previouslyActiveElement.focus();
				}
			}}
			class="fixed bottom-0 left-1/2 z-90 w-full max-w-xl -translate-x-1/2 overflow-hidden rounded-t-(--dialog-radius) bg-surface shadow-xl [--dialog-gutter-half:calc(var(--dialog-gutter)/2)] [--dialog-gutter:--spacing(5)] [--dialog-inner-radius:calc(var(--dialog-radius)/2)] [--dialog-radius:1.5rem] supports-backdrop-filter:bg-surface/95 supports-backdrop-filter:backdrop-blur-sm sm:bottom-page-gutters sm:w-9/10 sm:rounded-(--dialog-radius) md:top-20 md:bottom-auto"
		>
			<Dialog.Title class="sr-only">
				{t("command.title")}
			</Dialog.Title>
			<Dialog.Description class="sr-only">
				{t("command.description")}
			</Dialog.Description>

			<Command.Root
				shouldFilter={false}
				class="flex h-full w-full flex-col-reverse overflow-hidden [--close-size:calc(var(--input-height)-var(--dialog-gutter))] [--input-height:--spacing(15)] md:flex-col"
			>
				<div
					class="flex items-center gap-3 border-t border-muted/10 bg-surface supports-backdrop-filter:bg-surface/95 supports-backdrop-filter:backdrop-blur-sm md:border-t-0 md:border-b"
				>
					<label for="global-search" class="ps-(--dialog-gutter) text-subtle">
						<SearchIcon size="20" />
					</label>
					<Command.Input
						id="global-search"
						bind:value={search}
						placeholder={t("command.search_placeholder")}
						class="placeholder h-(--input-height) w-full placeholder-muted focus:outline-none"
					/>
					<button
						aria-label={t("command.close")}
						onclick={() => (open = false)}
						class="me-(--dialog-gutter-half) flex size-(--close-size) shrink-0 items-center justify-center rounded-(--dialog-inner-radius) text-subtle transition hover:bg-muted/10 hover:text-text"
					>
						<XIcon size="24" strokeWidth="1.5" />
					</button>
				</div>

				<Command.List
					class="max-h-80 overflow-x-hidden overflow-y-auto py-(--dialog-gutter-half)"
				>
					<Command.Viewport class="flex flex-col gap-3">
						<Command.Empty class="flex justify-center p-(--dialog-gutter-half)">
							<a
								href={translatePath(`/themes/${randomSlug}`)}
								class="group/cta flex h-8 shrink-0 items-center gap-2 rounded-lg border-2 border-text ps-3 pe-4 font-serif font-medium italic transition hover:border-gold hover:bg-gold/10 hover:text-gold"
							>
								<Dice3Icon
									size="16"
									class="transition-transform group-hover/cta:-rotate-3"
								/>
								<span class="pb-px">{t("command.feeling_lucky")}</span>
							</a>
						</Command.Empty>

						{#each filteredGroups as group, groupIndex (group.heading)}
							{#if groupIndex !== 0}
								<Command.Separator />
							{/if}

							<Command.Group>
								<Command.GroupHeading
									class="px-(--dialog-gutter) font-serif text-sm text-subtle italic"
								>
									{group.heading}
								</Command.GroupHeading>
								<Command.GroupItems
									class="flex flex-col px-(--dialog-gutter-half) has-data-command-item:pt-3"
								>
									{#each group.items as item (item.searchText)}
										{@const hint = isSearching ? matchHint(item) : null}
										<Command.LinkItem
											href={item.href}
											class="group flex h-11 scroll-mt-11 scroll-mb-(--dialog-gutter-half) items-center gap-3 rounded-lg px-(--dialog-gutter-half) text-subtle data-selected:bg-muted/10 data-selected:text-text"
										>
											{#if (group.kind === "page" || group.kind === "link") && isIconName(item.icon)}
												{@const IconComponent = iconMap[item.icon]}
												<div class="flex size-6 items-center justify-center">
													<IconComponent size="16" />
												</div>
											{:else if group.kind === "theme" && isValidIconCategory(item.icon)}
												<div class="text-subtle hover:text-text">
													<ThemeIcon size="sm" category={item.icon} />
												</div>
											{:else}
												<div class="flex size-6 items-center justify-center">
													<ColorSwatch color={item.icon} size="sm" />
												</div>
											{/if}
											<div
												class="flex-1 truncate text-sm font-medium text-text"
											>
												{item.label}
												{#if hint}
													<span class="ml-1 text-xs font-normal text-subtle">
														— "{hint}"
													</span>
												{/if}
											</div>
											<ChevronRightIcon
												size="18"
												class="text-muted group-data-selected:text-text rtl:rotate-180"
											/>
										</Command.LinkItem>
									{/each}
								</Command.GroupItems>
							</Command.Group>
						{/each}
					</Command.Viewport>
				</Command.List>

				<div
					class="pointer-events-none fixed inset-x-0 top-0 h-3 bg-linear-to-b from-surface/95 to-surface/1 md:top-[calc(var(--input-height)+1px)]"
				></div>
				<div
					class="pointer-events-none -z-1 fixed inset-x-0 bottom-[calc(var(--input-height)+1px)] h-3 bg-linear-to-t from-surface/95 to-surface/1 md:bottom-0 md:h-6"
				></div>
			</Command.Root>
		</Dialog.Content>
	</Dialog.Portal>
</Dialog.Root>
