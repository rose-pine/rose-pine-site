import { defineLocale } from "../utilities/i18n";

export default defineLocale({
	config: {
		name: "English",
	},
	translations: {
		"shared.all": "All",
		"shared.language": "Language",

		"header.nav_label": "Primary",

		"footer.nav_label": "Secondary",
		"footer.heading.collections": "Collections",
		"footer.collection.photography": "Photography",
		"footer.heading.resources": "Resources",
		"footer.resource.create": "Create a theme",
		"footer.resource.submit": "Submit your theme",
		"footer.resource.translate": "Add a translation",
		"footer.heading.social": "Social",

		"nav.home": "Home",
		"nav.themes": "Themes",
		"nav.palette": "Palette",
		"nav.create": "Create",

		"command.trigger": "Open command menu",
		"command.title": "Command menu",
		"command.description": "Global site search",
		"command.search_placeholder": "Search pages, themes and palette...",
		"command.close": "Close command menu",
		"command.empty_results": "No results found",
		"command.feeling_lucky": "Feeling lucky",
		"command.featured_themes": "Featured themes",
		"command.pages": "Pages",
		"command.community": "Community",

		"home.title": "Something beautiful",
		"home.description":
			"All natural pine, faux fur and a bit of soho vibes for the classy minimalist.",
		"home.primary_action": "Explore themes",
		"home.feature.colours_and_community.title": "Colours & community",
		"home.feature.colours_and_community.description":
			"Rosé Pine is an elegant palette featured in over {{REPOS_COUNT}} of your favourite apps, thanks to our lovely and generous contributors.",
		"home.feature.passionately_subtle.title": "Passionately subtle",
		"home.feature.passionately_subtle.description":
			"With a focus on quality and purpose, our curated colours are built to inspire, not to overwhelm. We're excited for you to share your creations with the world.",
		"home.feature.inclusive_equal_diverse.title": "Inclusive, equal, diverse",
		"home.feature.inclusive_equal_diverse.description":
			"We are constantly striving to provide a safe and encouraging environment for all. You are loved and appreciated.",

		"themes.title": "Themes",
		"themes.description": "Hand-crafted collection of personalisation.",
		"themes.ports": "Ports",
		"themes.contributors": "Contributors",
		"themes.search_placeholder": "Search themes...",
		"themes.search_focus_cue": "Press / to focus",

		"photography.title": "Photography",
		"photography.description":
			"If you don't stop for a while, you might miss a perfect view.",

		"palette.title": "Palette",
		"palette.description": "Curated colours, designed to inspire.",
		"palette.variants": "Variants",
		"palette.colours": "Colours",

		"create.title": "Create",
		"create.description":
			"Guides, tools, and inspiration for creating beautiful themes.",
		"create.also_available_in": "Also available in:",

		"article.authored_by": "Authored by",
		"article.authored_on": "on {{date}}",
		"article.updated_on": "(updated {{date}})",

		"submit.title": "Submit a theme",
		"submit.description": "Send in your theme to be added to Rosé Pine.",
		"submit.form.link_label": "Link to repository",
		"submit.form.category_label": "Category",
		"submit.form.primary_action": "Submit",
	},
});
