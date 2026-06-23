---
title: Aggiungere una traduzione
description: Una guida per internazionalizzare il sito Rosé Pine.
author: mvllow
publishedAt: 2025-11-09T12:00:00-06:00
updatedAt: 2025-11-09T12:00:00-06:00
---

La lingua è bellissima e apprezziamo che tu voglia condividerla con gli altri! Di seguito, vedremo come tradurre le diverse parti del sito e degli articoli.

Sebbene non sia strettamente necessario, avere un ambiente di sviluppo locale ti permetterà di visualizzare in anteprima le modifiche in tempo reale. In alternativa, puoi [effettuare le modifiche direttamente su GitHub](https://github.com/rose-pine/rose-pine-site).

## Configura il tuo ambiente di sviluppo

1. Fai il fork e clona il [sito Rosé Pine](https://github.com/rose-pine/rose-pine-site).
2. Installa [Node.js](https://nodejs.org/en/download) e [pnpm](https://pnpm.io/installation) seguendo le loro guide ufficiali.
3. Avvia il server di sviluppo tramite `pnpm dev` per visualizzare i contenuti in anteprima.

## Traduci il sito

Copia il file della lingua inglese e rinominalo con il codice della tua lingua:

```diff
  src/locales/en.ts
+ src/locales/sd.ts
```

Aggiorna `name` all'interno di `config` con il nome della tua lingua, poi aggiungi le tue traduzioni:

```diff
  import { defineLocale } from "../define-locale";

  export default defineLocale({
    config: {
-     name: "English",
+     name: "Sindarin",
    },
    translations: {

  export default {
-   "shared.all": "All",
-   "shared.language": "Language",
+   "shared.all": "Pân",
+   "shared.language": "Lamb",
    ...
  }
```

Quelle mancanti ricadranno automaticamente sull'inglese.

## Traduci le guide

Utilizzando la versione inglese come riferimento, crea la tua guida:

```diff
  src/content/guides/en/create-a-theme.md
+ src/content/guides/sd/create-a-theme.md
```

Nota l'aggiunta della cartella `sd` per il nostro esempio in Sindarin; il nome della guida rimane invariato.

Aggiorna il frontmatter—i metadati in cima al file racchiusi tra i marcatori `---`—con titolo, descrizione, autore e date.

```diff
  ---
  title: <title>
  description: <description>
  author: <username>
  publishedAt: 2025-11-09T12:00:00-06:00
  updatedAt: 2025-11-09T12:00:00-06:00
  ---
```

Il nome utente dell'autore verrà abbinato a un file nella cartella `src/content/authors/`, quindi assicurati di aggiungerti lì, ad esempio:

```diff
// src/content/authors/<username>.yml
+ name: "<name>"
+ image: "https://avatars.githubusercontent.com/<username>"
+ url: "https://example.com"
```

## Invia le tue modifiche

Crea una pull request su [rose-pine/rose-pine-site](https://github.com/rose-pine/rose-pine-site). La esamineremo e ti ringrazieremo per aver reso Rosé Pine un po' più accessibile!
