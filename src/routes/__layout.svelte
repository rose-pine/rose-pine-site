<script context="module">
	import { addMessages, getLocaleFromQueryString, init } from 'svelte-i18n'
	import { browser } from '$app/env'
	import en from '$lib/locales/en.json'
	import fr from '$lib/locales/fr.json'
	import it from '$lib/locales/it.json'

	addMessages('en', en)
	addMessages('fr', fr)
	addMessages('it', it)

	// get locale on client and server
	// https://github.com/kaisermann/svelte-i18n/issues/166#issuecomment-1001009977
	if (browser) {
		// init on client side only
		init({
			fallbackLocale: 'en',
			initialLocale: getLocaleFromQueryString('lang'),
		})
	}

	/** @type {import('@sveltejs/kit').Load} */
	export const load = ({ url }) => {
		if (!browser) {
			// init on server side only
			init({
				fallbackLocale: 'en',
				initialLocale: url.searchParams.get('lang'),
			})
		}
		return {}
	}
</script>

<script>
	import Header from '$lib/components/header.svelte'
</script>

<Header />

<main>
	<slot />
</main>

<style lang="postcss" global>
	@import url('https://rsms.me/inter/inter.css');
	@font-face {
		font-family: 'Pier Sans';
		font-style: normal;
		font-weight: bold;
		src: url('/fonts/PierSans-Bold.otf') format('opentype');
	}

	@tailwind base;
	@tailwind components;
	@tailwind utilities;

	:root {
		--base: #faf4ed;
		--surface: #fffaf3;
		--overlay: #f2e9de;
		--muted: #9893a5;
		--subtle: #797593;
		--text: #575279;
		--love: #b4637a;
		--gold: #ea9d34;
		--rose: #d7827e;
		--pine: #286983;
		--foam: #56949f;
		--iris: #907aa9;
		--highlight-low: rgba(110, 106, 134, 0.05);
		--highlight-med: rgba(110, 106, 134, 0.08);
		--highlight-high: rgba(110, 106, 134, 0.15);
	}

	@media (prefers-color-scheme: dark) {
		:root {
			--base: #191724;
			--surface: #1f1d2e;
			--overlay: #26233a;
			--muted: #6e6a86;
			--subtle: #908caa;
			--text: #e0def4;
			--love: #eb6f92;
			--gold: #f6c177;
			--rose: #ebbcba;
			--pine: #31748f;
			--foam: #9ccfd8;
			--iris: #c4a7e7;
			--highlight-low: rgba(110, 106, 134, 0.1);
			--highlight-med: rgba(110, 106, 134, 0.2);
			--highlight-high: rgba(110, 106, 134, 0.4);
		}
	}

	::selection {
		@apply bg-highlight-med;
	}

	html {
		@apply bg-base;
	}

	body {
		@apply text-text bg-base antialiased;
	}

	/* TODO: handle reduce motion on a case by case basis */
	@media (prefers-reduced-motion: reduce) {
		* {
			animation-delay: 0.01ms !important;
			animation-duration: 0.01ms !important;
			animation-iteration-count: 1 !important;
			transition-duration: 0.01ms !important;
		}
	}
</style>
