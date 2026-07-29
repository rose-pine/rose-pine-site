import { defineLocale } from "../utilities/i18n";

export default defineLocale({
	config: {
		name: "한국어",
	},
	translations: {
		"nav.home": "홈",
		"nav.themes": "테마",
		"nav.palette": "팔레트",

		"home.title": "특별한 아름다움",
		"home.description":
			"세련된 미니멀리스트를 위한 자연스러운 파인, 부드러운 질감, 그리고 소호의 감성",

		"themes.title": "테마",
		"themes.description": "정성스럽게 만든 나만의 컬렉션",
		"themes.search_placeholder": "테마 검색하기",

		"palette.title": "팔레트",

		"command.search_placeholder": "페이지, 테마 또는 팔레트 검색",
		"command.empty_results": "검색 결과가 없습니다",
		"command.pages": "페이지",
		"command.featured_themes": "추천 테마",
		"command.community": "커뮤니티",
	},
});
