---
title: Ajouter une traduction
description: Un guide pas à pas pour internationaliser le site web de Rosé Pine.
author: wawaverse
publishedAt: 2026-06-27T12:00:00-06:00
updatedAt: 2026-06-27T12:00:00-06:00
---

La langue est une chose magnifique et nous vous remercions de partager la vôtre avec les autres ! Ci-dessous, nous détaillerons comment traduire les différentes parties du site web et des articles.

Bien que ce ne soit pas strictement nécessaire, disposer d'un environnement de développement local vous permettra de prévisualiser vos modifications en direct. Alternativement, vous pouvez [effectuer vos modifications directement sur GitHub](https://github.com/rose-pine/rose-pine-site).

## Configurer votre environnement de développement

1. Forkez et clonez le dépôt du [site web de Rosé Pine](https://github.com/rose-pine/rose-pine-site).
2. Installez [Node.js](https://nodejs.org/en/download) et [pnpm](https://pnpm.io/installation) en suivant leurs guides officiels.
3. Lancez le serveur de développement via `pnpm dev` pour prévisualiser le contenu en direct.

## Traduire le site web

Copiez le fichier de langue anglais et renommez-le avec le code de votre langue:

```diff
  src/locales/en.ts
+ src/locales/sd.ts
```

Mettez à jour le champ `name` à l'intérieur de `config` avec le nom de votre langue, puis ajoutez vos traductions:

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

Toutes les traductions manquantes basculeront automatiquement vers la version anglaise par défaut.

## Tradruire les guides

En utilisant la version anglaise comme référence, créez votre guide:

```diff
  src/content/guides/en/create-a-theme.md
+ src/content/guides/sd/create-a-theme.md
```

Le nom d'utilisateur de l'auteur sera associé à un fichier présent dans le dossier `src/content/authors/`. Veillez donc à vous y ajouter, par exemple:

```diff
// src/content/authors/<username>.yaml
+ name: "<name>"
+ image: "https://avatars.githubusercontent.com/<username>"
+ url: "https://example.com"
```

## Soumettre vos modifications

Créez une pull request sur [rose-pine/rose-pine-site](https://github.com/rose-pine/rose-pine-site). Nous l'examinerons avec plaisir et nous vous remercions par avance de rendre Rosé Pine un brin plus accessible!
