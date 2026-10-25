import { type GetStaticPathsItem } from "astro";
import en from "../locales/en";
import type { Locale } from "../types/locale.gen";
import { objectKeys } from "./object";

export type LocaleConfig = {
	name: string;
	dir?: "ltr" | "rtl";
};

export function defineLocale<T extends Record<string, string>>(options: {
	config: LocaleConfig;
	translations: T;
}) {
	return options;
}

export type Translations = (typeof en)["translations"];

const modules = import.meta.glob<{
	default: { config: LocaleConfig; translations: Partial<Translations> };
}>("../locales/*.ts", { eager: true });

function localeFromPath(path: string) {
	return path.split("/").pop()!.slice(0, -3);
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
	Locale,
	{ name: string; dir: "ltr" | "rtl"; translations: Partial<Translations> }
>;

export const buildDisplayNames = (locale: Locale) =>
	new Intl.DisplayNames([locale, "en"], {
		type: "language",
	});

export const defaultLocale = "en" as const;
export const showDefaultLocale = true;

if (!languages[defaultLocale]) {
	throw new Error(
		`Default locale "${defaultLocale}" not found. Make sure src/locales/${defaultLocale}.ts exists.`,
	);
}

export type LocaleParam = Locale | undefined;
type LocalePath<T extends GetStaticPathsItem> = Omit<T, "params"> & {
	params: T["params"] & { locale: LocaleParam };
};

/**
 * Generates localised static paths by combining entries with each locale
 * variant. If no entries are provided, returns one path per locale.
 *
 * Pass a function instead of an array when the entries differ per locale.
 */
export async function withLocalePaths<T extends GetStaticPathsItem>(
	entries: T[] | ((locale: LocaleParam) => T | T[]) = [],
): Promise<LocalePath<T>[]> {
	const locales: LocaleParam[] = objectKeys(languages);

	// Always use the default language for un-prefixed paths.
	locales.push(undefined);

	const withLocale = (locale: LocaleParam, entry: T): LocalePath<T> => ({
		...entry,
		params: {
			...entry.params,
			locale,
		},
	});

	if (typeof entries === "function") {
		return locales.flatMap((locale) => {
			const entry = entries(locale);
			const list = Array.isArray(entry) ? entry : [entry];
			return list.map((item) => withLocale(locale, item));
		});
	}

	if (entries.length === 0) {
		return locales.map((locale) => ({ params: { locale } }) as LocalePath<T>);
	}

	return locales.flatMap((locale) =>
		entries.map((entry) => withLocale(locale, entry)),
	);
}

export function isLocale(value: string): value is Locale {
	return value in languages;
}

export function parseLocalisedId(id: string) {
	const [locale, ...slugParts] = id.split("/");

	return {
		locale: isLocale(locale) ? locale : defaultLocale,
		slug: slugParts.join("/"),
	};
}

export function getUrlWithoutLocale(url: URL = new URL(window.location.href)) {
	let [, locale] = url.pathname.split("/");
	if (isLocale(locale)) {
		return url.pathname.replace(`/${locale}`, "");
	}
	return url.pathname;
}

export function getLocaleFromUrl(url: URL = new URL(window.location.href)) {
	let [, locale] = url.pathname.split("/");
	if (isLocale(locale)) {
		return locale;
	}
	return defaultLocale;
}

export function useTranslations(locale: Locale) {
	return function t(key: keyof Translations, data?: Record<string, string>) {
		const value =
			languages[locale].translations[key] ??
			languages[defaultLocale].translations[key] ??
			"";
		if (!data) {
			return value;
		}
		return Object.entries(data).reduce(
			(result, [k, v]) => result.replaceAll(`{{${k}}}`, v),
			value,
		);
	};
}

export function formatDate(
	date: string | Date | null | undefined,
	locale: Locale,
) {
	if (!date) return null;
	return new Date(date).toLocaleDateString([locale, "en"], {
		year: "numeric",
		month: "long",
		day: "numeric",
	});
}

export function useTranslatedPath(locale: Locale) {
	return function translatePath(path: string, currentLocale = locale) {
		return !showDefaultLocale && currentLocale === defaultLocale
			? path
			: `/${currentLocale}${path}`;
	};
}
