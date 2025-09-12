<script lang="ts">
	import { getLangFromUrl, useTranslatedPath } from "../i18n/utilities";
	import { themeSearch } from "../state.svelte";

	let { themes }: { themes: Repo[] } = $props();

	const themesWithTagSets = $derived(
		themes.map((theme) => ({
			...theme,
			tagSet: new Set(theme.tags.map((tag) => tag.toLowerCase())),
		})),
	);

	let selectedTags = $derived([...themeSearch.tags]);
	let filteredThemes = $derived(
		themesWithTagSets.filter((theme) => {
			const normalizedQuery = themeSearch.query.toLowerCase();
			return (
				theme.name.toLowerCase().includes(normalizedQuery) &&
				selectedTags.every((tag) => theme.tagSet.has(tag.toLowerCase()))
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
		<article>
			<a
				href={translatePath(`/themes/${theme.slug}`)}
				aria-labelledby={theme.slug}
				class="group relative isolate flex h-full flex-col gap-2.5 rounded-2xl border border-overlay bg-surface p-5 transition hover:border-iris/20 hover:bg-iris/5"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="20"
					height="20"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="text-subtle"
					><path
						d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"
					></path><path d="m3.3 7 8.7 5 8.7-5"></path><path d="M12 22V12"
					></path></svg
				>
				<h2 id={theme.slug} class="font-medium">
					{theme.name}
				</h2>
			</a>
		</article>
	{/each}
</section>
