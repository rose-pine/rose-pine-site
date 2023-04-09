<script lang="ts">
	import hasMatch from "has-match";
	import Card from "$components/card.svelte";
	import { themes } from "$data/themes";
	import { queryTheme } from "$store";

	$: filteredThemes = themes.filter((theme) =>
		hasMatch(theme, $queryTheme, ["name", "tags"])
	);
</script>

<ul class="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
	{#each filteredThemes as theme}
		<li>
			<Card href={theme.url}>
				<div class="flex items-center justify-between">
					<svelte:component
						this={theme.icon}
						stroke={1.5}
						aria-hidden="true"
						class="text-subtle"
					/>

					{#if theme.featured}
						<div
							class="pointer-events-none rounded-full bg-gradient-to-br from-rose via-iris to-foam px-2 py-1 text-surface"
						>
							<p class="text-xs font-bold uppercase tracking-wide">Spicy</p>
						</div>
					{/if}
				</div>

				<div class="h-1.5" />

				<p class="font-semibold">{theme.name}</p>

				<div class="h-1.5" />

				<div class="flex">
					<p class="font-medium text-iris hover:underline">
						Repository&nbsp;&nearr;
					</p>
				</div>
			</Card>
		</li>
	{/each}
</ul>
