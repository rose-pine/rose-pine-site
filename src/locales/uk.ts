import { defineLocale } from "../utilities/i18n";

export default defineLocale({
	config: {
		name: "Українська",
	},
	translations: {
		"nav.home": "Головна",
		"nav.themes": "Теми",
		"nav.palette": "Палітра",

		"home.title": "Щось прекрасне",
		"home.description":
			"Натуральна сосна, штучне хутро та трохи атмосфери Сохо для стильного мінімалізму",

		"themes.title": "Теми",
		"themes.description": "Колекція персоналізації, створена вручну",
		"themes.search_placeholder": "Шукати теми",

		"palette.title": "Палітра",

		"command.search_placeholder": "Шукати сторінки, теми та палітри",
		"command.empty_results": "Нічого не знайдено",
		"command.pages": "Сторінки",
		"command.featured_themes": "Рекомендовані теми",
		"command.community": "Спільнота",

		"article.authored_by": "Автор",
		"article.authored_on": "{{date}}",
		"article.updated_on": "(оновлено {{date}})",
	},
});
