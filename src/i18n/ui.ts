import type { Lang } from "./utilities";

export const languages = {
	en: "English",
	it: "Italiano",
} as const;

export const locales = Object.keys(languages) as Lang[];

export const defaultLang = "en";
export const showDefaultLang = false;

export const ui = {
	en: {
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
		"command.home": "Home",
		"command.themes": "Themes",
		"command.palette": "Palette",
		"command.community": "Community",

		"home.title": "Something beautiful",
		"home.description":
			"All natural pine, faux fur and a bit of soho vibes for the classy minimalist.",
		"home.primary_action": "Explore themes",
		"home.feature.colours_and_community.title": "Colours & Community",
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

		"submit.title": "Submit a theme",
		"submit.description": "Send in your theme to be added to Rosé Pine.",
		"submit.form.link_label": "Link to repository",
		"submit.form.category_label": "Category",
		"submit.form.primary_action": "Submit",
	},
	it: {
		"shared.all": "Tutti",
		"shared.language": "Lingua",

		"header.nav_label": "Primaria",

		"footer.nav_label": "Secondaria",
		"footer.heading.collections": "Collezioni",
		"footer.collection.photography": "Fotografie",
		"footer.heading.resources": "Risorse",
		"footer.resource.create": "Crea un tema",
		"footer.resource.submit": "Invia il tuo tema",
		"footer.resource.translate": "Aggiungi una traduzione",
		"footer.heading.social": "Sociale",

		"nav.home": "Casa",
		"nav.themes": "Temi",
		"nav.palette": "Tavolozza",
		"nav.create": "Crea",

		"command.trigger": "Apre il menu dei comandi",
		"command.title": "Menu dei comandi",
		"command.description": "Cerca globale del sito",
		"command.search_placeholder": "Cerca pagine, temi, e tavolozze...",
		"command.close": "Chiudi il menu dei comandi",
		"command.empty_results": "Nessun risultato trovato",
		"command.feeling_lucky": "Mi sento fortunato",
		"command.featured_themes": "Temi in evidenza",
		"command.pages": "Pagine",
		"command.home": "Casa",
		"command.themes": "Temi",
		"command.palette": "Tavolozza",
		"command.community": "Comunità",

		"home.title": "Qualcosa di bello",
		"home.description":
			"Pino naturale, pelliccia sintetica e un po' di vibrazioni soho per il minimalista di classe.",
		"home.primary_action": "Esplora i temi",
		"home.feature.colours_and_community.title": "Colori & Comunità",
		"home.feature.colours_and_community.description":
			"Rosé Pine è un'elegante palette presente in oltre {{REPOS_COUNT}} delle tue app preferite, grazie ai nostri piacevoli e generosi collaboratori.",
		"home.feature.passionately_subtle.title": "Appassionatamente discreto",
		"home.feature.passionately_subtle.description":
			"Con un'attenzione particolare alla qualità e allo scopo, i nostri colori accuratamente selezionati sono pensati per ispirare, non per sopraffare. Non vediamo l'ora che condividiate le vostre creazioni con il mondo.",
		"home.feature.inclusive_equal_diverse.title": "Inclusivi, equi, diversi",
		"home.feature.inclusive_equal_diverse.description":
			"Ci impegniamo costantemente a offrire un ambiente sicuro e stimolante per tutti. Sei amato e apprezzato.",

		"themes.title": "Temi",
		"themes.description": "Collezione artigianale di personalizzazione.",
		"themes.ports": "Porti",
		"themes.contributors": "Collaboratrici",
		"themes.search_placeholder": "Cerca temi...",
		"themes.search_focus_cue": "Premi / per focare",

		"photography.title": "Fotografie",
		"photography.description":
			"Se non ti fermi un attimo, potresti perdere una vista perfetta.",

		"palette.title": "Tavolozza",
		"palette.description": "Colori curati, pensati per ispirare.",
		"palette.variants": "Varianti",
		"palette.colours": "Colori",

		"create.title": "Crea",
		"create.description":
			"Guide, strumenti e ispirazione per creare temi bellissimi.",
		"create.also_available_in": "Disponibile anche in:",

		"submit.title": "Invia un tema",
		"submit.description": "Invia il tuo tema per aggiungerlo a Rosé Pine.",
		"submit.form.link_label": "Link al repository",
		"submit.form.category_label": "Categoria",
		"submit.form.primary_action": "Invia",
	},
} as const;
