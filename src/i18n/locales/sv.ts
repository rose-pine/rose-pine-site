import { defineLocale } from "../define-locale";

export default defineLocale({
	config: {
		name: "Svenska",
	},
	translations: {
		"nav.home": "Hem",
		"nav.themes": "Teman",
		"nav.palette": "Palett",

		"home.title": "Något vackert",
		"home.description":
			"Helt naturlig tall, konstpäls och lite soho-vibbar för den stiliga minimalisten",

		"themes.title": "Teman",
		"themes.description": "Handgjord kollektion av personalisering",
		"themes.search_placeholder": "Sök teman",

		"palette.title": "Palett",

		"command.search_placeholder": "Sök sidor, teman och palett",
		"command.empty_results": "Inga resultat funna",
		"command.pages": "Sidor",
		"command.featured_themes": "Utvalda teman",
		"command.community": "Gemenskap",
	},
});
