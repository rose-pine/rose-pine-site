import { defineLocale } from "../utilities/i18n";

export default defineLocale({
	config: {
		name: "Italiano",
	},
	translations: {
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
		"footer.heading.social": "Social",

		"nav.home": "Home",
		"nav.themes": "Temi",
		"nav.palette": "Tavolozza",
		"nav.create": "Crea",

		"command.trigger": "Apre il menu dei comandi",
		"command.title": "Menu dei comandi",
		"command.description": "Ricerca globale del sito",
		"command.search_placeholder": "Cerca pagine, temi, e tavolozze...",
		"command.close": "Chiudi il menu dei comandi",
		"command.empty_results": "Nessun risultato trovato",
		"command.feeling_lucky": "Sorprendimi",
		"command.featured_themes": "Temi in evidenza",
		"command.pages": "Pagine",
		"command.community": "Comunità",

		"home.title": "Un tocco di bellezza",
		"home.description":
			"Pino naturale, pelliccia sintetica e un pizzico di stile Soho per il minimalista raffinato.",
		"home.primary_action": "Esplora i temi",
		"home.feature.colours_and_community.title": "Colori & community",
		"home.feature.colours_and_community.description":
			"Rosé Pine è un'elegante palette presente in oltre {{REPOS_COUNT}} delle tue app preferite, grazie ai nostri piacevoli e generosi collaboratori.",
		"home.feature.passionately_subtle.title": "Appassionatamente discreto",
		"home.feature.passionately_subtle.description":
			"Con un'attenzione particolare alla qualità e allo scopo, i nostri colori accuratamente selezionati sono pensati per ispirare, non per sopraffare. Non vediamo l'ora che condividiate le vostre creazioni con il mondo.",
		"home.feature.inclusive_equal_diverse.title": "Inclusivi, equi, diversi",
		"home.feature.inclusive_equal_diverse.description":
			"Ci impegniamo costantemente a offrire un ambiente sicuro e stimolante per tutti. Qui trovi affetto, stima e considerazione.",

		"themes.title": "Temi",
		"themes.description": "Una selezione curata di personalizzazioni.",
		"themes.ports": "Port",
		"themes.contributors": "Collaboratori",
		"themes.search_placeholder": "Cerca temi...",
		"themes.search_focus_cue": "Premi / per focalizzare",

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

		"article.authored_by": "Scritto da",
		"article.authored_on": "il {{date}}",
		"article.updated_on": "(aggiornato {{date}})",

		"submit.title": "Invia un tema",
		"submit.description": "Invia il tuo tema per aggiungerlo a Rosé Pine.",
		"submit.form.link_label": "Link alla repositoria",
		"submit.form.category_label": "Categoria",
		"submit.form.primary_action": "Invia",
	},
});
