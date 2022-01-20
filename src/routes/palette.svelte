<script>
	import { _ } from 'svelte-i18n'
	import Section from '$lib/components/section.svelte'
	import Transition from '$lib/components/transition.svelte'
	import Swatches from '$lib/components/swatches.svelte'
	import Ingredients from '$lib/components/ingredients.svelte'

	let view = Swatches
</script>

<Section>
	<div
		class="text-center lg:text-left flex flex-col lg:flex-row items-center justify-between"
	>
		<div class="shrink-0">
			<Transition
				active="delay-[100ms] duration-500 transition-[opacity,transform] ease-out"
				from="opacity-0 translate-y-3"
				to="opacity-1 translate-y-0"
			>
				<h2 class="font-display tracking-wide text-4xl">
					{$_('page.palette.title')}
				</h2>
			</Transition>

			<Transition
				active="delay-[200ms] duration-500 transition-[opacity,transform] ease-out"
				from="opacity-0 translate-y-3"
				to="opacity-1 translate-y-0"
			>
				<p class="mt-6 font-medium text-subtle">
					{$_('page.palette.description')}
				</p>
			</Transition>
		</div>

		<Transition
			active="w-full flex items-center justify-center lg:justify-end delay-[200ms] duration-500 transition-[opacity,transform] ease-out"
			from="opacity-0 translate-y-2"
			to="opacity-1 translate-y-0"
		>
			<div
				class="mt-6 bg-surface divide-x divide-highlight-med-blend border border-highlight-med-blend rounded-md inline-flex items-center overflow-hidden"
			>
				<button
					on:click={() => (view = Swatches)}
					class="px-4 py-2 font-medium text-sm focus:outline-none focus:ring focus:ring-inset focus:ring-highlight-high"
					style:color={view === Swatches ? 'var(--text)' : 'var(--subtle)'}
					style:background-color={view === Swatches
						? 'var(--surface)'
						: 'var(--highlight-med)'}
				>
					{$_('page.palette.switch.swatches')}
				</button>

				<button
					on:click={() => (view = Ingredients)}
					class="px-4 py-2 font-medium text-sm focus:outline-none focus:ring focus:ring-inset focus:ring-highlight-high"
					style:color={view === Ingredients ? 'var(--text)' : 'var(--subtle)'}
					style:background-color={view === Ingredients
						? 'var(--surface)'
						: 'var(--highlight-med)'}
				>
					{$_('page.palette.switch.ingredients')}
				</button>
			</div>
		</Transition>
	</div>

	<Transition
		active="delay-100 duration-500 transition-[opacity,transform] ease-out"
		from="opacity-0 translate-y-6"
		to="opacity-1 translate-y-0"
	>
		<svelte:component this={view} />
	</Transition>
</Section>
