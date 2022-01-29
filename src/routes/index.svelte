<script>
	import { _ } from 'svelte-i18n'
	import Section from '$lib/components/section.svelte'
	import Transition from '$lib/components/transition.svelte'
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
		class="min-h-[calc(100vh-14rem)] grid lg:grid-cols-[1fr,minmax(0,1fr)] gap-12 items-center"
	>
		<div class="space-y-6 lg:space-y-12 text-center lg:text-left">
			<Transition
				active="delay-[200ms] duration-500 transition-[opacity,transform] ease-out"
				from="opacity-0 translate-y-3"
				to="opacity-1 translate-y-0"
			>
				<h2 class="font-display text-5xl lg:text-8xl">
					{@html $_('page.home.title')}
				</h2>
			</Transition>

			<Transition
				active="delay-[400ms] duration-500 transition-[opacity,transform] ease-out"
				from="opacity-0 translate-y-3"
				to="opacity-1 translate-y-0"
			>
				<p
					class="mx-auto lg:mx-0 max-w-sm lg:max-w-md text-lg lg:text-xl text-subtle"
				>
					{$_('page.home.description')}
				</p>
			</Transition>

			<Transition
				active="delay-[600ms] duration-500 transition-[opacity,transform] ease-out"
				from="opacity-0 translate-y-3"
				to="opacity-1 translate-y-0"
			>
				<a
					href="/themes"
					class="px-6 py-2.5 font-medium bg-highlight-med hover:bg-highlight-high rounded-full transition-colors duration-150 focus:outline-none focus:ring focus:ring-highlight-high"
					>{$_('page.home.primary-action')} <span class="ml-1">→</span></a
				>
			</Transition>
		</div>

		<Editor />
	</div>
</Section>

<Section backgroundColor="var(--surface)">
	<ul class="grid grid-cols-1 sm:grid-cols-3 gap-6">
		<li class="space-y-4">
			<div
				class="w-14 h-14 text-2xl text-surface dark:text-iris bg-iris dark:bg-base rounded-full flex items-center justify-center"
			>
				<SeedingIcon size={24} />
			</div>
			<h3 class="font-display font-bold text-xl">
				{$_('page.home.section.feature.subtle.heading')}
			</h3>
			<p class="sm:max-w-xs text-subtle">
				{$_('page.home.section.feature.subtle.content')}
			</p>
		</li>

		<li class="space-y-4">
			<div
				class="w-14 h-14 text-2xl text-surface dark:text-foam bg-foam dark:bg-base rounded-full flex items-center justify-center"
			>
				<SquaresFilledIcon size={24} />
			</div>
			<h3 class="font-display font-bold text-xl">
				{$_('page.home.section.feature.adaptive.heading')}
			</h3>
			<p class="md:max-w-xs text-subtle">
				{$_('page.home.section.feature.adaptive.content')}
			</p>
		</li>

		<li class="space-y-4">
			<div
				class="w-14 h-14 text-2xl text-surface dark:text-gold bg-gold dark:bg-base rounded-full flex items-center justify-center"
			>
				<GrainIcon size={24} />
			</div>
			<h3 class="font-display font-bold text-xl">
				{$_('page.home.section.feature.community.heading')}
			</h3>
			<p class="md:max-w-xs text-subtle">
				{$_('page.home.section.feature.community.content', {
					values: { number: Math.floor(themes.length / 10) * 10 },
				})}
			</p>
		</li>
	</ul>
</Section>
