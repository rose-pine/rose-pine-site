import { defineLocale } from "../define-locale";

export default defineLocale({
	config: {
		name: "العربية",
		dir: "rtl",
	},
	translations: {
		"nav.home": "الرئيسية",
		"nav.themes": "السمات",
		"nav.palette": "لوحة الألوان",

		"home.title": "شيء جميل",
		"home.description":
			"صنوبر طبيعي بالكامل، فرو صناعي، ولمسة من أجواء سوهو لمحبّي البساطة الراقية.",

		"themes.title": "السمات",
		"themes.description": "مجموعة مصممة بعناية من التخصيصات.",
		"themes.search_placeholder": "ابحث عن سمات...",

		"palette.title": "لوحة الألوان",

		"command.search_placeholder": "ابحث في الصفحات والسمات ولوحة الألوان...",
		"command.empty_results": "لا توجد نتائج",
		"command.pages": "الصفحات",
		"command.featured_themes": "السمات المميّزة",
		"command.community": "المجتمع",
	},
});
