<script lang="ts">
	import { _ } from 'svelte-i18n'
	import hasMatch from 'has-match'
	import palette from '@rose-pine/palette'
	import {
		Dialog,
		DialogOverlay,
		DialogTitle,
		DialogDescription,
	} from '@rgossiaux/svelte-headlessui'
	import { goto } from '$app/navigation'
	import {
		ChevronRightIcon,
		ExternalLinkIcon,
		FileIcon,
		GithubIcon,
		HomeIcon,
		NotebookIcon,
		PaletteIcon,
		SailboatIcon,
		TwitterIcon,
	} from '$lib/components/icons'
	import { searchIsOpen } from '$lib/store'
	import themesData from '../../themes.json'

	let query = ''
	$: selectedElement = (query && '0.0') || undefined

	interface Item {
		name: string
		href: string
		icon?: any
		iconColor?: string
		shortname?: string
		description?: string
		featured?: number
		[key: string]: unknown
	}

	const themes: Item[] = themesData.map((theme) => ({
		icon: NotebookIcon,
		href: theme.repo,
		name: theme.name,
		shortname: theme.shortname,
	}))

	// Sort featured themes
	const featuredThemes: Item[] = themesData
		.filter((theme) => typeof theme.featured !== 'undefined')
		.sort((a, b) => b.featured! - a.featured!)
		.map((theme) => ({
			icon: NotebookIcon,
			href: theme.repo,
			name: theme.name,
			shortname: theme.shortname,
		}))

	const roles = Object.keys(palette.roles)
	const colors: Item[] = []
	roles.map((role) => {
		if (role.includes('highlight')) return
		colors.push({
			iconColor: `hsl(var(--color-${role}))`,
			href: `/docs/usage#${role.toLowerCase().replace(' ', '-')}`,
			name: role.charAt(0).toUpperCase() + role.slice(1),
		})
	})

	$: groups = [
		{
			name: $_('common.pages', { default: 'Pages' }),
			items: [
				{
					icon: HomeIcon,
					name: $_('common.home', { default: 'Home' }),
					href: '/',
				},
				{
					icon: SailboatIcon,
					name: $_('common.themes', { default: 'Themes' }),
					href: '/themes',
				},
				{
					icon: PaletteIcon,
					name: $_('common.palette', { default: 'Palette' }),
					href: '/palette',
				},
				{
					icon: FileIcon,
					name: $_('common.documentation', { default: 'Documentation' }),
					href: '/docs',
				},
			],
		},
		{
			// Show all themes when searching, otherwise show featured themes
			name: query
				? $_('common.themes', { default: 'Themes' })
				: $_('common.featured_themes', { default: 'Featured themes' }),
			items: query ? themes : featuredThemes,
		},
		{
			name: $_('common.colors', { default: 'Colours' }),
			items: colors,
		},
		{
			name: $_('common.community', { default: 'Community' }),
			items: [
				{
					icon: TwitterIcon,
					name: 'Twitter',
					href: 'https://twitter.com/rosepinetheme',
				},
				{
					icon: GithubIcon,
					name: 'GitHub',
					href: 'https://github.com/rose-pine',
				},
			],
		},
	]

	$: !$searchIsOpen && (query = '')
	$: !$searchIsOpen && (selectedElement = undefined)

	$: filteredGroups = groups
		.map((group) => ({
			...group,
			items: group.items.filter((item) =>
				hasMatch(item, query, ['name', 'shortname'])
			),
		}))
		.filter((group) => group.items.length)

	$: hasResults =
		filteredGroups.filter((group) => group.items.length > 0).length > 0

	function handleKeydown(e: KeyboardEvent) {
		// Toggle command palette via keyboard shortcut
		if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
			e.preventDefault()
			searchIsOpen.set(!$searchIsOpen)
		}
	}

	function handleInputKeydown(e: KeyboardEvent) {
		// Navigate to first result on enter
		if (e.key === 'Enter') {
			const url = document
				?.getElementById(`${selectedElement}`)
				?.getAttribute('href')

			if (!url) return

			if (url.startsWith('http')) {
				window.open(url, '_blank')
			} else {
				goto(url)
			}

			searchIsOpen.set(false)
			query = ''
		}
	}
</script>

<svelte:window on:keydown={handleKeydown} />

<Dialog
	open={$searchIsOpen}
	on:close={() => searchIsOpen.set(false)}
	class="fixed inset-0 z-20 pt-[10vh]"
