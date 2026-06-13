---
title: Aggiungere una traduzione
description: Guida ai contributi per i traduttori.
priority: 98
---

## Imposta il tuo ambiente di sviluppo

> Apporta eventuali modifiche direttamente su GitHub se è più semplice

1. Forka e clona [il sito di Rosé Pine](https://github.com/rose-pine/rose-pine-site).
2. Installa [node](https://nodejs.org) e [pnpm](https://pnpm.io/installation).
3. All'interno della directory del sito, installa le dipendenze e avvia il
   server di sviluppo locale:
   ```sh
   pnpm install && pnpm dev
   ```
4. Visita [http://localhost:3000](http://localhost:3000) per vedere gli aggiornamenti in tempo
   reale.

### Tradurre la documentazione

1. Crea una nuova pagina all'interno di `src/content/{locale}/`
2. Prendi come riferimento la pagina equivalente in inglese o in un'altra lingua con cui hai familiarità, ad es. `src/content/en/create-a-theme.md`

### Tradurre frammenti di pagina

1. Crea un nuovo file all'interno di `src/locales/{locale}.json`
2. Prendi come riferimento la struttura del file equivalente in inglese o in un altra lingua con cui hai familiarità, ad es. `src/locales/en.json`
