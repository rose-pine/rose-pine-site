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
			<Card href={theme.url} linkText="Repository">
				<div class="flex items-center justify-between">
					<svelte:component
						this={theme.icon}
						stroke={1.5}
						aria-hidden="true"
						class="text-subtle"
					/>

					{#if theme.featured}
						<span class="sr-only">Featured theme</span>
						<svg
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							width="20"
							height="20"
							viewBox="0 0 24 24"
							stroke-width="2"
							stroke="currentColor"
							fill="none"
							stroke-linecap="round"
							stroke-linejoin="round"
							class="text-gold"
						>
							<defs>
								<linearGradient id="spicy">
									<stop offset="0%" stop-color="hsl(var(--color-rose))" />
									<stop offset="50%" stop-color="hsl(var(--color-iris))" />
									<stop offset="100%" stop-color="hsl(var(--color-foam))" />
								</linearGradient>
							</defs>
							<path stroke="none" d="M0 0h24v24H0z" fill="none" />
							<path
								d="M8.243 7.34l-6.38 .925l-.113 .023a1 1 0 0 0 -.44 1.684l4.622 4.499l-1.09 6.355l-.013 .11a1 1 0 0 0 1.464 .944l5.706 -3l5.693 3l.1 .046a1 1 0 0 0 1.352 -1.1l-1.091 -6.355l4.624 -4.5l.078 -.085a1 1 0 0 0 -.633 -1.62l-6.38 -.926l-2.852 -5.78a1 1 0 0 0 -1.794 0l-2.853 5.78z"
								stroke-width="0"
								fill="url(#spicy)"
							/>
						</svg>
					{/if}
				</div>

				<div class="h-1.5" />

				<p class="font-semibold">{theme.name}</p>
			</Card>
		</li>
	{/each}
</ul>
