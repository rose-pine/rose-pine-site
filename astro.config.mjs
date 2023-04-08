import { defineConfig } from "astro/config";
import svelte from "@astrojs/svelte";

export default defineConfig({
	integrations: [
		svelte({
			onwarn: (warning, handler) => {
				if (warning.code === "a11y-no-redundant-roles") return;
				handler(warning);
			},
		}),
	],
});
