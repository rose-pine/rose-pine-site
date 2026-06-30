<script lang="ts">
	import { themeSearch } from "../state.svelte";
	import type { Repo } from "../types/theme";
	import ThemeCard from "./theme-card.svelte";

	let { themes }: { themes: Repo[] } = $props();

	let filteredThemes = $derived(
		themes.filter(
			(theme) =>
				theme.searchText.includes(themeSearch.query.toLowerCase()) &&
				(!themeSearch.category || theme.category === themeSearch.category),
		),
	);
</script>

<section class="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
	{#each filteredThemes as theme}
		<ThemeCard {theme} query={themeSearch.query} />
	{/each}
</section>
