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

<main class="min-h-[calc(100vh-4rem)]">
	<slot />
</main>

<Footer />
