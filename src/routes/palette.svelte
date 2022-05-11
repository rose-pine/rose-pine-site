<script>
	import { _ } from 'svelte-i18n'
	import Meta from '$lib/components/meta.svelte'
	import Section from '$lib/components/section.svelte'
	import PageHeading from '$lib/components/page-heading.svelte'
	import Swatches from '$lib/components/swatches.svelte'
	import Ingredients from '$lib/components/ingredients.svelte'

	let view = Swatches
</script>

<Meta
	title={$_('page.palette.nav')}
	description={$_('page.palette.description')}
/>

<Section>
	<PageHeading
		title={$_('page.palette.title')}
		description={$_('page.palette.description')}
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
				{$_('page.palette.button.swatches')}
			</button>

			<button
				on:click={() => (view = Ingredients)}
				class="px-4 py-2 text-sm font-medium focus:outline-none focus:ring focus:ring-inset focus:ring-highlight-high"
				style:color={view === Ingredients ? 'var(--text)' : 'var(--subtle)'}
				style:background-color={view === Ingredients
					? 'var(--surface)'
					: 'var(--highlight-med)'}
			>
				{$_('page.palette.button.ingredients')}
			</button>
		</div>
	</PageHeading>

	<div class="animate-enter" style="--stagger: 2">
		<svelte:component this={view} />
	</div>
</Section>
