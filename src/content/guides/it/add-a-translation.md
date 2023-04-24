---
title: Aggiungere una traduzione
description: Guida ai contributi per i traduttori.
priority: 98
---

## Imposta il tuo ambiente di sviluppo

> Apporta eventuali modifiche direttamente su GitHub se è più semplice

1. Fork e clone [il sito di Rosé Pine](https://github.com/rose-pine/rose-pine-site).
2. Installa [node](https://nodejs.org) e [pnpm](https://pnpm.io/installation).
3. All'interno della directory del sito, installa le dipendenze e avvia il
   server di sviluppo locale:
   ```sh
   pnpm install && pnpm dev
   ```
4. Passare a [http://localhost:3000](http://localhost:3000) per vedere gli aggiornamenti in tempo
   reale.

### Tradurre la documentazione

1. Crea una nuova pagina all'interno di `src/content/{locale}/`
2. Fai riferimento alla pagina equivalente in inglese o a un'altra lingua con
   cui ti senti a tuo agio, ad es. `src/content/en/create-a-theme.md`

### Tradurre frammenti di pagina

1. Crea un nuovo file locale all'interno di `src/locales/{locale}.json`
2. Fai riferimento alla schema equivalente inglese o a un'altra lingua con cui
   ti senti a tuo agio, ad es. `src/locales/en.json`
