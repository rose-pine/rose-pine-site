<script context="module">
	import { addMessages, getLocaleFromQueryString, init } from 'svelte-i18n'
	import { browser } from '$app/env'
	import { getSafeStorage } from '$lib/util'
	import en from '$lib/locales/en.json'
	import fr from '$lib/locales/fr.json'
	import it from '$lib/locales/it.json'
	import de from '$lib/locales/de.json'
	import nl from '$lib/locales/nl.json'
	import '../app.css'

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
	import Header from '$lib/components/header.svelte'
	import Footer from '$lib/components/footer.svelte'
</script>

<Header />

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

		<div class="flex shrink-0 items-center">
			<!-- full navigation -->
			<nav class="hidden cursor-default sm:block">
				<ul class="flex items-center space-x-3">
					{#each menu as [label, href]}
						<li>
							<a
								{href}
								class="w-full rounded-md px-2 py-1 text-sm transition hover:bg-muted/10 hover:text-text focus:outline-none focus:ring
								{$page.url.pathname.includes(href) ? 'text-text' : 'text-subtle'}"
							>
								{label}
							</a>
						</li>
					{/each}

					<li>
						<Select
							id="languages"
							bind:value={$locale}
							label={$_('languages.label')}
							options={Object.keys($languages).map((language) => [
								$languages[language],
								language,
							])}
						/>
					</li>
				</ul>
			</nav>

			<!-- small navigation -->
			<nav
				class="group relative block min-w-[64px] cursor-default text-right sm:hidden"
			>
				<button
					on:click={() => (open = !open)}
					class="rounded-md bg-muted/10 px-2 py-1 text-sm text-subtle hover:bg-muted/10 focus:outline-none focus:ring"
				>
					Menu
				</button>

				<ul
					class="absolute right-0 z-50 hidden min-w-[128px] space-y-1 rounded-md bg-surface p-2 text-left shadow group-focus-within:block group-hover:block group-focus:block"
				>
					{#each menu as [label, href]}
						<li class="flex items-center">
							<a
								{href}
								class="w-full rounded-md px-2 py-1 text-sm transition hover:bg-muted/10 hover:text-text focus:outline-none focus:ring
								{$page.url.pathname.includes(href) ? 'text-text' : 'text-subtle'}"
							>
								{label}
							</a>
						</li>
					{/each}

					<li>
						<Select
							id="languages"
							bind:value={$locale}
							label={$_('languages.label')}
							options={Object.keys($languages).map((language) => [
								$languages[language],
								language,
							])}
						/>
					</li>
				</ul>
			</nav>

			<div class="pl-3">
				<button
					aria-label="Search"
					on:click={() => commandMenuIsOpen.set(true)}
					class="flex h-7 w-7 items-center justify-center rounded-md border bg-muted/5 text-subtle hover:bg-muted/10 focus:outline-none focus:ring"
				>
					<SearchIcon size={16} />
				</button>
			</div>
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
			Copyright &copy; {new Date().getFullYear()} Rosé Pine. All rights reserved.
		</p>

		<div class="flex items-center space-x-4">
			<a
				href="https://github.com/rose-pine"
				title="GitHub"
				class="flex h-7 w-7 items-center justify-center rounded text-subtle hover:bg-muted/10 hover:text-text focus:outline-none focus:ring"
				><GithubIcon size={18} /></a
			>

			<a
				href="https://twitter.com/rosepinetheme"
				title="Twitter"
				class="flex h-7 w-7 items-center justify-center rounded text-subtle hover:bg-muted/10 hover:text-text focus:outline-none focus:ring"
				><TwitterIcon size={18} /></a
			>
		</div>
	</div>
</footer>
