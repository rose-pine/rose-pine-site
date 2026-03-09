// @ts-check

import netlify from "@astrojs/netlify";
import svelte from "@astrojs/svelte";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

/* https://docs.netlify.com/configure-builds/environment-variables/#read-only-variables */
const NETLIFY_PREVIEW_SITE =
	process.env.CONTEXT !== "production" && process.env.DEPLOY_PRIME_URL;

// https://astro.build/config
export default defineConfig({
	site: NETLIFY_PREVIEW_SITE || "https://rosepinetheme.com",
	prefetch: true,
	integrations: [svelte()],
	image: {
		domains: ["avatars.githubusercontent.com", "raw.githubusercontent.com"],
		responsiveStyles: true,
	},
	vite: {
		plugins: [tailwindcss()],
	},
	markdown: {
		shikiConfig: {
			themes: { dark: "rose-pine", light: "rose-pine-dawn" },
		},
	},
	// use netlify adapter to translate redirects to the proper _redirects format
	// https://docs.astro.build/en/guides/integrations-guide/netlify/#static-sites-with-the-netlify-adapter
	adapter: netlify({ imageCDN: false }),
	redirects: {
		"/[...lang]/palette/ingredients": "/[...lang]/palette",
		"/[...lang]/resources": "/[...lang]/create",
		"/[...lang]/resources/[...slug]": "/[...lang]/create/[...slug]",
	},
});
