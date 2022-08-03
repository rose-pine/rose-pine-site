<script context="module">
	import { addMessages, getLocaleFromQueryString, init } from 'svelte-i18n'
	import { browser } from '$app/env'
	import { getSafeStorage } from '$lib/util'
	import en from '$lib/locales/en.json'
	import fr from '$lib/locales/fr.json'
	import it from '$lib/locales/it.json'
	import de from '$lib/locales/de.json'
	import nl from '$lib/locales/nl.json'

	const locales = ['en', 'fr', 'it', 'de', 'nl']

	addMessages('en', en)
	addMessages('fr', fr)
	addMessages('it', it)
	addMessages('de', de)
	addMessages('nl', nl)

	// get locale on client and server
	// https://github.com/kaisermann/svelte-i18n/issues/166#issuecomment-1001009977
	if (browser) {
		// init on client side only
		init({
			fallbackLocale: getSafeStorage('locale', locales) || 'en',
			initialLocale: getLocaleFromQueryString('lang'),
		})
	} else {
		init({
			fallbackLocale: 'en',
		})
	}

	/** @type {import('@sveltejs/kit').Load} */
	export const load = ({ params }) => {
		if (!browser) {
			// init on server side only
			init({
				fallbackLocale: 'en',
				initialLocale: params.lang,
			})
		}
		return {}
	}
</script>

<script>
	import { _, locale } from 'svelte-i18n'
	import { page } from '$app/stores'
	import CommandPalette from '$lib/components/command-palette.svelte'
	import Select from '$lib/components/select.svelte'
	import {
		ChevronDownIcon,
		GithubIcon,
		RosePineIcon,
		SearchIcon,
		TwitterIcon,
	} from '$lib/components/icons'
	import { searchIsOpen, languages } from '$lib/store'
	import { setSafeStorage } from '$lib/util'
	import '../app.css'

	$: setSafeStorage('locale', $locale)

	let open = false

	$: menu = [
		[$_('page.themes.nav', { default: 'Themes' }), '/themes'],
		[$_('page.palette.nav', { default: 'Palette' }), '/palette'],
		['Docs', '/docs'],
	]
</script>

<CommandPalette />

<header class="flex justify-center px-page-gutter">
	<div
		class="flex h-header-height w-full max-w-content items-center justify-between space-x-3"
	>
		<a
			href="/"
			class="-ml-2 flex shrink-0 items-center space-x-3 rounded-md px-2 py-1 hover:bg-muted/10 focus:outline-none focus:ring"
		>
			<RosePineIcon />

			<h1 class="font-display text-lg font-bold">Rosé Pine</h1>
		</a>

		<div class="flex shrink-0 items-center space-x-3">
			<!-- full navigation -->
			<nav class="hidden cursor-default items-center space-x-3 sm:flex">
				{#each menu as [label, href]}
					<a
						{href}
						class="w-full rounded-md px-2 py-1 text-sm transition hover:bg-muted/10 hover:text-text focus:outline-none focus:ring
								{$page.url.pathname.includes(href) ? 'text-text' : 'text-subtle'}"
					>
						{label}
					</a>
				{/each}

				<Select
					id="languages"
					bind:value={$locale}
					label={$_('common.languages', { default: 'Languages' })}
					options={Object.keys($languages).map((language) => [
						$languages[language],
						language,
					])}
				/>
			</nav>

			<!-- small navigation -->
			<nav
				class="group relative block min-w-[64px] cursor-default text-right sm:hidden"
			>
				<button
					on:click={() => (open = !open)}
					class="flex h-9 items-center justify-center rounded-md pl-3 pr-9 text-subtle hover:bg-muted/10 hover:text-text focus:outline-none focus:ring"
				>
					Menu
					<div
						aria-hidden="true"
						class="pointer-events-none absolute right-0 z-10 mr-3 mt-px text-subtle"
					>
						<ChevronDownIcon size={14} />
					</div>
				</button>

				<ul
					class="absolute right-0 z-50 hidden min-w-[196px] space-y-1 rounded-md bg-surface p-3 text-left shadow group-focus-within:block group-hover:block group-focus:block"
				>
					{#each menu as [label, href]}
						<li>
							<a
								{href}
								class="-mx-1.5 flex h-9 w-full items-center rounded-md px-3 transition hover:bg-muted/10 hover:text-text focus:outline-none focus:ring
								{$page.url.pathname.includes(href) ? 'text-text' : 'text-subtle'}"
							>
								{label}
							</a>
						</li>
					{/each}

					<li class="pt-2">
						<Select
							id="languages"
							bind:value={$locale}
							label={$_('common.languages', { default: 'Languages' })}
							options={Object.keys($languages).map((language) => [
								$languages[language],
								language,
							])}
						/>
					</li>
				</ul>
			</nav>

			<button
				aria-label="Search"
				on:click={() => searchIsOpen.set(true)}
				class="flex h-9 w-9 items-center justify-center rounded-md border bg-muted/5 text-subtle hover:bg-muted/10 focus:outline-none focus:ring sm:h-7 sm:w-7"
			>
				<SearchIcon size={16} />
			</button>
		</div>
	</div>
</header>

<main class="min-h-content">
	<slot />
</main>

<footer class="flex justify-center px-page-gutter">
	<div
		class="flex h-footer-height w-full max-w-content items-center justify-between space-x-3"
	>
		<p class="text-sm text-muted">
			Copyright &copy; {new Date().getFullYear()} Rosé Pine.
		</p>

		<div class="flex items-center space-x-4">
			<a
				title="Twitter"
				href="https://twitter.com/rosepinetheme"
				target="_blank"
				class="flex h-8 w-8 items-center justify-center rounded text-subtle hover:bg-muted/10 hover:text-text focus:outline-none focus:ring sm:h-7 sm:w-7"
				><TwitterIcon size={18} /></a
			>

			<a
				title="GitHub"
				href="https://github.com/rose-pine"
				target="_blank"
				class="flex h-8 w-8 items-center justify-center rounded text-subtle hover:bg-muted/10 hover:text-text focus:outline-none focus:ring sm:h-7 sm:w-7"
				><GithubIcon size={18} /></a
			>
		</div>
	</div>
</footer>
