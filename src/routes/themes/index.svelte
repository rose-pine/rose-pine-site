<script>
	import { _ } from 'svelte-i18n'
	import hasMatch from 'has-match'
	import {
		NotebookIcon,
		SunIcon,
		MoonIcon,
		PaletteIcon,
	} from '$lib/components/icons'
	import Section from '$lib/components/section.svelte'
	import Search from '$lib/components/search.svelte'
	import PageHeading from '$lib/components/page-heading.svelte'
	import themes from '../../themes.json'

	let query = ''
	$: filteredThemes = themes.filter((theme) =>
		hasMatch(theme, query, ['name', 'shortname', 'keywords'])
	)

	const maintainers = [
		...new Set(
			themes.flatMap((theme) => theme.authors).flatMap((author) => author.name)
		),
	]
</script>

<Section>
	<PageHeading
		title={$_('page.themes.title')}
		description={$_('page.themes.description')}
		items={[
			{
				icon: PaletteIcon,
				iconColor: 'hsl(var(--color-rose))',
				text: $_('page.themes.stat.ports', {
					values: { number: themes.length },
				}),
				gradient: 'from-rose to-iris',
			},
			{
				icon: NotebookIcon,
				iconColor: 'hsl(var(--color-iris))',
				text: $_('page.themes.stat.maintainers', {
					values: { number: maintainers.length },
				}),
				gradient: 'from-iris to-foam',
			},
		]}
	>
		<svelte:fragment slot="item" let:item>
			<span style:color={item.iconColor}
				><svelte:component this={item.icon} size={16} /></span
			>
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
				class="col-span-full mx-auto flex h-full w-full max-w-lg flex-col items-center rounded-2xl bg-gradient-to-br from-surface via-base to-surface bg-[length:200%_200%] bg-left-top py-8 shadow transition-all dark:from-overlay dark:to-base dark:shadow-none sm:py-12"
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
						class="flex h-full flex-col items-center rounded-2xl bg-gradient-to-br from-surface via-base to-surface bg-[length:200%_200%] bg-left-top px-1 py-8 shadow transition-[background-position,box-shadow] hover:bg-right-bottom focus:outline-none focus:ring dark:from-overlay dark:to-base dark:shadow-none sm:py-12"
					>
						<p
							class="text-center font-display font-semibold tracking-wide sm:text-lg"
						>
							{theme.name}
						</p>

						<div class="flex-1" />

						<div class="mt-4 flex items-center space-x-3">
							<div class="flex h-5 w-5 items-center justify-center text-subtle">
								<MoonIcon size={18} />
							</div>

							{#if theme.has_variants}
								<div class="flex h-5 w-5 items-center justify-center text-gold">
									<SunIcon size={20} />
								</div>
							{/if}
						</div>
					</a>
				</li>
			{/each}
		{/if}
	</ul>
</Section>
