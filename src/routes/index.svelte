<script>
	import { _ } from 'svelte-i18n'
	import Section from '$lib/components/section.svelte'
	import Button from '$lib/components/button.svelte'
	import Editor from '$lib/components/editor/index.svelte'
	import { Grain, Seeding, SquaresFilled } from 'tabler-icons-svelte'
	import PageHeading from '$lib/components/page-heading.svelte'
	import themes from '../themes.json'
</script>

<PageHeading
	metaTitle={$_('page.home.nav')}
	metaDescription={$_('page.home.description')}
/>

<Section>
	<div
		class="grid min-h-[calc(100vh-var(--header-height)-(var(--page-top)*3))] items-center gap-12 lg:grid-cols-[1fr,minmax(0,1fr)]"
	>
		<div class="space-y-6 text-center lg:space-y-12 lg:text-left">
			<h2
				class="animate-enter font-display text-5xl lg:text-8xl"
				style="--stagger: 1"
			>
				{@html $_('page.home.title')}
			</h2>

			<p
				class="animate-enter mx-auto max-w-sm text-lg text-subtle lg:mx-0 lg:max-w-md lg:text-xl"
				style="--stagger: 2"
			>
				{$_('page.home.description')}
			</p>

			<div class="animate-enter" style="--stagger: 3">
				<Button href="/themes">
					<span>{$_('page.home.button.primary')}</span>
					<span>&rarr;</span>
				</Button>
			</div>
		</div>

		<!-- TODO: why is overflow-hidden necessary here?  -->
		<div class="animate-enter overflow-hidden" style="--stagger: 2">
			<Editor />
		</div>
	</div>
</Section>

<Section backgroundColor="hsl(var(--color-surface))">
	<ul class="grid grid-cols-1 gap-6 sm:grid-cols-3">
		<li class="space-y-4">
			<div
				class="flex h-14 w-14 items-center justify-center rounded-full bg-iris text-2xl text-surface dark:bg-base dark:text-iris"
			>
				<Seeding size={24} />
			</div>
			<h3 class="font-display text-xl font-bold">
				{$_('page.home.feature_grid.1.heading')}
			</h3>
			<p class="text-subtle sm:max-w-xs">
				{$_('page.home.feature_grid.1.content')}
			</p>
		</li>

		<li class="space-y-4">
			<div
				class="flex h-14 w-14 items-center justify-center rounded-full bg-foam text-2xl text-surface dark:bg-base dark:text-foam"
			>
				<SquaresFilled size={24} />
			</div>
			<h3 class="font-display text-xl font-bold">
				{$_('page.home.feature_grid.2.heading')}
			</h3>
			<p class="text-subtle md:max-w-xs">
				{$_('page.home.feature_grid.2.content')}
			</p>
		</li>

		<li class="space-y-4">
			<div
				class="flex h-14 w-14 items-center justify-center rounded-full bg-gold text-2xl text-surface dark:bg-base dark:text-gold"
			>
				<Grain size={24} />
			</div>
			<h3 class="font-display text-xl font-bold">
				{$_('page.home.feature_grid.3.heading')}
			</h3>
			<p class="text-subtle md:max-w-xs">
				{$_('page.home.feature_grid.3.content', {
					values: { number: Math.floor(themes.length / 10) * 10 },
				})}
			</p>
		</li>
	</ul>
</Section>
