<script lang="ts">
	import palette from '@rose-pine/palette'
	import { browser } from '$app/env'

	const variants = Object.keys(palette.variants)
	const roles = Object.keys(palette.roles)

	let copiedItem = ''
	let copiedTimeout = setTimeout

	function copy(item, itemId) {
		if (browser) {
			navigator.clipboard.writeText(item).then(() => (copiedItem = itemId))

			clearTimeout(copiedTimeout)
			copiedTimeout = setTimeout(() => {
				copiedItem = ''
			}, 600)
		}
	}
</script>

{#each variants as variant}
	{@const variantName =
		variant === 'moon'
			? 'Rosé Pine Moon'
			: variant === 'dawn'
			? 'Rosé Pine Dawn'
			: 'Rosé Pine'}

	<div class="py-20">
		<h4
			id="{variant}-swatches"
			class="pb-6 leading-none font-display font-semibold text-lg tracking-wide"
		>
			{variantName}
		</h4>

		<div class="grid gap-4 sm:gap-6 grid-cols-3 md:grid-cols-6">
			{#each roles as role}
				{@const color = palette.variants[variant][role]}
				{@const colorName =
					role === 'highlightLow'
						? 'highlight low'
						: role === 'highlightMed'
						? 'highlight med'
						: role === 'highlightHigh'
						? 'highlight high'
						: role}

				<button
					on:click={() => copy(color.hex, `${variant}.${role}.hex`)}
					class="h-full bg-gradient-to-br from-surface dark:from-overlay via-base to-surface dark:to-base bg-[length:200%_200%] bg-left-top hover:bg-right-bottom shadow dark:shadow-none duration-200 transition-[background-position,box-shadow] ease-in-out rounded-2xl flex flex-col items-center focus:outline-none focus:ring focus:ring-highlight-high"
				>
					<div class="w-full h-10 rounded-t-2xl" style:background={color.hex} />
					<p
						class="px-2 py-6 font-display font-semibold text-sm md:text-md text-center tracking-wide"
					>
						{#if copiedItem === `${variant}.${role}.hex`}
							<span class="text-rose">copied</span>
						{:else}
							<span>{colorName}</span>
						{/if}
					</p>
				</button>
			{/each}
		</div>
	</div>
{/each}
