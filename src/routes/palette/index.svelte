<script lang="ts">
	import { _ } from 'svelte-i18n'
	import palette from '@rose-pine/palette'
	import { clipboard } from '$lib/store'

	const variants = Object.keys(palette.variants)
	const roles = Object.keys(palette.roles)

	const variantNames = {
		main: 'Rosé Pine',
		moon: 'Rosé Pine Moon',
		dawn: 'Rosé Pine Dawn',
	}
</script>

<div class="space-y-40">
	{#each variants as variant}
		{@const variantName = variantNames[variant]}

		<div>
			<h4
				id="{variant}-swatches"
				class="pb-6 font-display text-lg font-semibold leading-none tracking-wide"
			>
				{variantName}
			</h4>

			<div class="grid grid-cols-3 gap-4 sm:gap-6 md:grid-cols-6">
				{#each roles as role}
					{@const color = palette.variants[variant][role]}
					{@const colorName = role.replace(/([A-Z])/g, ' $1')}

					<button
						on:click={() => clipboard.copy(color.hex, `${variant}.${role}.hex`)}
						class="flex h-full flex-col items-center rounded-2xl bg-gradient-to-br from-surface via-base to-surface bg-[length:200%_200%] bg-left-top shadow transition-[background-position,box-shadow] hover:bg-right-bottom focus:outline-none focus:ring dark:from-overlay dark:to-base dark:shadow-none"
					>
						<div
							class="h-10 w-full rounded-t-2xl"
							style:background={color.hex}
						/>
						<p
							class="px-2 py-6 text-center font-display text-sm font-semibold capitalize tracking-wide"
						>
							{#if $clipboard.pos === `${variant}.${role}.hex`}
								<span class="text-rose">{$_('page.palette.button.copied')}</span
								>
							{:else}
								<span>{colorName}</span>
							{/if}
						</p>
					</button>
				{/each}
			</div>
		</div>
	{/each}
</div>
