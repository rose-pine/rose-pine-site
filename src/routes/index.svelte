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
		class="grid min-h-[calc(100vh-14rem)] items-center gap-12 lg:grid-cols-[1fr,minmax(0,1fr)]"
	>
		<div class="space-y-6 text-center lg:space-y-12 lg:text-left">
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
					class="mx-auto max-w-sm text-lg text-subtle lg:mx-0 lg:max-w-md lg:text-xl"
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
					class="rounded-full bg-highlight-med px-6 py-2.5 font-medium transition-colors duration-150 hover:bg-highlight-high focus:outline-none focus:ring focus:ring-highlight-high"
					>{$_('page.home.primary-action')} <span class="ml-1">→</span></a
				>
			</Transition>
		</div>

		<Editor />
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
				{$_('page.home.section.feature.subtle.heading')}
			</h3>
			<p class="text-subtle sm:max-w-xs">
				{$_('page.home.section.feature.subtle.content')}
			</p>
		</li>

		<li class="space-y-4">
			<div
				class="flex h-14 w-14 items-center justify-center rounded-full bg-foam text-2xl text-surface dark:bg-base dark:text-foam"
			>
				<SquaresFilledIcon size={24} />
			</div>
			<h3 class="font-display text-xl font-bold">
				{$_('page.home.section.feature.adaptive.heading')}
			</h3>
			<p class="text-subtle md:max-w-xs">
				{$_('page.home.section.feature.adaptive.content')}
			</p>
		</li>

		<li class="space-y-4">
			<div
				class="flex h-14 w-14 items-center justify-center rounded-full bg-gold text-2xl text-surface dark:bg-base dark:text-gold"
			>
				<GrainIcon size={24} />
			</div>
			<h3 class="font-display text-xl font-bold">
				{$_('page.home.section.feature.community.heading')}
			</h3>
			<p class="text-subtle md:max-w-xs">
				{$_('page.home.section.feature.community.content', {
					values: { number: Math.floor(themes.length / 10) * 10 },
				})}
			</p>
		</li>
	</ul>
</Section>
