# Contributing

Start by forking ([how to
fork](https://docs.github.com/en/get-started/quickstart/fork-a-repo)) and
cloning the Rosé Pine site repository

```sh
git clone https://github.com/<your-username>/rose-pine-site

# Or, if using ssh
git clone git@github.com:<your-username>/rose-pine-site
```

Create a new feature branch

```sh
git checkout -b add-something-beautiful
```

Install dependencies with [pnpm](https://pnpm.io) and start the local
development server

> Note: We recommend viewing the site in English for accurate hot reloading
> during development. Locale pages (located in `src/pages/<locale>`) are
> generated during build and should not be directly modified. When previewing
> other languages locally, run `pnpm build:i18n` between changes to see the
> latest updates.

```sh
pnpm install
pnpm dev
```

After adding your feature, build the site and ensure nothing breaks

```sh
pnpm build
```

Finally, pull request the [Rosé Pine site
repository](https://github.com/rose-pine/rose-pine-site) with your lovely
creation.
