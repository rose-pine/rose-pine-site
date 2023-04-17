import { defineConfig } from "astro/config";
import svelte from "@astrojs/svelte";

export default defineConfig({
	site: "https://rosepinetheme.com",
	markdown: {
		shikiConfig: {
			theme: "css-variables",
		},
	},
	integrations: [
		svelte({
			onwarn: (warning, handler) => {
				// Improve VoiceOver announcements with `role="list"` on lists
				// with `list-style: none`
				if (warning.code === "a11y-no-redundant-roles") return;
				handler(warning);
			},
		}),
	],
});
