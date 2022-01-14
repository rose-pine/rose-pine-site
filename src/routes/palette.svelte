<script>
	import { _ } from 'svelte-i18n'
	import Section from '$lib/components/section.svelte'
	import Transition from '$lib/components/transition.svelte'
</script>

<Section>
	<div class="text-center lg:text-left flex flex-col">
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
</Section>
