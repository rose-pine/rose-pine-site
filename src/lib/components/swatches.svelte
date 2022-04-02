<script lang="ts">
	import { _ } from 'svelte-i18n'
	import palette from '@rose-pine/palette'
	import { clipboard } from '$lib/store'

	const variants = Object.keys(palette.variants)
	const roles = Object.keys(palette.roles)
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
			class="pb-6 font-display text-lg font-semibold leading-none tracking-wide"
		>
			{variantName}
		</h4>

		<div class="grid grid-cols-3 gap-4 sm:gap-6 md:grid-cols-6">
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
					on:click={() => clipboard.copy(color.hex, `${variant}.${role}.hex`)}
					class="flex h-full flex-col items-center rounded-2xl bg-gradient-to-br from-surface via-base to-surface bg-[length:200%_200%] bg-left-top shadow transition-[background-position,box-shadow] duration-200 ease-in-out hover:bg-right-bottom focus:outline-none focus:ring focus:ring-highlight-high dark:from-overlay dark:to-base dark:shadow-none"
				>
					<div class="h-10 w-full rounded-t-2xl" style:background={color.hex} />
					<p
						class="px-2 py-6 text-center font-display text-sm font-semibold tracking-wide md:text-md"
					>
						{#if $clipboard.pos === `${variant}.${role}.hex`}
							<span class="text-rose">{$_('page.palette.button.copied')}</span>
						{:else}
							<span>{colorName}</span>
						{/if}
					</p>
				</button>
			{/each}
		</div>
	</div>
{/each}
