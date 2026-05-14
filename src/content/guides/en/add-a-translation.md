---
title: Add a translation
description: A walkthrough for internationalising the Rosé Pine website.
author: mvllow
publishedAt: 2025-11-09T12:00:00-06:00
updatedAt: 2025-11-09T12:00:00-06:00
---

Language is beautiful and we appreciate you sharing your language with others! Below, we'll go into translating different parts of the website and articles.

While not strictly necessary, having a local development environment will enable you to live preview your changes. Alternatively, you may [make changes directly on GitHub](https://github.com/rose-pine/rose-pine-site).

## Setup your development environment

1. Fork and clone the [Rosé Pine website](https://github.com/rose-pine/rose-pine-site).
2. Install [Node.js](https://nodejs.org/en/download) and [pnpm](https://pnpm.io/installation) following their official guides.
3. Start the dev server via `pnpm dev` for live previewing content.

## Translate the website

Copy the English locale file and rename it to your language code:

```diff
  src/i18n/locales/en.ts
+ src/i18n/locales/sd.ts
```

Update `displayName` at the top of the file to your language's name, then translate the strings below it:

```diff
- export const displayName = "English";
+ export const displayName = "Sindarin";

  export default {
-   "shared.all": "All",
-   "shared.language": "Language",
+   "shared.all": "Pân",
+   "shared.language": "Lamb",
    ...
  }
```

Any missing translations will automatically fall back to English.

## Translate guides

Using the English version for reference, create your guide:

```diff
  src/content/guides/en/create-a-theme.md
+ src/content/guides/sd/create-a-theme.md
```

Note the addition of the `sd` folder for our Sindarin example and the guide name stays the same.

Update the frontmatter—metadata at the top of the file sandwiched between `---` markers—with a title, description, author and dates.

```diff
  ---
  title: <title>
  description: <description>
  author: <username>
  publishedAt: 2025-11-09T12:00:00-06:00
  updatedAt: 2025-11-09T12:00:00-06:00
  ---
```

The author's username will be matched to a file inside the `src/content/authors/` folder so be sure to add yourself there, e.g.:

```diff
// src/content/authors/<username>.yml
+ name: "<name>"
+ image: "https://avatars.githubusercontent.com/<username>"
+ url: "https://example.com"
```

## Submit your changes

Create a pull request on [rose-pine/rose-pine-site](https://github.com/rose-pine/rose-pine-site). We'll review and share our appreciation for making Rosé Pine a lil more accessible!
