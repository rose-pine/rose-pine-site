import en from "./locales/en";

type Translations = typeof en;

const modules = import.meta.glob<{
	default: Partial<Translations>;
	displayName: string;
}>("./locales/*.ts", { eager: true });

function langFromPath(path: string) {
	return path.split("/").pop()!.replace(".ts", "");
}

export const languages = Object.fromEntries(
	Object.entries(modules).map(([path, mod]) => [
		langFromPath(path),
		mod.displayName,
	]),
) as Record<string, string>;

export const ui = Object.fromEntries(
	Object.entries(modules).map(([path, mod]) => [
		langFromPath(path),
		mod.default,
	]),
) as Record<string, Partial<Translations>>;

export const defaultLang = "en";
export const showDefaultLang = false;

if (!ui[defaultLang]) {
	throw new Error(
		`Default locale "${defaultLang}" not found. Make sure src/i18n/locales/${defaultLang}.ts exists.`,
	);
}
