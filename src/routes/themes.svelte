<script>
	import { _ } from 'svelte-i18n'
	import hasMatch from 'has-match'
	import Section from '$lib/components/section.svelte'
	import Transition from '$lib/components/transition.svelte'
	import Search from '$lib/components/search.svelte'
	import {
		BookIcon,
		MoonIcon,
		SunIcon,
		PaletteIcon,
	} from '$lib/components/icons'
	import themes from '$lib/data/themes.json'

	let search = ''
	$: filteredThemes = themes.filter((theme) =>
		hasMatch(theme, search, ['name', 'shortname', 'keywords'])
	)

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
		<div class="shrink-0">
			<Transition
				active="delay-[100ms] duration-500 transition-[opacity,transform] ease-out"
				from="opacity-0 translate-y-3"
				to="opacity-1 translate-y-0"
			>
				<h2 class="font-display tracking-wide text-4xl">
					{$_('page.themes.title')}
				</h2>
			</Transition>

			<Transition
				active="delay-[200ms] duration-500 transition-[opacity,transform] ease-out"
				from="opacity-0 translate-y-3"
				to="opacity-1 translate-y-0"
			>
				<p class="mt-6 font-medium text-subtle">
					{$_('page.themes.description')}
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
						<PaletteIcon color="var(--rose)" size={16} />
						<span
							class="text-sm font-medium bg-clip-text text-transparent bg-gradient-to-r from-rose to-iris"
						>
							{$_('page.themes.stat.ports', {
								values: { number: themes.length },
							})}
						</span>
					</li>
				</Transition>

				<Transition
					active="delay-[350ms] duration-500 transition-[opacity,transform] ease-out"
					from="opacity-0 translate-y-2"
					to="opacity-1 translate-y-0"
				>
					<li class="space-x-1 flex items-center">
						<BookIcon color="var(--iris)" size={16} />
						<span
							class="text-sm font-medium bg-clip-text text-transparent bg-gradient-to-r from-iris to-foam"
						>
							{$_('page.themes.stat.maintainers', {
								values: { number: maintainers.length },
							})}
						</span>
					</li>
				</Transition>
			</ul>
		</div>

		<Transition
			active="w-full flex items-center justify-center lg:justify-end delay-[200ms] duration-500 transition-[opacity,transform] ease-out"
			from="opacity-0 translate-y-2"
			to="opacity-1 translate-y-0"
		>
			<Search
				bind:search
				label={$_('page.themes.search.label')}
				placeholder={$_('page.themes.search.placeholder', {
					values: { number: themes.length },
				})}
			/>
		</Transition>
	</div>

	<ul
		class="mt-12 mx-auto gap-2 sm:gap-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4"
	>
		{#if filteredThemes.length < 1}
			<li
				class="mx-auto py-8 sm:py-12 w-full max-w-lg h-full col-span-full bg-gradient-to-br from-surface dark:from-overlay via-base to-surface dark:to-base bg-[length:200%_200%] bg-left-top hover:bg-right-bottom shadow dark:shadow-none duration-200 transition-all ease-in-out rounded-2xl flex flex-col items-center"
			>
				<p class="font-display">{$_('page.themes.no-result.heading')}</p>
				<p class="mt-4 text-sm font-medium">
					<a
						href="#!"
						class="text-iris underline underline-offset-4 decoration-wavy decoration-subtle rounded focus:outline-none focus:ring focus:ring-highlight-high"
						>{$_('page.themes.no-result.content-prefix')}</a
					>
					{$_('page.themes.no-result.content')}
				</p>
			</li>
		{:else}
			{#each filteredThemes as theme}
				<Transition
					active="delay-100 duration-500 transition-[opacity,transform] ease-out"
					from="opacity-0 translate-y-6"
					to="opacity-1 translate-y-0"
				>
					<li class="h-full">
						<a
							href={theme.repo}
							class="px-1 py-8 sm:py-12 h-full bg-gradient-to-br from-surface dark:from-overlay via-base to-surface dark:to-base bg-[length:200%_200%] bg-left-top hover:bg-right-bottom shadow dark:shadow-none duration-200 transition-[background-position,box-shadow] ease-in-out rounded-2xl flex flex-col items-center focus:outline-none focus:ring focus:ring-highlight-high"
						>
							<p
								class="font-display font-semibold text-md sm:text-lg text-center tracking-wide"
							>
								{theme.shortname || theme.name}
							</p>

							<div class="mt-4 space-x-3 flex items-center">
								<MoonIcon color="var(--subtle)" size={16} />

								{#if theme.variants}
									<SunIcon color="var(--gold)" size={20} />
								{/if}
							</div>
						</a>
					</li>
				</Transition>
			{/each}
		{/if}
	</ul>
</Section>
