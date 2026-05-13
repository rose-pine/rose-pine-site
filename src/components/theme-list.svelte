<script lang="ts">
	import User from "@lucide/svelte/icons/user";
	import Users from "@lucide/svelte/icons/users";
	import hasMatch from "has-match";
	import { getLangFromUrl, useTranslatedPath } from "../i18n/utilities";
	import { themeSearch } from "../state.svelte";
	import { isValidIconCategory } from "../utilities/icons";
	import ThemeIcon from "./theme-icon.svelte";

	let { themes }: { themes: Repo[] } = $props();

	let filteredThemes = $derived(
		themes.filter((theme) => {
			const categoryMatch =
				!themeSearch.category || theme.category === themeSearch.category;

			return (
				hasMatch(theme, themeSearch.query, ["name", "tags", "children"]) &&
				categoryMatch
			);
		}),
	);

	let lang = getLangFromUrl();
	let translatePath = useTranslatedPath(lang);
</script>

<section class="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
	{#each filteredThemes as theme}
		<article>
			<a
				href={translatePath(`/themes/${theme.slug}`)}
				aria-labelledby={theme.slug}
				class="group isolate flex items-center gap-3 rounded-xl border border-muted/20 bg-surface px-4 py-3 hover:bg-muted/5"
			>
				{#if isValidIconCategory(theme.category)}
					<ThemeIcon size="md" category={theme.category} />
				{/if}
				<div class="flex flex-col truncate opacity-90 group-hover:opacity-100">
					{#snippet contributors(number: number)}
						<div class="flex items-center gap-1.5">
							<h2
								id={theme.slug}
								class="shrink truncate font-semibold text-nowrap"
							>
								{theme.name}
							</h2>
							{#if theme.featured}
								<div>
									<span class="sr-only">Featured theme</span>
									<svg
										aria-hidden="true"
										xmlns="http://www.w3.org/2000/svg"
										width="12"
										height="12"
										viewBox="0 0 24 24"
										stroke-width="2"
										stroke="currentColor"
										fill="none"
										stroke-linecap="round"
										stroke-linejoin="round"
									>
										<defs>
											<linearGradient id="spicy">
												<stop offset="0%" stop-color="var(--color-rose)" />
												<stop offset="50%" stop-color="var(--color-iris)" />
												<stop offset="100%" stop-color="var(--color-foam)" />
											</linearGradient>
										</defs>
										<path stroke="none" d="M0 0h24v24H0z" fill="none" />
										<path
											d="M8.243 7.34l-6.38 .925l-.113 .023a1 1 0 0 0 -.44 1.684l4.622 4.499l-1.09 6.355l-.013 .11a1 1 0 0 0 1.464 .944l5.706 -3l5.693 3l.1 .046a1 1 0 0 0 1.352 -1.1l-1.091 -6.355l4.624 -4.5l.078 -.085a1 1 0 0 0 -.633 -1.62l-6.38 -.926l-2.852 -5.78a1 1 0 0 0 -1.794 0l-2.853 5.78z"
											stroke-width="0"
											fill="url(#spicy)"
										/>
									</svg>
								</div>
							{/if}
						</div>
						<div
							class="mt-0.5 flex items-center gap-1 text-xs font-medium text-subtle"
						>
							{#if number == 1}
								<User size="12" strokeWidth="2.5" />
							{:else}
								<Users size="12" strokeWidth="2.5" />
							{/if}
							{number} contributor{number == 1 ? "" : "s"}
						</div>
					{/snippet}
					{@render contributors(theme.contributors.length)}
				</div>
			</a>
		</article>
	{/each}
</section>
