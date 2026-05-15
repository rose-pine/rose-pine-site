import { defineLocale } from "../define-locale";

export default defineLocale({
	config: {
		name: "简体中文",
	},
	translations: {
		"nav.home": "主页面",
		"nav.themes": "主题",
		"nav.palette": "调色板",

		"home.title": "美好的事物",
		"home.description":
			"全天然的松木，仿毛皮和一丝苏荷风情，为优雅的极简主义者带来精致的氛围。",

		"themes.title": "主题",
		"themes.description": "用心打磨的个性化珍藏。",
		"themes.search_placeholder": "搜索主题",

		"palette.title": "调色板",

		"command.search_placeholder": "搜索页面、主题和调色板",
		"command.empty_results": "未找到结果。",
		"command.pages": "页面",
		"command.featured_themes": "精选主题",
		"command.community": "社区",
	},
});
