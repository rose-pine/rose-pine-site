import en from "./locales/en";

type Translations = typeof en;

const modules = import.meta.glob<{
	default: Partial<Translations>;
	displayName: string;
}>("./locales/*.ts", { eager: true });

function localeFromPath(path: string) {
	return path.split("/").pop()!.replace(".ts", "");
}

export const languages = Object.fromEntries(
	Object.entries(modules).map(([path, mod]) => [
		localeFromPath(path),
		mod.displayName,
	]),
) as Record<string, string>;

export const ui = Object.fromEntries(
	Object.entries(modules).map(([path, mod]) => [
		localeFromPath(path),
		mod.default,
	]),
) as Record<string, Partial<Translations>>;

export const defaultLocale = "en";
export const showDefaultLocale = false;

if (!ui[defaultLocale]) {
	throw new Error(
		`Default locale "${defaultLocale}" not found. Make sure src/i18n/locales/${defaultLocale}.ts exists.`,
	);
}
