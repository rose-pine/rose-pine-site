<script lang="ts">
	import hasMatch from "has-match";
	import { getLangFromUrl, useTranslatedPath } from "../i18n/utilities";
	import { themeSearch } from "../state.svelte";
	import { getSvelteIconComponent } from "../utilities/icons-svelte";

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

<section
	class="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
>
	{#each filteredThemes as theme}
		{@const IconComponent = getSvelteIconComponent(theme.category)}
		<article>
			<a
				href={translatePath(`/themes/${theme.slug}`)}
				aria-labelledby={theme.slug}
				class="group relative isolate flex h-full flex-col gap-2.5 rounded-2xl border border-overlay bg-surface p-5 transition hover:border-iris/20 hover:bg-iris/5"
			>
				<IconComponent size="18" strokeWidth="2" />
				<h2 id={theme.slug} class="font-medium">
					{theme.name}
				</h2>
			</a>
		</article>
	{/each}
</section>
