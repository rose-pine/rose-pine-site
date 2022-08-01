<script lang="ts">
	import palette from '@rose-pine/palette'
	import Card from '$lib/components/card.svelte'
	import { toCamelCase } from '$lib/util'

	export let role = 'base'

	const slug = role.toLowerCase().replace(' ', '-').trim()
	const variants = Object.keys(palette.variants)

	const variantNames = {
		main: 'Rosé Pine',
		moon: 'Rosé Pine Moon',
		dawn: 'Rosé Pine Dawn',
	}
</script>

<Card id={slug}>
	<div class="flex h-full flex-col space-y-6">
		<div class="flex items-center justify-between">
			<h3 class="font-display text-xl font-bold tracking-wide">
				<a href={`#${slug}`} class="capitalize">{role}</a>
			</h3>

			<div class="inline-flex space-x-2">
				{#each variants as variant}
					{@const variantName = variantNames[variant]}

					<div
						title={`${variantName} ${role}`}
						class="h-6 w-6 rounded-full border-2 sm:h-8 sm:w-8"
						style:background={palette.variants[variant][toCamelCase(role)].hex}
					/>
				{/each}
			</div>
		</div>

		{#if $$slots.description}
			<blockquote
				class="border-l-2 pl-3 text-sm font-medium italic text-subtle"
			>
				<slot name="description" />
			</blockquote>
		{/if}

		{#if $$slots.list}
			<ul
				class="ml-[18px] list-disc text-sm leading-relaxed marker:text-subtle"
			>
				<slot name="list" />
			</ul>
		{/if}

		{#if $$slots.chips}
			<div class="flex h-full flex-col">
				<div class="flex-1" />

				<div class="flex items-center space-x-2">
					<slot name="chips" />
				</div>
			</div>
		{/if}
	</div>
</Card>
