<script>
	import { _ } from 'svelte-i18n'
	import Section from '$lib/components/section.svelte'
	import Swatches from '$lib/components/swatches.svelte'
	import Ingredients from '$lib/components/ingredients.svelte'

	let view = Swatches
</script>

<Section>
	<div
		class="flex flex-col items-center justify-between text-center lg:flex-row lg:text-left"
	>
		<div class="shrink-0">
			<h2 class="animate-enter font-display text-4xl tracking-wide">
				{$_('page.palette.title')}
			</h2>

			<p
				class="animate-enter mt-6 font-medium text-subtle"
				style="--stagger: 1"
			>
				{$_('page.palette.description')}
			</p>
		</div>

		<div
			class="animate-enter flex w-full items-center justify-center lg:justify-end"
			style="--stagger: 1"
		>
			<div
				class="mt-6 inline-flex items-center divide-x divide-highlight-med-blend overflow-hidden rounded-md border border-highlight-med-blend bg-surface"
			>
				<button
					on:click={() => (view = Swatches)}
					class="px-4 py-2 text-sm font-medium focus:outline-none focus:ring focus:ring-inset focus:ring-highlight-high"
					style:color={view === Swatches ? 'var(--text)' : 'var(--subtle)'}
					style:background-color={view === Swatches
						? 'var(--surface)'
						: 'var(--highlight-med)'}
				>
					{$_('page.palette.switch.swatches')}
				</button>

				<button
					on:click={() => (view = Ingredients)}
					class="px-4 py-2 text-sm font-medium focus:outline-none focus:ring focus:ring-inset focus:ring-highlight-high"
					style:color={view === Ingredients ? 'var(--text)' : 'var(--subtle)'}
					style:background-color={view === Ingredients
						? 'var(--surface)'
						: 'var(--highlight-med)'}
				>
					{$_('page.palette.switch.ingredients')}
				</button>
			</div>
		</div>
	</div>

	<div class="animate-enter" style="--stagger: 2">
		<svelte:component this={view} />
	</div>
</Section>
