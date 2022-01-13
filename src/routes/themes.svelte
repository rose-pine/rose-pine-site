<script>
	import Section from '$lib/components/section.svelte'
	import Transition from '$lib/components/transition.svelte'
	import {
		BookIcon,
		MoonIcon,
		SunIcon,
		PaletteIcon,
	} from '$lib/components/icons'
	import themes from '$lib/data/themes.json'

	const maintainers = [
		...new Set(
			themes
				.flatMap((theme) => theme.maintainers)
				.flatMap((maintainer) => maintainer.name)
		),
	]
</script>

<Section>
	<div
		class="text-center lg:text-left flex flex-col lg:flex-row items-center justify-between"
	>
		<div>
			<Transition
				active="delay-[100ms] duration-500 transition-[opacity,transform] ease-out"
				from="opacity-0 translate-y-3"
				to="opacity-1 translate-y-0"
			>
				<h2 class="font-display tracking-wide text-4xl">Themes</h2>
			</Transition>

			<Transition
				active="delay-[200ms] duration-500 transition-[opacity,transform] ease-out"
				from="opacity-0 translate-y-3"
				to="opacity-1 translate-y-0"
			>
				<p class="mt-6 font-medium text-subtle">
					Hand-crafted collection of soho vibes
				</p>
			</Transition>

			<ul
				class="mt-2 space-x-3 select-none cursor-default flex items-center justify-center lg:justify-start"
			>
				<Transition
					active="delay-[300ms] duration-500 transition-[opacity,transform] ease-out"
					from="opacity-0 translate-y-2"
					to="opacity-1 translate-y-0"
				>
					<li class="space-x-1 flex items-center">
						<PaletteIcon class="text-rose w-4 h-4" />
						<span
							class="text-sm font-medium bg-clip-text text-transparent bg-gradient-to-r from-rose to-iris"
							>{themes.length} Ports</span
						>
					</li>
				</Transition>

				<Transition
					active="delay-[350ms] duration-500 transition-[opacity,transform] ease-out"
					from="opacity-0 translate-y-2"
					to="opacity-1 translate-y-0"
				>
					<li class="space-x-1 flex items-center">
						<BookIcon class="text-iris w-4 h-4" />
						<span
							class="text-sm font-medium bg-clip-text text-transparent bg-gradient-to-r from-iris to-foam"
							>{maintainers.length} Maintainers</span
						>
					</li>
				</Transition>
			</ul>
		</div>
	</div>

	<ul
		class="mt-12 mx-auto gap-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4"
	>
		{#each themes as theme}
			<Transition
				active="delay-100 duration-500 transition-[opacity,transform] ease-out"
				from="opacity-0 translate-y-6"
				to="opacity-1 translate-y-0"
			>
				<li>
					<a
						href={theme.repo}
						class="py-12 h-full bg-gradient-to-br from-surface dark:from-overlay via-base to-surface dark:to-base bg-[length:200%_200%] bg-left-top hover:bg-right-bottom shadow dark:shadow-none duration-200 transition-[background-position,box-shadow] ease-in-out rounded-2xl flex flex-col items-center focus:outline-none focus:ring focus:ring-highlight-high"
					>
						<p
							class="font-display font-semibold text-lg text-center tracking-wide"
						>
							{theme.shortname || theme.name}
						</p>

						<div class="mt-4 space-x-3 flex items-center">
							<MoonIcon class="w-4 h-4 text-subtle" />

							{#if theme.variants}
								<SunIcon class="w-5 h-5 text-gold" />
							{/if}
						</div>
					</a>
				</li>
			</Transition>
		{/each}
	</ul>
</Section>
