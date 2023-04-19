<script lang="ts">
	import { tags } from "$data/themes";
	import { queryTheme } from "$store";
</script>

<ul
	role="list"
	class="flex flex-wrap items-center justify-center gap-3 md:justify-start [&>*]:shrink-0"
>
	<li
		aria-current={$queryTheme.toLowerCase() === "featured" ? "true" : "false"}
	>
		<button
			on:click={() => queryTheme.set("featured")}
			class="flex h-7 items-center rounded-full bg-muted/10 px-3.5 text-sm font-[550] capitalize text-text/80 transition hover:bg-muted/20 hover:text-text focus:outline-none focus:ring"
		>
			<svg
				aria-hidden="true"
				xmlns="http://www.w3.org/2000/svg"
				width="14"
				height="14"
				viewBox="0 0 24 24"
				stroke-width="2"
				stroke="currentColor"
				fill="none"
				stroke-linecap="round"
				stroke-linejoin="round"
				class="-ml-1 mr-1.5 text-gold"
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
			Featured
		</button>
	</li>

	{#each tags as tag}
		<li
			aria-current={$queryTheme.toLowerCase() === tag.toLowerCase()
				? "true"
				: "false"}
		>
			<button
				on:click={() => queryTheme.set(tag)}
				class="flex h-7 items-center rounded-full bg-muted/10 px-3.5 text-sm font-[550] capitalize text-text/80 transition hover:bg-muted/20 hover:text-text focus:outline-none focus:ring"
			>
				{tag.replaceAll("-", " ")}
			</button>
		</li>
	{/each}
</ul>

<style lang="postcss">
	[aria-current="true"] > button {
		@apply bg-iris/10 text-iris;
	}
</style>
