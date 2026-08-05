import { defineLocale } from "../utilities/i18n";

export default defineLocale({
	config: {
		name: "Bahasa Indonesia",
	},
	translations: {
		"nav.home": "Beranda",
		"nav.themes": "Tema",
		"nav.palette": "Palet",

		"home.title": "Sesuatu yang indah",
		"home.description":
			"Semua pinus alami, bulu tiruan dan sedikit kesan soho untuk gaya minimalis yang berkelas",

		"themes.title": "Tema",
		"themes.description": "Koleksi personalisasi yang dibuat dengan tangan",
		"themes.search_placeholder": "Cari tema",

		"palette.title": "Palet",

		"command.search_placeholder": "Cari halaman, tema, dan palet",
		"command.empty_results": "Hasil tidak ditemukan",
		"command.pages": "halaman",
		"command.recent_themes": "Tema yang baru diperbarui",
		"command.community": "Komunitas",
	},
});
