<script>
	import { _ } from 'svelte-i18n'
	import NavItem from '$lib/components/nav-item.svelte'
	import LocaleSwitcher from './locale-switcher.svelte'

	let open = false

	$: menu = [
		[$_('page.themes.nav'), '/themes'],
		[$_('page.palette.nav'), '/palette'],
	]
</script>

<header class="mx-auto w-full max-w-6xl">
	<div
		class="px-6 md:px-10 space-x-6 h-16 bg-base flex items-center justify-between"
	>
		<a
			href="/"
			class="-ml-2 px-2 py-1 rounded-md flex items-center shrink-0 hover:bg-highlight-low focus:outline-none focus:ring focus:ring-highlight-high"
		>
			<!-- prettier-ignore -->
			<svg viewBox="0 0 198 188" fill="none" xmlns="http://www.w3.org/2000/svg" class="mr-3 w-4 h-4">
				<path fill="var(--pine)" fill-opacity="0.5" fill-rule="evenodd" clip-rule="evenodd" d="M98.9824 152.25C94.1645 140.61 84.1877 131.253 71.1002 127.727L14.9408 112.599C7.82924 139.282 23.6151 166.976 50.2789 174.159L90.5058 184.995C93.3596 185.764 96.2625 184.961 98.2972 183.114C100.304 185.655 103.699 186.897 107.028 186.001L147.255 175.164C173.918 167.982 189.704 140.287 182.593 113.604L126.433 128.733C113.725 132.156 103.949 141.078 98.9824 152.25Z" />
				<path fill="var(--pine)" fill-rule="evenodd" clip-rule="evenodd" d="M99 177.99C94.3676 155.116 74.1899 137.733 50 137.733L0 137.733C0 165.347 22.3858 188 50 188H98H100H148C175.614 188 198 165.347 198 137.733L148 137.733C123.81 137.733 103.632 155.116 99 177.99Z" />
				<path fill="var(--rose)" fill-rule="evenodd" clip-rule="evenodd" d="M116.172 22.0991C111.969 13.1397 105.096 5.32759 95.9178 0L83.9001 20.9265C83.5434 21.5477 83.2015 22.1733 82.8743 22.8031C70.8317 12.8076 54.2791 8.62488 38.0001 13.0102L51.0053 61.8058C55.7428 79.5809 69.4827 92.5279 86.0109 97.068L85.9999 97.1091C90.3717 98.2868 94.7632 98.8465 99.0818 98.8417C103.405 98.8478 107.802 98.2881 112.178 97.1091L112.167 97.0679C128.696 92.5279 142.435 79.5809 147.173 61.8058L160.178 13.0102C144.287 8.72929 128.135 12.6132 116.172 22.0991Z" />
			</svg>

			<h1 class="font-display font-bold text-lg">Rosé Pine</h1>
		</a>

		<!-- full navigation -->
		<nav class="cursor-default hidden sm:block">
			<ul class="space-x-3 flex items-center">
				{#each menu as [label, href]}
					<li>
						<NavItem {href} {label} />
					</li>
				{/each}

				<li class="pl-1">
					<LocaleSwitcher />
				</li>
			</ul>
		</nav>

		<!-- small navigation -->
		<nav
			class="group cursor-default min-w-[64px] text-right block sm:hidden relative"
		>
			<button
				on:click={() => (open = !open)}
				class="px-2 py-1 text-sm sm:text-md text-subtle bg-highlight-low rounded-md hover:bg-highlight-med focus:outline-none focus:ring focus:ring-highlight-high"
			>
				Menu
			</button>

			<ul
				class="p-2 min-w-[128px] space-y-1 text-left bg-surface rounded-md shadow hidden group-hover:block group-focus:block group-focus-within:block absolute z-50 right-0"
			>
				{#each menu as [label, href]}
					<li class="flex items-center">
						<NavItem {href} {label} />
					</li>
				{/each}

				<li class="pt-1">
					<LocaleSwitcher />
				</li>
			</ul>
		</nav>
	</div>
</header>
