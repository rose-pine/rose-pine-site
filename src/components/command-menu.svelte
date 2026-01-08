<script lang="ts">
	import BookTextIcon from "@lucide/svelte/icons/book-text";
	import ChevronRightIcon from "@lucide/svelte/icons/chevron-right";
	import Dice3Icon from "@lucide/svelte/icons/dice-3";
	import HouseIcon from "@lucide/svelte/icons/house";
	import ImageIcon from "@lucide/svelte/icons/image";
	import LibraryIcon from "@lucide/svelte/icons/library";
	import MailIcon from "@lucide/svelte/icons/mail";
	import PaletteIcon from "@lucide/svelte/icons/palette";
	import SailboatIcon from "@lucide/svelte/icons/sailboat";
	import SearchIcon from "@lucide/svelte/icons/search";
	import SparklesIcon from "@lucide/svelte/icons/sparkles";
	import XIcon from "@lucide/svelte/icons/x";
	import { Command, Dialog } from "bits-ui";
	import { getRandomRepo } from "../data";
	import {
		getLangFromUrl,
		useTranslatedPath,
		useTranslations,
	} from "../i18n/utilities";
	import DiscordIcon from "./discord-icon.svelte";
	import GithubIcon from "./github-icon.svelte";

	type Group = {
		heading: string;
		items: {
			label: string;
			href: string;
			icon: string;
		}[];
	};

	type Props = {
		defaultGroups: Group[];
		searchGroups: Group[];
	};
	let { defaultGroups, searchGroups }: Props = $props();

	let open = $state(false);
	let search = $state("");
	let previouslyActiveElement = $state<Element | null>(null);
	let isSearching = $derived(search.length > 0);
	let groups = $derived(isSearching ? searchGroups : defaultGroups);

	let lang = getLangFromUrl();
	let t = useTranslations(lang);
	let translatePath = useTranslatedPath(lang);

	let iconMap = {
		"book-text": BookTextIcon,
		discord: DiscordIcon,
		github: GithubIcon,
		house: HouseIcon,
		image: ImageIcon,
		library: LibraryIcon,
		mail: MailIcon,
		palette: PaletteIcon,
		sailboat: SailboatIcon,
		sparkles: SparklesIcon,
	};

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
		<span class="sr-only">{t("command.search")}</span>
		<kbd class="rounded-full font-mono text-sm tracking-widest text-subtle"
			>⌘K</kbd
		>
	</Dialog.Trigger>

	<!-- Mobile trigger -->
	<Dialog.Trigger
		class="relative z-50 flex size-(--badge-size) cursor-pointer items-center justify-center rounded-(--card-inner-radius) transition hover:bg-muted/10 md:hidden"
	>
		<SearchIcon size="20" />
		<span class="sr-only">{t("command.search")}</span>
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
			class="fixed bottom-page-gutter left-1/2 z-90 w-9/10 max-w-xl -translate-x-1/2 overflow-hidden rounded-(--dialog-radius) bg-surface shadow-xl [--dialog-gutter-half:calc(var(--dialog-gutter)/2)] [--dialog-gutter:--spacing(5)] [--dialog-inner-radius:calc(var(--dialog-radius)/2)] [--dialog-radius:1.5rem] supports-backdrop-filter:bg-surface/95 supports-backdrop-filter:backdrop-blur-sm md:top-20 md:bottom-auto"
		>
			<Dialog.Title class="sr-only">Command Menu</Dialog.Title>
			<Dialog.Description class="sr-only">
				{t("command.search_detail")}
			</Dialog.Description>

			<Command.Root
				label="Global site search"
				class="flex h-full w-full flex-col-reverse overflow-hidden [--close-size:calc(var(--input-height)-var(--dialog-gutter))] [--input-height:--spacing(15)] md:flex-col"
			>
				<div
					class="flex items-center gap-3 border-t border-muted/10 bg-surface supports-backdrop-filter:bg-surface/95 supports-backdrop-filter:backdrop-blur-sm md:border-t-0 md:border-b"
				>
					<label for="global-search" class="pl-(--dialog-gutter) text-subtle">
						<SearchIcon size="20" />
					</label>
					<Command.Input
						id="global-search"
						bind:value={search}
						placeholder="Search pages, themes and palette..."
						class="placeholder h-(--input-height) w-full placeholder-muted focus:outline-none"
					/>
					<button
						aria-label={t("command.close")}
						onclick={() => (open = false)}
						class="mr-(--dialog-gutter-half) flex size-(--close-size) shrink-0 items-center justify-center rounded-(--dialog-inner-radius) text-subtle transition hover:bg-muted/10 hover:text-text"
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
								href={translatePath(`/themes/${getRandomRepo().slug}`)}
								class="group/cta flex h-8 shrink-0 items-center gap-2 rounded-lg border border-text pr-4 pl-3 font-serif italic transition hover:border-gold hover:bg-gold/10 hover:text-gold"
							>
								<Dice3Icon
									size="16"
									class="transition-transform group-hover/cta:-rotate-3"
								/>
								<span class="pb-px">{t("command.feeling_lucky")}</span>
							</a>
						</Command.Empty>

						{#each groups as group, groupIndex (group.heading)}
							{#if groupIndex !== 0}
								<Command.Separator />
							{/if}

							<Command.Group value="{group.heading} {groupIndex} group">
								<Command.GroupHeading
									class="px-(--dialog-gutter) font-serif text-sm text-muted italic"
								>
									{group.heading}
								</Command.GroupHeading>
								<Command.GroupItems
									class="flex flex-col px-(--dialog-gutter-half) has-data-command-item:pt-3"
								>
									{#each group.items as { label, href, icon }, itemIndex (`${label}:${group.heading}`)}
										<Command.LinkItem
											{href}
											value="{label} {itemIndex}"
											class="group flex h-11 scroll-mt-11 scroll-mb-(--dialog-gutter-half) items-center gap-3 rounded-lg px-(--dialog-gutter-half) text-subtle data-selected:bg-muted/10 data-selected:text-text"
										>
											{#if icon in iconMap}
												{@const IconComponent =
													iconMap[icon as keyof typeof iconMap]}
												<IconComponent size="16" />
											{:else}
												<div
													class="size-4 rounded-lg border border-muted/20"
													style:background="var(--color-{icon})"
												></div>
											{/if}
											<div
												class="flex-1 text-sm font-medium text-text"
												class:capitalize={!(icon in iconMap)}
											>
												{label}
											</div>
											<ChevronRightIcon
												size="18"
												class="text-muted group-data-selected:text-text"
											/>
										</Command.LinkItem>
									{/each}
								</Command.GroupItems>
							</Command.Group>
						{/each}
					</Command.Viewport>
				</Command.List>

				<div
					class="fixed inset-x-0 top-0 h-3 bg-linear-to-b from-surface/95 md:top-[calc(var(--input-height)+1px)]"
				></div>
				<div
					class="fixed inset-x-0 bottom-[calc(var(--input-height)+1px)] h-3 bg-linear-to-t from-surface/95 md:bottom-0 md:h-6"
				></div>
			</Command.Root>
		</Dialog.Content>
	</Dialog.Portal>
</Dialog.Root>
