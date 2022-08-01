<script>
	import { _ } from 'svelte-i18n'
	import Section from '$lib/components/section.svelte'
	import PageHeading from '$lib/components/page-heading.svelte'
	import Swatches from '$lib/components/swatches.svelte'
	import Ingredients from '$lib/components/ingredients.svelte'

	let view = Swatches
</script>

<Section>
	<PageHeading
		title={$_('page.palette.title')}
		description={$_('page.palette.description')}
	>
		<div
			class="inline-flex items-center divide-x overflow-hidden rounded-md border bg-surface"
		>
			<button
				on:click={() => (view = Swatches)}
				class="px-4 py-2 text-sm font-medium focus:outline-none focus:ring focus:ring-inset
				{view === Swatches ? 'bg-surface text-text' : 'bg-muted/10 text-subtle'}"
			>
				{$_('page.palette.button.swatches')}
			</button>

			<button
				on:click={() => (view = Ingredients)}
				class="px-4 py-2 text-sm font-medium focus:outline-none focus:ring focus:ring-inset
				{view === Ingredients ? 'bg-surface text-text' : 'bg-muted/10 text-subtle'}"
			>
				{$_('page.palette.button.ingredients')}
			</button>
		</div>
	</PageHeading>

	<div class="animate-enter" style="--stagger: 2">
		<svelte:component this={view} />
	</div>
</Section>
