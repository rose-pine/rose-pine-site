import { defineLocale } from "../utilities/i18n";

export default defineLocale({
	config: {
		name: "Nederlands",
	},
	translations: {
		"nav.home": "Naar huis",
		"nav.themes": "Thema's",
		"nav.palette": "Palet",

		"home.title": "Iets prachtig",
		"home.description":
			"Natuurlijke denne, nepbont en een beetje soho vibes voor de stijlvolle minimalist",

		"themes.title": "Thema's",
		"themes.description": "Handgemaakte collectie van personalisatie",
		"themes.search_placeholder": "Zoek thema's",

		"palette.title": "Palet",

		"command.search_placeholder": "Zoek pagina's, thema's en palet",
		"command.empty_results": "Geen resultaten gevonden",
		"command.pages": "Pagina's",
		"command.featured_themes": "Aanbevolen thema's",
		"command.community": "Gemeenschap",
	},
});
