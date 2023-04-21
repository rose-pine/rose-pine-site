import { defineConfig } from "astro/config";
import astroI18next from "astro-i18next";
import svelte from "@astrojs/svelte";
import react from "@astrojs/react";

export default defineConfig({
	site: "https://rosepinetheme.com",
	markdown: {
		shikiConfig: {
			theme: "css-variables",
		},
	},
	integrations: [
		astroI18next(),
		svelte({
			onwarn: (warning, handler) => {
				// Improve VoiceOver announcements with `role="list"` on lists
				// with `list-style: none`
				if (warning.code === "a11y-no-redundant-roles") return;
				handler(warning);
			},
		}),
		react(),
	],
});
