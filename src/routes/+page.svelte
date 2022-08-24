<script>
	import { _ } from 'svelte-i18n'
	import Section from '$lib/components/section.svelte'
	import Editor from '$lib/components/editor/index.svelte'
	import {
		GrainIcon,
		SeedingIcon,
		SquaresFilledIcon,
	} from '$lib/components/icons'
	import PageHeading from '$lib/components/page-heading.svelte'
	import Card from '$lib/components/card.svelte'
	import themes from '../themes.json'
</script>

<PageHeading
	metaTitle="Rosé Pine"
	metaDescription={$_('page.home.description')}
/>

<Section>
	<div
		class="grid min-h-[calc(100vh-var(--header-height)-(var(--page-top)*2))] items-center gap-12 lg:grid-cols-[1fr,minmax(0,1fr)]"
	>
		<div class="space-y-6 text-center lg:space-y-12 lg:text-left">
			<h2
				class="animate-enter font-display text-5xl tracking-tight lg:text-8xl"
				style="--stagger: 1"
			>
				{@html $_('page.home.title', { default: 'Something beautiful' })}
			</h2>

			<p
				class="animate-enter mx-auto max-w-sm text-lg text-subtle lg:mx-0 lg:max-w-md lg:text-xl"
				style="--stagger: 2"
			>
				{$_('page.home.description', {
					default:
						'All natural pine, faux fur and a bit of soho vibes for the classy minimalist.',
				})}
			</p>

			<div class="animate-enter" style="--stagger: 3">
				<a
					href="/themes"
					class="inline-flex h-10 items-center space-x-2.5 rounded-full bg-muted/20 px-5 font-medium tracking-wide transition hover:bg-muted/30 focus:outline-none focus:ring"
				>
					<span>{$_('page.home.primary_action', { default: 'Discover' })}</span>
					<span>&rarr;</span>
				</a>
			</div>
		</div>

		<!-- TODO: why is overflow-hidden necessary here?  -->
		<div class="animate-enter overflow-hidden" style="--stagger: 2">
			<Editor />
		</div>
	</div>
</Section>

<Section paddingTop={false}>
	<div class="grid grid-cols-1 gap-5 md:grid-cols-3">
		<Card class="space-y-5">
			<div
				class="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-foam to-pine text-2xl text-surface dark:to-rose"
			>
				<SeedingIcon size={24} />
			</div>

			<div class="flex-1 space-y-1.5">
				<h2 class="font-display text-xl font-bold">
					{$_('page.home.feature_1.heading')}
				</h2>

				<p class="text-subtle sm:max-w-xs">
					{$_('page.home.feature_1.content')}
				</p>
			</div>

			<div>
				<a
					href="/palette"
					class="rounded font-medium tracking-wide text-foam underline underline-offset-2 transition hover:no-underline focus:outline-none focus:ring"
					>{$_('page.home.feature_1.action', {
						default: 'Our palette',
					})}</a
				>
			</div>
		</Card>

		<Card class="space-y-5">
			<div
				class="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-iris to-love text-2xl text-surface dark:to-rose"
			>
				<SquaresFilledIcon size={24} />
			</div>

			<div class="flex-1 space-y-1.5">
				<h2 class="font-display text-xl font-bold">
					{$_('page.home.feature_2.heading')}
				</h2>

				<p class="text-subtle md:max-w-xs">
					{$_('page.home.feature_2.content')}
				</p>
			</div>

			<div>
				<a
					href="/themes"
					class="rounded font-medium tracking-wide text-iris underline underline-offset-2 transition hover:no-underline focus:outline-none focus:ring"
					>{$_('page.home.feature_2.action', {
						default: 'Browse themes',
					})}</a
				>
			</div>
		</Card>

		<Card class="space-y-5">
			<div
				class="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-gold to-rose text-2xl text-surface dark:to-rose"
			>
				<GrainIcon size={24} />
			</div>

			<div class="flex-1 space-y-1.5">
				<h2 class="font-display text-xl font-bold">
					{$_('page.home.feature_3.heading')}
				</h2>

				<p class="text-subtle md:max-w-xs">
					{$_('page.home.feature_3.content', {
						values: { number: Math.floor(themes.length / 10) * 10 },
					})}
				</p>
			</div>

			<div>
				<a
					href="/docs"
					class="rounded font-medium tracking-wide text-gold underline underline-offset-2 transition hover:no-underline focus:outline-none focus:ring"
					>{$_('page.home.feature_3.action', { default: 'Get involved' })}</a
				>
			</div>
		</Card>
	</div>
</Section>
