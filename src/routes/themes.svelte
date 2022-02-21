<script>
	import { _ } from 'svelte-i18n'
	import hasMatch from 'has-match'
	import Section from '$lib/components/section.svelte'
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
		class="flex flex-col items-center justify-between text-center lg:flex-row lg:text-left"
	>
		<div class="shrink-0">
			<h2 class="animate-enter font-display text-4xl tracking-wide">
				{$_('page.themes.title')}
			</h2>

			<p
				class="animate-enter mt-6 font-medium text-subtle"
				style="--stagger: 1"
			>
				{$_('page.themes.description')}
			</p>

			<ul
				class="mt-2 flex cursor-default select-none items-center justify-center space-x-3 lg:justify-start"
			>
				<li
					class="animate-enter flex items-center space-x-1"
					style="--stagger: 2"
				>
					<PaletteIcon color="var(--rose)" size={16} />
					<span
						class="bg-gradient-to-r from-rose to-iris bg-clip-text text-sm font-medium text-transparent"
					>
						{$_('page.themes.stat.ports', {
							values: { number: themes.length },
						})}
					</span>
				</li>

				<li
					class="animate-enter flex items-center space-x-1"
					style="--stagger: 2.25"
				>
					<BookIcon color="var(--iris)" size={16} />
					<span
						class="bg-gradient-to-r from-iris to-foam bg-clip-text text-sm font-medium text-transparent"
					>
						{$_('page.themes.stat.maintainers', {
							values: { number: maintainers.length },
						})}
					</span>
				</li>
			</ul>
		</div>

		<div
			class="animate-enter flex w-full items-center justify-center lg:justify-end"
			style="--stagger: 1"
		>
			<Search
				bind:search
				label={$_('page.themes.search.label')}
				placeholder={$_('page.themes.search.placeholder', {
					values: { number: themes.length },
				})}
			/>
		</div>
	</div>

	<ul
		class="animate-enter mx-auto mt-12 grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-6 md:grid-cols-4 lg:grid-cols-4"
		style="--stagger: 2"
	>
		{#if filteredThemes.length < 1}
			<li
				class="col-span-full mx-auto flex h-full w-full max-w-lg flex-col items-center rounded-2xl bg-gradient-to-br from-surface via-base to-surface bg-[length:200%_200%] bg-left-top py-8 shadow transition-all duration-200 ease-in-out dark:from-overlay dark:to-base dark:shadow-none sm:py-12"
			>
				<p class="font-display">{$_('page.themes.no-result.heading')}</p>
				<p class="mt-4 text-sm font-medium">
					<a
						rel="external"
						target="_blank"
						href="https://github.com/rose-pine/.github/blob/main/contributing.md"
						class="rounded text-iris underline decoration-subtle decoration-wavy underline-offset-4 focus:outline-none focus:ring focus:ring-highlight-high"
						>{$_('page.themes.no-result.content-prefix')}</a
					>
					{$_('page.themes.no-result.content')}
				</p>
			</li>
		{:else}
			{#each filteredThemes as theme}
				<li class="h-full">
					<a
						rel="external"
						target="_blank"
						href={theme.repo}
						class="px-1 py-8 sm:py-12 h-full bg-gradient-to-br from-surface dark:from-overlay via-base to-surface dark:to-base bg-[length:200%_200%] bg-left-top hover:bg-right-bottom shadow dark:shadow-none duration-200 transition-[background-position,box-shadow] ease-in-out rounded-2xl flex flex-col items-center focus:outline-none focus:ring focus:ring-highlight-high"
					>
						<p
							class="font-display font-semibold text-md sm:text-lg text-center tracking-wide"
						>
							{theme.shortname || theme.name}
						</p>

						<div class="flex-1" />

						<div class="mt-4 space-x-3 flex items-center">
							<div class="w-5 h-5 flex items-center justify-center">
								<MoonIcon color="var(--subtle)" size={16} />
							</div>

							{#if theme.variants}
								<div class="w-5 h-5 flex items-center justify-center">
									<SunIcon color="var(--gold)" size={20} />
								</div>
							{/if}
						</div>
					</a>
				</li>
			{/each}
		{/if}
	</ul>
</Section>
