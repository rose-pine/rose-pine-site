<script lang="ts">
	import palette from '@rose-pine/palette'
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
		HomeIcon,
		PaletteIcon,
		SearchIcon,
	} from '$lib/components/icons'
	import themes from '$lib/data/themes.json'
	import { clipboard } from '$lib/store'

	const normalizedThemes = themes.map(({ name, repo }) => ({
		name,
		href: repo,
		icon: BookIcon,
	}))

	const normalizedPalette = Object.keys(palette.variants).flatMap((variant) =>
		Object.keys(palette.roles).flatMap((role) => {
			const color = palette.variants[variant][role]

			let formattedRole = role
			if (role === 'highlightLow') formattedRole = 'highlight low'
			if (role === 'highlightMed') formattedRole = 'highlight med'
			if (role === 'highlightHigh') formattedRole = 'highlight high'

			return {
				name: `${variant}/${formattedRole}`,
				hint: `Copy ${variant}/${formattedRole}`,
				action: () => clipboard.copy(color.hex),
				icon: DotIcon,
				iconColor: color.hex,
			}
		})
	)

	interface Group {
		name: string
		items: {
			name: string
			hint?: string
			icon: any
			iconColor?: string
			href?: string
			action?: () => void
		}[]
	}

	const groups: Group[] = [
		{
			name: 'Pages',
			items: [
				{ name: 'Home', href: '/', icon: HomeIcon },
				{ name: 'Themes', href: '/themes', icon: BoatIcon },
				{ name: 'Palette', href: '/palette', icon: PaletteIcon },
			],
		},
		{
			name: 'Themes',
			items: normalizedThemes,
		},
		{
			name: 'Palette',
			items: normalizedPalette,
		},
	]

	let search = ''
	$: placeholder = 'Search...'
	$: filteredGroups = groups.map((group) => {
		let workingGroup = { ...group }
		workingGroup.items = workingGroup.items.filter((item) =>
			hasMatch(item, search, ['name'])
		)
		return workingGroup.items.length ? workingGroup : []
	})

	let isOpen = true

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			isOpen = false
			return
		}
		if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
			isOpen = !isOpen
			return
		}
	}
</script>

<svelte:window on:keydown={handleKeydown} />

<Dialog open={isOpen} on:close={() => (isOpen = false)}>
	<DialogOverlay class="fixed inset-0 bg-zinc-900/50" />

	<div
		class="fixed top-14 left-1/2 z-20 w-full max-w-md -translate-x-1/2 px-4 sm:top-20"
	>
		<div class="relative mx-auto overflow-hidden rounded-2xl border bg-surface">
			<DialogTitle class="sr-only">Search</DialogTitle>
			<DialogDescription class="sr-only">
				Search Rosé Pine pages, themes and palette
			</DialogDescription>

			<div
				class="fixed inset-x-4 top-0 rounded-t-2xl border bg-surface focus-within:border-highlight-med"
			>
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

			<ul class="mt-14 max-h-[44vh] overflow-y-scroll pb-2">
				{#each filteredGroups as group}
					{#if group.name}
						<h3
							class="flex items-center px-4 pt-4 pb-2 text-xs font-semibold text-subtle"
						>
							{group.name}
						</h3>

						{#each group.items as item}
							<li class="px-2">
								{#if item.href}
									<a
										href={item.href}
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
						{/each}
					{/if}
				{/each}
			</ul>
		</div>
	</div>
</Dialog>

<style lang="postcss">
	.list-item {
		@apply flex w-full items-center space-x-2 rounded px-2 py-3 text-sm font-medium;
	}
	.list-item:hover {
		@apply bg-highlight-low;
	}
</style>
