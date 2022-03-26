<script lang="ts">
	import { Dialog, DialogOverlay } from '@rgossiaux/svelte-headlessui'
	import {
		BoatIcon,
		BookIcon,
		GithubIcon,
		HomeIcon,
		PaletteIcon,
		SearchIcon,
		TwitterIcon,
	} from '$lib/components/icons'
	import { commandPaletteIsOpen } from '$lib/store'
	import rawThemes from '$lib/data/themes.json'

	let query = ''

	const pages = [
		{ name: 'Home', url: '/', icon: HomeIcon },
		{ name: 'Themes', url: '/themes', icon: BoatIcon },
		{ name: 'Palette', url: '/palette', icon: PaletteIcon },
	]

	const socials = [
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

	const matchDomain = /(?:[\w-]+\.)+[\w-]+/
	const themes = rawThemes.map(({ name, shortname, repo }) => ({
		name,
		shortname: shortname || '',
		description: repo.includes('github.com')
			? `on GitHub`
			: `on ${repo.match(matchDomain)}`,
		url: repo,
		icon: BookIcon,
	}))

	interface Item {
		icon: any
		name: string
		url: string
		shortname?: string
		description?: string
	}

	type Group = { name: string; items: Item[] }

	const groups: Group[] = [
		{ name: 'Pages', items: pages },
		{ name: 'Themes', items: themes },
		{ name: 'Socials', items: socials },
	]

	// Return limited number of items when there is no query
	$: filteredGroups = groups.map((group) => {
		let workingGroup = { ...group }
		workingGroup.items =
			workingGroup.items.filter((item, i) =>
				query
					? item.name.toLowerCase().includes(query.toLowerCase()) ||
					  item.shortname?.toLowerCase().includes(query.toLowerCase())
					: i < 9
			) || []

		return workingGroup
	})

	$: hasResults =
		filteredGroups.filter((group) => group.items.length > 0).length > 0
</script>

<svelte:window
	on:keydown={(e) => {
		// Toggle command palette via keyboard shortcut
		if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
			commandPaletteIsOpen.set(!$commandPaletteIsOpen)
		}
	}}
/>

<Dialog
	open={$commandPaletteIsOpen}
	on:close={() => commandPaletteIsOpen.set(false)}
	class="fixed inset-0 z-20 overflow-y-auto p-4 pt-[25vh]"
>
	<DialogOverlay class="fixed inset-0 bg-zinc-900/50" />

	<div
		class="relative mx-auto max-w-md divide-y divide-highlight-low overflow-hidden rounded-xl border bg-surface shadow-lg"
	>
		<div class="flex items-center px-4">
			<label for="search">
				<SearchIcon size={18} color="var(--subtle)" />
			</label>
			<input
				id="search"
				bind:value={query}
				class="h-12 w-full border-0 bg-transparent px-2 text-sm placeholder-subtle focus:outline-none"
				placeholder="Search..."
			/>
		</div>

		{#if hasResults}
			<ul class="max-h-96 overflow-y-auto py-4 text-sm">
				{#each filteredGroups as group}
					{#if group.items.length > 0}
						<h3 class="px-4 pt-4 pb-2 text-xs font-semibold text-subtle">
							{group.name}
						</h3>

						{#each group.items as item}
							<li class="px-2">
								<a
									href={item.url}
									class="group flex items-center space-x-1 rounded px-2 py-2 hover:bg-highlight-low focus:outline-none focus:ring-2 focus:ring-highlight-high"
								>
									<div class="pr-1">
										<svelte:component
											this={item.icon}
											size={18}
											color="var(--subtle)"
										/>
									</div>
									<span class="font-medium">{item.name}</span>
									{#if item.description}
										<span class="text-subtle">{item.description}</span>
									{/if}
								</a>
							</li>
						{/each}
					{/if}
				{/each}
			</ul>
		{/if}

		{#if query.length && !hasResults}
			<p class="p-4 text-sm text-subtle">No results found</p>
		{/if}
	</div>
</Dialog>
