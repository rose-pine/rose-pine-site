import { defineLocale } from "../utilities/i18n";

export default defineLocale({
	config: {
		name: "Português (Brasil)",
	},
	translations: {
		"nav.home": "Home",
		"nav.themes": "Temas",
		"nav.palette": "Paleta",

		"home.title": "Simplesmente belo",
		"home.description":
			"Pinho natural, texturas suaves e uma vibe sofisticada para o minimalista com classe",

		"themes.title": "Temas",
		"themes.description": "Coleção cuidadosamente criada para personalização",
		"themes.search_placeholder": "Pesquisar temas",

		"palette.title": "Paleta",

		"command.search_placeholder": "Pesquisar páginas, temas e paletas",
		"command.empty_results": "Nenhum resultado encontrado",
		"command.pages": "Páginas",
		"command.featured_themes": "Temas em destaque",
		"command.community": "Comuni",
	},
});
