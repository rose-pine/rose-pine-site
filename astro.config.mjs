// @ts-check

import sitemap from "@astrojs/sitemap";
import svelte from "@astrojs/svelte";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import { readdirSync, writeFileSync } from "fs";

const LOCALES_DIR = new URL("src/locales/", import.meta.url);

/** Locale codes, derived from the files in src/locales/. */
function getLocaleCodes() {
	return readdirSync(LOCALES_DIR)
		.filter((f) => f.endsWith(".ts"))
		.map((f) => f.slice(0, -3));
}

/**
 * Vite plugin that generates a strict Locale type from the locales directory,
 * so adding a new locale file is all that's needed.
 */
function localeTypes() {
	function generate() {
		const type = getLocaleCodes()
			.map((f) => `"${f}"`)
			.join(" | ");
		writeFileSync(
			new URL("src/types/locale.gen.ts", import.meta.url),
			`// Auto-generated — do not edit\nexport type Locale = ${type};\n`,
		);
	}
	return {
		name: "locale-types",
		buildStart: generate,
	};
}

/** https://docs.netlify.com/configure-builds/environment-variables/#read-only-variables */
const NETLIFY_PREVIEW_SITE =
	process.env.CONTEXT !== "production" && process.env.DEPLOY_PRIME_URL;

// https://astro.build/config
export default defineConfig({
	site: NETLIFY_PREVIEW_SITE || "https://rosepinetheme.com",
	prefetch: true,
	integrations: [
		svelte(),
		sitemap({
			i18n: {
				defaultLocale: "en",
				locales: Object.fromEntries(
					getLocaleCodes().map((code) => [code, code]),
				),
			},
			filter: (page) => !new URL(page).pathname.startsWith("/en/"),
			namespaces: {
				news: false,
				image: false,
				video: false,
			},
		}),
	],
	image: {
		domains: ["avatars.githubusercontent.com", "raw.githubusercontent.com"],
		responsiveStyles: true,
	},
	vite: {
		plugins: [tailwindcss(), localeTypes()],
	},
	markdown: {
		shikiConfig: {
			themes: { dark: "rose-pine", light: "rose-pine-dawn" },
		},
	},
});
