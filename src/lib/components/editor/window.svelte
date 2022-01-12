<script>
	import Transition from '$lib/components/transition.svelte'
</script>

<Transition
	active="mx-auto w-full max-w-lg lg:max-w-xl h-80 lg:h-96 border border-highlight-med bg-base rounded-2xl self-center relative overflow-hidden delay-[400ms] duration-500 transition-[opacity,transform,box-shadow]"
	from="opacity-0 translate-y-3 shadow-none"
	to="opacity-1 translate-y-0 shadow-lg dark:shadow-none"
>
	<div class="px-6 h-14 flex items-center">
		<div class="space-x-2 flex items-center">
			<div class="w-3.5 h-3.5 bg-highlight-high rounded-full" />
			<div class="w-3.5 h-3.5 bg-highlight-high rounded-full" />
			<div class="w-3.5 h-3.5 bg-highlight-high rounded-full" />
		</div>
	</div>

	<div>
		<slot />
	</div>

	<div
		class="px-6 h-8 w-full bg-surface rounded-b-2xl flex items-center absolute bottom-0"
	>
		<div class="w-full font-mono text-xs text-subtle flex items-center">
			<svg viewBox="0 0 15 15" fill="none" class="mr-1.5 w-2.5 h-2.5">
				<path
					d="M2.5 4.5a2 2 0 110-4 2 2 0 010 4zm0 0v6m2 2a2 2 0 11-2-2m2 2a2 2 0 00-2-2m2 2h5a3 3 0 003-3v-2m0 0a2 2 0 110-4 2 2 0 010 4z"
					stroke="currentColor"
				/>
			</svg>
			<span>main</span>
		</div>
	</div>
</Transition>
