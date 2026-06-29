<script lang="ts">
	import hasMatch from "has-match";
	import { themeSearch } from "../state.svelte";
	import type { Repo } from "../types/theme";
	import ThemeCard from "./theme-card.svelte";

	let { themes }: { themes: Repo[] } = $props();

	let filteredThemes = $derived(
		themes.filter((theme) => {
			const categoryMatch =
				!themeSearch.category || theme.category === themeSearch.category;

			return (
				hasMatch(theme, themeSearch.query, ["name", "tags", "subthemes"]) &&
				categoryMatch
			);
		}),
	);
</script>

<section class="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
	{#each filteredThemes as theme}
		<ThemeCard {theme} />
	{/each}
</section>
