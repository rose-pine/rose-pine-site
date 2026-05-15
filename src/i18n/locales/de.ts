import { defineLocale } from "../define-locale";

export default defineLocale({
	config: {
		name: "Deutsch",
	},
	translations: {
		"nav.home": "Start",
		"nav.themes": "Themen",
		"nav.palette": "Farben",

		"home.title": "Etwas Wunder\u00ADschönes",
		"home.description":
			"Natürliche Kiefer, Kunstpelz und ein ein paar Soho Vibes für den stilvollen Minimalisten",

		"themes.title": "Themen",
		"themes.description": "Handgefertigte Kollektion zur Personalisierung",
		"themes.search_placeholder": "Themen durchsuchen",

		"palette.title": "Farbpaletten",

		"command.search_placeholder": "Suche Seiten, Themen und Paletten",
		"command.empty_results": "Keine Ergebnisse gefunden",
		"command.pages": "Seiten",
		"command.featured_themes": "Vorgestellten Themen",
		"command.community": "Gemeinschaft",
	},
});
