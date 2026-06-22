import { defineLocale } from "../utilities/i18n";

export default defineLocale({
	config: {
		name: "Türkçe",
	},
	translations: {
		"nav.home": "Ana sayfa",
		"nav.themes": "Temalar",
		"nav.palette": "Palet",

		"home.title": "Güzel bir şey",
		"home.description":
			"Şık minimalistler için tamamen doğal çam, suni kürk ve biraz da soho havası",

		"themes.title": "Temalar",
		"themes.description": "El yapımı kişiselleştirme koleksiyonu",
		"themes.search_placeholder": "Temalar arayın",

		"palette.title": "Palet",

		"command.search_placeholder": "Sayfalar, temalar ve paletler arayın",
		"command.empty_results": "Herhangi bir sonuç bulunamadı",
		"command.pages": "Sayfalar",
		"command.featured_themes": "Öne çıkan temalar",
		"command.community": "Topluluk",

		"article.authored_by": "Yazan",
		"article.authored_on": "{{date}} tarihinde",
		"article.updated_on": "(güncellendi {{date}})",
	},
});
