// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import svelte from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
	vite: {
		plugins: [tailwindcss()],
	},

	image: {
		domains: ["avatars.githubusercontent.com", "raw.githubusercontent.com"],
		responsiveStyles: true,
	},

	integrations: [svelte()],

	markdown: {
		shikiConfig: {
			themes: { dark: "rose-pine", light: "rose-pine-dawn" },
		},
	},

	redirects: {
		"/[...lang]/palette/ingredients": "/[...lang]/palette",
		"/[...lang]/resources": "/[...lang]/create",
		"/[...lang]/resources/[...slug]": "/[...lang]/create/[...slug]",
	},
});
