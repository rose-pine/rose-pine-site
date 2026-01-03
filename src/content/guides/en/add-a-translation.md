---
title: Add a translation
description: A walkthrough for internationalising the Rosé Pine website.
author: mvllow
publishedAt: 2025-11-09T12:00:00-06:00
updatedAt: 2025-11-09T12:00:00-06:00
---

Language is beautiful and we appreciate you sharing your language with others! Below, we'll go into translating different parts of the website and articles.

While not strictly necessary, having a local development environment will enable live previewing your changes. Alternatively, you may [make changes directly on GitHub](https://github.com/rose-pine/rose-pine-site).

## Setup your development environment

1. Fork and clone the [Rosé Pine website](https://github.com/rose-pine/rose-pine-site).
2. Install [Node.js](https://nodejs.org) and [pnpm](https://pnpm.io). The below snippet is copied from the Node.js download page and handles installing both Node.js and pnpm:

```bash
# Download and install nvm:
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash

# in lieu of restarting the shell
\. "$HOME/.nvm/nvm.sh"

# Download and install Node.js:
nvm install 24

# Verify the Node.js version:
node -v # Should print "v24.11.0".

# Download and install pnpm:
corepack enable pnpm

# Verify pnpm version:
pnpm -v
```

3. Start the dev server via `pnpm dev` for live previewing content.

## Translate the website

Edit `src/i18n/ui.ts` to include your language:

```diff
  export const languages = {
    en: "English",
+   sd: "Sindarin",
  }
```

In the same file, add your translations:

```diff
  export const ui = {
    en: {
      "shared.all": "All",
      "shared.language": "Language",
      ...
    },
+   sd: {
+     "shared.all": "Pân",
+     "shared.language": "Lamb",
+   },
  }
```

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
// src/content/authors/<username>.json
+ {
+   "name": "<name>",
+   "url": "https://example.com",
+   "avatarUrl": "https://avatars.githubusercontent.com/<username>"
+ }
```

## Submit your changes

Create a pull request on [rose-pine/rose-pine-site](https://github.com/rose-pine/rose-pine-site). We'll review and share our appreciate for making Rosé Pine a lil more accessible!