>
	<DialogOverlay class="fixed inset-0 bg-black/10 backdrop-blur-sm" />

	<DialogTitle class="sr-only">
		{$_('command_palette.title', { default: 'Search' })}
	</DialogTitle>

	<DialogDescription class="sr-only">
		{$_('command_palette.description', {
			default: 'Discover Rosé Pine pages, themes, and palette.',
		})}
	</DialogDescription>

	<!-- Panel -->
	<div
		class="absolute inset-x-0 bottom-0 z-30 mx-auto max-w-xl overflow-hidden rounded-t-xl rounded-b-none border border-muted/10 before:absolute before:inset-0 before:z-[-1] before:bg-surface supports-blur:before:bg-surface/95 supports-blur:before:backdrop-blur-md sm:bottom-auto sm:rounded-b-xl"
	>
		<!-- Search -->
		<div class="relative flex h-14 items-center px-3 sm:h-16 sm:px-5">
			<label for="search" class="sr-only">
				{$_('command_palette.search_label', {
					default: 'Search pages, themes, and palette',
				})}
			</label>

			<input
				id="search"
				bind:value={query}
				on:keydown={handleInputKeydown}
				placeholder={$_('command_palette.search_label', {
					default: 'Search pages, themes, and palette...',
				})}
				aria-controls="search-list"
				class="h-full w-full bg-transparent text-sm placeholder:text-muted focus:outline-none"
			/>

			<div class="w-3" />

			<button
				on:click={() => searchIsOpen.set(false)}
				class="flex items-center rounded-md border border-muted/20 bg-muted/10 p-1.5 font-mono text-[10px] font-medium text-subtle ring-muted/30 ring-offset-1 ring-offset-surface transition hover:bg-muted/20 hover:text-text focus:text-text focus:outline-none focus:ring"
			>
				<kbd>ESC</kbd>
			</button>
		</div>

		<div
			class="relative max-h-96 overflow-y-scroll border-t border-muted/10 px-3 sm:px-5"
		>
			<!-- Top overflow effect -->
			<div
				aria-hidden="true"
				class="pointer-events-none sticky top-0 -mb-4 h-8 w-full bg-gradient-to-b from-surface/80 to-transparent blur-md"
			/>

			<div>
				{#each filteredGroups as group, groupIndex (group.name)}
					<div class="mt-6 first-of-type:mt-0">
						<span class="text-xs font-medium tracking-wide text-subtle"
							>{group.name}</span
						>
					</div>

					<ul id="search-list" role="listbox" class="mt-1">
						{#each group.items as item, itemIndex (item.name)}
							{@const elementId = `${groupIndex}.${itemIndex}`}
							{@const isExternal = item.href.startsWith('http')}

							<li>
								<a
									id={elementId}
									on:mouseover={() => (selectedElement = elementId)}
									on:focus={() => (selectedElement = elementId)}
									href={item.href}
									target={isExternal ? '_blank' : undefined}
									class="-mx-1.5 flex items-center space-x-2 rounded-lg px-1.5 py-3 transition focus:outline-none active:bg-muted/10 sm:-mx-2.5 sm:px-2.5 sm:text-sm
									{selectedElement === elementId ? 'bg-muted/10 [&>*]:text-text' : ''}"
								>
									{#if item.icon}
										<span
											class="text-subtle transition
											{selectedElement === elementId
												? ''
												: 'group-hover:text-text group-focus:text-text'}"
										>
											<svelte:component this={item.icon} size={18} />
										</span>
									{:else if item.iconColor}
										<div class="flex h-5 w-5 items-center justify-center">
											<div
												class="h-4 w-4 rounded-full border sm:h-[18px] sm:w-[18px]"
												style:background-color={item.iconColor}
											/>
										</div>
									{/if}

									<p class="truncate">{item.name}</p>

									<div class="flex-1" />

									<p
										class="flex items-center space-x-2 text-muted transition
										{selectedElement === elementId
											? ''
											: 'group-hover:text-text group-focus:text-text'}"
									>
										{#if isExternal}
											<span>{new URL(item.href).hostname}</span>

											<ExternalLinkIcon size={14} />
										{:else}
											<ChevronRightIcon size={18} />
										{/if}
									</p>
								</a>
							</li>
						{/each}
					</ul>
				{/each}
			</div>

			{#if !hasResults}
				<div class="-mx-1.5 space-y-6 sm:-mx-3">
					<p class="text-center text-sm">
						{$_('command_palette.search_no_results', {
							default: 'No results for "{query}"',
							values: { query },
						})}
					</p>

					<ul
						class="divide-y divide-muted/10 overflow-hidden rounded-xl border border-muted/10 bg-muted/5"
					>
						<li>
							<a
								href="/themes"
								class="group flex items-center space-x-2 p-3 text-sm text-subtle transition hover:bg-muted/10 focus:bg-muted/20 focus:outline-none"
							>
								<span
									class="transition group-hover:text-text group-focus:text-text"
									>{$_('command_palette.search_suggestion_1', {
										default: 'Browse all themes',
									})}</span
								>

								<div class="flex-1" />

								<span
									class="text-muted transition group-hover:text-text group-focus:text-text"
								>
									<ChevronRightIcon size={16} />
								</span>
							</a>
						</li>

						<li>
							<a
								href="/docs"
								class="group flex items-center space-x-2 p-3 text-sm text-subtle transition hover:bg-muted/10 focus:bg-muted/20 focus:outline-none"
							>
								<span
									class="transition group-hover:text-text group-focus:text-text"
									>{$_('command_palette.search_suggestion_2', {
										default: 'Contribute to Rosé Pine',
									})}</span
								>

								<div class="flex-1" />

								<span
									class="text-muted transition group-hover:text-text group-focus:text-text"
								>
									<ChevronRightIcon size={16} />
								</span>
							</a>
						</li>
					</ul>
				</div>
			{/if}

			<!-- Bottom overflow effect -->
			<div
				aria-hidden="true"
				class="pointer-events-none sticky bottom-0 -mt-6 h-8 w-full bg-gradient-to-t from-surface/80 to-transparent blur-md sm:-mt-4"
			/>
		</div>
	</div>
</Dialog>
