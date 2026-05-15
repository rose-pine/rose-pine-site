import { defineLocale } from "../define-locale";

export default defineLocale({
	config: {
		name: "Español",
	},
	translations: {
		"nav.home": "Casa",
		"nav.themes": "Temes",
		"nav.palette": "Paleta",

		"home.title": "Algo bonito",
		"home.description":
			"Pino natural, piel sintética y un poco de la atmósfera de Soho para el minimalista con clase",

		"themes.title": "Temes",
		"themes.description": "Colección artesanal de personalización",
		"themes.search_placeholder": "Buscar temas",

		"palette.title": "Paleta",

		"command.search_placeholder": "Buscar páginas, temas y paletas",
		"command.empty_results": "No se han encontrado resultados",
		"command.pages": "Páginas",
		"command.featured_themes": "Temas destacados",
		"command.community": "Comunidad",
	},
});
