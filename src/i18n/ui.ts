export const languages = {
	en: "English",
	it: "Italiano",
} as const;

export type Locale = keyof typeof languages;

export const locales = Object.keys(languages) as Locale[];

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

		"command.close": "Close command menu",
		"command.empty_results": "No results found",
		"command.feeling_lucky": "Feeling lucky",
		"command.featured_themes": "Featured themes",
		"command.search": "Search",
		"command.search_detail":
			"Search pages, themes, palette and more. Use the arrow keys to navigate.",

		"home.title": "Something beautiful",
		"home.description":
			"All natural pine, faux fur and a bit of soho vibes for the classy minimalist.",
		"home.primary_action": "Explore themes",

		"themes.title": "Themes",
		"themes.description": "Hand-crafted collection of personalisation.",
		"themes.ports": "Ports",
		"themes.contributors": "Contributors",

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

		"command.close": "Chiudi il menu dei comandi",
		"command.empty_results": "Nessun risultato trovato",
		"command.feeling_lucky": "Mi sento fortunato",
		"command.featured_themes": "Temi in evidenza",
		"command.search": "Cerca",
		"command.search_detail":
			"Cerca tra pagine, temi, tavolozze e altro. Usa le frecce per navigare.",

		"home.title": "Qualcosa di bello",
		"home.description":
			"Pino naturale, pelliccia sintetica e un po' di vibrazioni soho per il minimalista di classe.",
		"home.primary_action": "Esplora i temi",

		"themes.title": "Temi",
		"themes.description": "Collezione artigianale di personalizzazione.",
		"themes.ports": "Porti",
		"themes.contributors": "Collaboratrici",

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
