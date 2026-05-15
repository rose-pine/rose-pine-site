import en from "./locales/en";
import type { LocaleConfig } from "./define-locale";

export type Translations = (typeof en)["translations"];

const modules = import.meta.glob<{
	default: { config: LocaleConfig; translations: Partial<Translations> };
}>("./locales/*.ts", { eager: true });

function localeFromPath(path: string) {
	return path.split("/").pop()!.replace(".ts", "");
}

export const languages = Object.fromEntries(
	Object.entries(modules).map(([path, mod]) => [
		localeFromPath(path),
		{
			...mod.default.config,
			dir: mod.default.config.dir ?? "ltr",
			translations: mod.default.translations,
		},
	]),
) as Record<
	string,
	{ name: string; dir: "ltr" | "rtl"; translations: Partial<Translations> }
>;

export const defaultLocale = "en";
export const showDefaultLocale = false;

if (!languages[defaultLocale]) {
	throw new Error(
		`Default locale "${defaultLocale}" not found. Make sure src/i18n/locales/${defaultLocale}.ts exists.`,
	);
}
