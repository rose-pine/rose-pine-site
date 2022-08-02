<script>
	import { page } from '$app/stores'
	import { _ } from 'svelte-i18n'
	import Section from '$lib/components/section.svelte'
	import PageHeading from '$lib/components/page-heading.svelte'
</script>

<Section>
	<PageHeading
		title={$_('page.palette.title')}
		description={$_('page.palette.description')}
	>
		<div
			class="inline-flex items-center divide-x overflow-hidden rounded-md border bg-surface"
		>
			<a
				href="/palette"
				class="px-4 py-2 text-sm font-medium focus:outline-none focus:ring focus:ring-inset
				{$page.url.pathname === '/palette'
					? 'bg-surface text-text'
					: 'bg-muted/10 text-subtle'}"
			>
				{$_('page.palette.button.swatches')}
			</a>

			<a
				href="/palette/ingredients"
				class="px-4 py-2 text-sm font-medium focus:outline-none focus:ring focus:ring-inset
				{$page.url.pathname === '/palette/ingredients'
					? 'bg-surface text-text'
					: 'bg-muted/10 text-subtle'}"
			>
				{$_('page.palette.button.ingredients')}
			</a>
		</div>
	</PageHeading>

	<div class="animate-enter" style="--stagger: 2">
		<slot />
	</div>
</Section>
