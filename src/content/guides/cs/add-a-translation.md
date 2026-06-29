---
title: Přidat překlad
description: Návod na překlad webové stránky Rosé Pine.
author: petrtech
publishedAt: 2026-06-29T23:00:00+02:00
updatedAt: 2026-06-29T23:00:00+02:00
---

Jazyk je krásný a vážíme si vaší ochoty sdílet ho s ostatními! Níže se podíváme na překlad různých částí webu a článků.

Ačkoli to není nezbytně nutné, místní vývojové prostředí vám usnadní práci, protože vám umožní zobrazovat živý náhled vašich změn. Případně můžete změny provádět přímo na [GitHubu](https://github.com/rose-pine/rose-pine-site).

## Nastavte si vývojové prostředí

1. Forkněte a naklonujte [webovou stránku Rosé Pine](https://github.com/rose-pine/rose-pine-site).
2. Nainstalujte [Node.js](https://nodejs.org/en/download) a [pnpm](https://pnpm.io/installation) podle jejich oficiálních návodů.
3. Příkazem `pnpm dev` spusťte vývojový server pro živý náhled obsahu.

## Přeložte web

Zkopírujte anglický lokalizační soubor a přejmenujte jej na ISO 639-1 kód vašeho jazyka:

```diff
  src/locales/en.ts
+ src/locales/sd.ts
```

Upravte `name` v sekci `config` na název vašeho jazyka a poté přidejte překlady:

```diff
  import { defineLocale } from "../utilities/i18n";

  export default defineLocale({
    config: {
-     name: "English",
+     name: "Sindarin",
    },
    translations: {
-     "shared.all": "All",
-     "shared.language": "Language",
+     "shared.all": "Pân",
+     "shared.language": "Lamb",
      ...
    },
  });
```

V případě chybějících překladů se automaticky použije angličtina.

## Překlad návodů

Použijte anglickou verzi jako vzor a vytvořte návod:

```diff
  src/content/guides/en/create-a-theme.md
+ src/content/guides/sd/create-a-theme.md
```

Všimněte si přidání složky `sd` pro náš příklad sindarštiny. Název návodu zůstává stejný.

Upravte nadpis, popis, autora a data v metadatech, která se nacházejí v úvodní části souboru ohraničené značkami `---`.

```diff
  ---
  title: <nadpis>
  description: <popis>
  author: <uživatelské-jméno>
  publishedAt: 2026-06-29T23:00:00+02:00
  updatedAt: 2026-06-29T23:00:00+02:00
  ---
```

Uživatelské jméno autora se spáruje s odpovídajícím souborem ve složce `src/content/authors/`, takže se tam nezapomeňte přidat, například:

```diff
// src/content/authors/<uživatelské-jméno>.yaml
+ name: "<jméno>"
+ image: "https://avatars.githubusercontent.com/<uživatelské-jméno>"
+ url: "https://example.com"
```

## Přispějte svými změnami

Vytvořte pull request na [rose-pine/rose-pine-site](https://github.com/rose-pine/rose-pine-site). Změny projdeme a poděkujeme vám za to, že jste pomohli udělat Rosé Pine o něco přístupnější!
