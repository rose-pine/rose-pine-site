<script>
	import { _ } from 'svelte-i18n'
	import hasMatch from 'has-match'
	import { Notebook, Sun, Moon, Palette } from 'tabler-icons-svelte'
	import Section from '$lib/components/section.svelte'
	import Search from '$lib/components/search.svelte'
	import PageHeading from '$lib/components/page-heading.svelte'
	import themes from '../themes.json'

	let query = ''
	$: filteredThemes = themes.filter((theme) =>
		hasMatch(theme, query, ['name', 'shortname', 'keywords'])
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
	<PageHeading
		title={$_('page.themes.title')}
		description={$_('page.themes.description')}
		items={[
			{
				icon: Palette,
				iconColor: 'var(--rose)',
				text: $_('page.themes.stat.ports', {
					values: { number: themes.length },
				}),
				gradient: 'from-rose to-iris',
			},
			{
				icon: Notebook,
				iconColor: 'var(--iris)',
				text: $_('page.themes.stat.maintainers', {
					values: { number: maintainers.length },
				}),
				gradient: 'from-iris to-foam',
			},
		]}
	>
		<svelte:fragment slot="item" let:item>
			<svelte:component this={item.icon} color={item.iconColor} size={16} />
			<span
				class="bg-gradient-to-r {item.gradient} bg-clip-text text-sm font-medium text-transparent"
			>
				{item.text}
			</span>
		</svelte:fragment>

		<Search
			bind:query
			label={$_('page.themes.search.label')}
			placeholder={$_('page.themes.search.placeholder', {
				values: { number: themes.length, key: '/' },
			})}
		/>
	</PageHeading>

	<ul
		class="animate-enter mx-auto grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-6 md:grid-cols-4 lg:grid-cols-4"
		style="--stagger: 2"
	>
		{#if filteredThemes.length < 1}
			<li
				class="col-span-full mx-auto flex h-full w-full max-w-lg flex-col items-center rounded-2xl bg-gradient-to-br from-surface via-base to-surface bg-[length:200%_200%] bg-left-top py-8 shadow transition-all duration-200 ease-in-out dark:from-overlay dark:to-base dark:shadow-none sm:py-12"
			>
				<p class="font-display">{$_('page.themes.search.empty')}</p>
				<a
					rel="external"
					target="_blank"
					href="https://github.com/rose-pine/.github/blob/main/contributing.md"
					class="mt-4 text-sm text-rose underline underline-offset-2"
				>
					{$_('page.themes.search.empty_prompt')}
				</a>
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
							{theme.name}
						</p>

						<div class="flex-1" />

						<div class="mt-4 space-x-3 flex items-center">
							<div class="w-5 h-5 flex items-center justify-center">
								<Moon color="var(--subtle)" size={16} />
							</div>

							{#if theme.variants}
								<div class="w-5 h-5 flex items-center justify-center">
									<Sun color="var(--gold)" size={20} />
								</div>
							{/if}
						</div>
					</a>
				</li>
			{/each}
		{/if}
	</ul>
</Section>
