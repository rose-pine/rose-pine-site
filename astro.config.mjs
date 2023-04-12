import { defineConfig } from "astro/config";
import svelte from "@astrojs/svelte";

export default defineConfig({
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
