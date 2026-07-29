import { defineLocale } from "../utilities/i18n";

export default defineLocale({
	config: {
		name: "Català",
	},
	translations: {
		"nav.home": "Casa",
		"nav.themes": "Temes",
		"nav.palette": "Paleta",

		"home.title": "Quelcom bonic",
		"home.description":
			"Pi natural, pell sintètica, i atmosfera del Soho, pel minimalista amb classe",

		"themes.title": "Temes",
		"themes.description": "Col·lecció de personalització feta a mà",
		"themes.search_placeholder": "Cerca temes",

		"palette.title": "Palete",

		"command.search_placeholder": "Cerca pàgines, temes i paleta",
		"command.empty_results": "Sense resultats",
		"command.pages": "Pàgines",
		"command.featured_themes": "Temes destacats",
		"command.community": "Comunitat",
	},
});
