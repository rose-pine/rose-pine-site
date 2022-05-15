<script lang="ts">
	export let title = ''
	export let description = ''
	export let metaTitle = title
	export let metaDescription = description
	export let items = []
</script>

<svelte:head>
	<title>{metaTitle} | Rosé Pine</title>
	<meta name="description" content={metaDescription} />
</svelte:head>

{#if title}
	<div
		class="flex flex-col items-center justify-between pb-20 text-center lg:flex-row lg:text-left"
	>
		<div class="shrink-0">
			<h2 class="animate-enter font-display text-4xl tracking-wide">
				{title}
			</h2>

			<p
				class="animate-enter mt-6 font-medium text-subtle"
				style="--stagger: 1"
			>
				{description}
			</p>

			{#if items.length > 0}
				<ul
					class="mt-2 flex cursor-default select-none items-center justify-center space-x-3 lg:justify-start"
				>
					{#each items as item, i}
						<li
							class="animate-enter flex items-center space-x-1"
							style="--stagger: {2 + i / 5}"
						>
							<slot name="item" {item} />
						</li>
					{/each}
				</ul>
			{/if}
		</div>

		<div
			class="animate-enter mt-6 flex w-full items-center justify-center lg:justify-end"
			style="--stagger: 1"
		>
			<slot />
		</div>
	</div>
{/if}
