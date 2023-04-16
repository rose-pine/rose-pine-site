---
title: Add a translation
description: Contributing guide for translators.
priority: 98
---

## Setup your development environment

> Feel free to make any changes directly on GitHub

1. Fork and clone the [Rosé Pine website](https://github.com/rose-pine/rose-pine-site).
2. Install [node](https://nodejs.org) and [pnpm](https://pnpm.io/installation).
3. While inside the website's directory, install dependencies and start the
   local development server:
   ```sh
   pnpm install && pnpm dev
   ```
4. Navigate to [http://localhost:3000](http://localhost:3000) to see real-time
   updates.

### Translate documentation

1. Create a new page inside of `src/content/{locale}/`
2. Reference the English equivalent page, or another locale you are
   comfortable with, e.g. `src/content/en/create-a-theme.md`

### Translate page snippets

1. Create a new locale file inside of `src/locales/{locale}.json`
2. Reference the English equivalent schema, or another locale you are
   comfortable with, e.g. `src/locales/en.json`
