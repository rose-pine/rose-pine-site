<script>
	import { _ } from 'svelte-i18n'
	import Section from '$lib/components/section.svelte'
	import Editor from '$lib/components/editor/index.svelte'
	import {
		GrainIcon,
		SeedingIcon,
		SquaresFilledIcon,
	} from '$lib/components/icons'
	import themes from '$lib/data/themes.json'
</script>

<Section>
	<div
		class="grid min-h-[calc(100vh-14rem)] items-center gap-12 lg:grid-cols-[1fr,minmax(0,1fr)]"
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
				<a
					href="/themes"
					class="rounded-full bg-highlight-med px-6 py-2.5 font-medium transition-colors duration-150 hover:bg-highlight-high focus:outline-none focus:ring focus:ring-highlight-high"
				>
					{$_('page.home.button.primary')} <span class="ml-1">→</span>
				</a>
			</div>
		</div>

		<!-- TODO: why is overflow-hidden necessary here?  -->
		<div class="animate-enter overflow-hidden" style="--stagger: 2">
			<Editor />
		</div>
	</div>
</Section>

<Section backgroundColor="var(--surface)">
	<ul class="grid grid-cols-1 gap-6 sm:grid-cols-3">
		<li class="space-y-4">
			<div
				class="flex h-14 w-14 items-center justify-center rounded-full bg-iris text-2xl text-surface dark:bg-base dark:text-iris"
			>
				<SeedingIcon size={24} />
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
				<SquaresFilledIcon size={24} />
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
				<GrainIcon size={24} />
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
