import { defineLocale } from "../define-locale";

export default defineLocale({
	config: {
		name: "Français",
	},
	translations: {
		"nav.home": "Maison",
		"nav.themes": "Thèmes",
		"nav.palette": "Palette",

		"home.title": "Quelque chose de beau",
		"home.description":
			"Pin naturel, fausse fourrure et un peu d'ambiance soho pour le minimaliste chic",

		"themes.title": "Thèmes",
		"themes.description": "Collection artisanale de personnalisation",
		"themes.search_placeholder": "Rechercher des thèmes",

		"palette.title": "Palette",

		"command.search_placeholder": "Recherche de pages, thèmes et palette",
		"command.empty_results": "Aucun résultat trouvé",
		"command.pages": "Pages",
		"command.featured_themes": "Thèmes en vedette",
		"command.community": "Communauté",
	},
});
