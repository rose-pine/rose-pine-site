<script lang="ts">
	import palette from '@rose-pine/palette'
	import { _, locale, locales } from 'svelte-i18n'
	import hasMatch from 'has-match'
	import {
		Dialog,
		DialogOverlay,
		DialogTitle,
		DialogDescription,
	} from '@rgossiaux/svelte-headlessui'
	import {
		BoatIcon,
		BookIcon,
		DotIcon,
		ExternalLinkIcon,
		GithubIcon,
		HomeIcon,
		LanguageIcon,
		PaletteIcon,
		SearchIcon,
		TwitterIcon,
	} from '$lib/components/icons'
	import themes from '$lib/data/themes.json'
	import { setSafeStorage } from '$lib/util'
	import { clipboard, languages, showCommandPalette } from '$lib/store'

	$: setSafeStorage('locale', $locale)

	$: normalizedPages = [
		{ name: $_('page.home.nav'), url: '/', icon: HomeIcon },
		{ name: $_('page.themes.nav'), url: '/themes', icon: BoatIcon },
		{ name: $_('page.palette.nav'), url: '/palette', icon: PaletteIcon },
		{
			name: 'GitHub',
			url: 'https://github.com/rose-pine',
			icon: GithubIcon,
		},
		{
			name: 'Twitter',
			url: 'https://twitter.com/rosepinetheme',
			icon: TwitterIcon,
		},
	]

	const normalizedThemes = themes.map(({ name, shortname, repo }) => ({
		name,
		shortname,
		url: repo,
		icon: BookIcon,
	}))

	const normalizedPalette = Object.keys(palette.variants).flatMap((variant) =>
		Object.keys(palette.roles).flatMap((role) => {
			const color = palette.variants[variant][role]

			let formattedRole = role
			if (role === 'highlightLow') formattedRole = 'highlight low'
			else if (role === 'highlightMed') formattedRole = 'highlight med'
			else if (role === 'highlightHigh') formattedRole = 'highlight high'

			return {
				name: `${variant}/${formattedRole}`,
				hint: `Copy ${variant}/${formattedRole}`,
				action: () => clipboard.copy(color.hex),
				icon: DotIcon,
				iconColor: color.hex,
			}
		})
	)

	const normalizedLocales = $locales.flatMap((lang) => ({
		name: $languages[lang],
		hint: `Change language to ${$languages[lang]}`,
		action: () => locale.set(lang),
		icon: LanguageIcon,
	}))

	interface Group {
		name: string
		items: {
			name: string
			shortname?: string
			hint?: string
			icon: any
			iconColor?: string
			href?: string
			repo?: string
			action?: () => void
		}[]
	}

	let groups: Group[] = []
	$: groups = [
		{
			name: 'Pages',
			items: normalizedPages,
		},
		{
			name: 'Themes',
			items: normalizedThemes,
		},
		{
			name: 'Palette',
			items: normalizedPalette,
		},
		{
			name: 'Locale',
			items: normalizedLocales,
		},
	]

	let search = ''
	$: placeholder = 'Search...'
	let hasResult = false
	$: if (search.length) hasResult = false
	$: filteredGroups = groups.map((group) => {
		let workingGroup = { ...group }
		workingGroup.items = workingGroup.items.filter((item) =>
			hasMatch(item, search, ['name', 'shortname'])
		)
		if (workingGroup.items.length) hasResult = true
		return workingGroup.items.length ? workingGroup : []
	})

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			$showCommandPalette = false
			return
		}
		if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
			$showCommandPalette = !$showCommandPalette
			return
		}
	}
</script>

<svelte:window on:keydown={handleKeydown} />

<Dialog
	open={$showCommandPalette}
	on:close={() => ($showCommandPalette = false)}
>
	<DialogOverlay class="fixed inset-0 bg-zinc-900/50" />

	<div
		class="fixed top-14 left-1/2 z-20 w-full max-w-md -translate-x-1/2 px-4 sm:top-20"
	>
		<div class="relative mx-auto overflow-hidden rounded-2xl border bg-surface">
			<DialogTitle class="sr-only">Search</DialogTitle>
			<DialogDescription class="sr-only">
				Search Rosé Pine pages, themes and palette
			</DialogDescription>

			<div class="fixed inset-x-4 top-0 rounded-t-2xl border bg-surface">
				<div
					class="flex h-14 w-full items-center space-x-2 overflow-hidden rounded-t-2xl"
				>
					<label for="search" class="pl-4">
						<span class="sr-only">Search</span>
						<SearchIcon color="var(--subtle)" size={18} />
					</label>

					<input
						type="text"
						id="search"
						{placeholder}
						bind:value={search}
						class="h-14 w-full bg-transparent pr-3 text-sm font-medium text-text placeholder-muted selection:bg-highlight-high focus:outline-none"
					/>
				</div>
			</div>

			<ul class="mt-14 max-h-[44vh] overflow-y-scroll py-2">
				{#if !hasResult}
					<li class="px-2">
						<span class="list-item text-subtle">No results found</span>
					</li>
				{/if}
				{#each filteredGroups as group}
					{#if group.name}
						<h3
							class="flex items-center px-4 pt-4 pb-2 text-xs font-semibold text-subtle"
						>
							{group.name}
						</h3>

						{#each group.items as item, i}
							{#if i < 10}
								<li class="px-2">
									{#if item.url}
										<a
											href={item.url}
											on:focus={() =>
												(placeholder = item.hint || `Goto ${item.name}`)}
											on:mouseover={() =>
												(placeholder = item.hint || `Goto ${item.name}`)}
											class="list-item"
											target={item.url.includes('http') ? '_blank' : ''}
										>
											<div class="shrink-0 text-subtle">
												{#if item.icon}
													<svelte:component
														this={item.icon}
														size={18}
														color={item.iconColor ? item.iconColor : null}
													/>
												{/if}
											</div>
											<span class="shrink-0">{item.name}</span>
											{#if item.url.includes('http')}
												<div class="flex w-full text-muted">
													<div class="flex-1" />
													<ExternalLinkIcon size={15} />
												</div>
											{/if}
										</a>
									{:else if item.action}
										<button
											on:click={item.action}
											on:focus={() =>
												(placeholder = item.hint || `Goto ${item.name}`)}
											on:mouseover={() =>
												(placeholder = item.hint || `Goto ${item.name}`)}
											class="list-item"
										>
											<div class="text-subtle">
												{#if item.icon}
													<svelte:component
														this={item.icon}
														size={18}
														color={item.iconColor ? item.iconColor : null}
													/>
												{/if}
											</div>
											<span>{item.name}</span>
										</button>
									{/if}
								</li>
							{/if}
						{/each}
					{/if}
				{/each}
			</ul>
		</div>
	</div>
</Dialog>

<style lang="postcss">
	.list-item {
		@apply flex w-full items-center space-x-2 rounded border-2 border-transparent px-2 py-3 text-sm font-medium;
	}
	.list-item:hover {
		@apply bg-highlight-low;
	}
	.list-item:focus {
		@apply border-highlight-high outline-none;
	}
</style>
