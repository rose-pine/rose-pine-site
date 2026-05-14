import { type GetStaticPathsItem } from "astro";
import { defaultLocale, languages, showDefaultLocale, ui } from "./ui";

export type Locale = keyof typeof languages;
export type LocaleParam = Locale | undefined;
type LocalePath<T extends GetStaticPathsItem> = Omit<T, "params"> & {
	params: T["params"] & { locale: LocaleParam };
};
type Data = { [key: string]: any };

/**
 * Generates localized static paths by combining entries with each locale
 * variant. If no entries are provided, returns one path per locale.
 */
export async function withLocalePaths<T extends GetStaticPathsItem>(
	entries: T[] = [],
): Promise<LocalePath<T>[]> {
	const locales = Object.keys(languages);
	const variants: { locale: LocaleParam }[] = locales.map((locale) => ({
		locale: locale as Locale,
	}));

	if (!showDefaultLocale) {
		variants.push({ locale: undefined });
	}

	if (entries.length === 0) {
		return variants.map((variant) => ({ params: variant }) as LocalePath<T>);
	}

	return variants.flatMap((variant) =>
		entries.map((entry) => ({
			...entry,
			params: {
				...entry.params,
				...variant,
			},
		})),
	);
}

export function getUrlWithoutLocale(url: URL = new URL(window.location.href)) {
	let [, locale] = url.pathname.split("/");
	if (locale in languages) {
		return url.pathname.replace(`/${locale}`, "");
	}
	return url.pathname;
}

export function getLocaleFromUrl(url: URL = new URL(window.location.href)) {
	let [, locale] = url.pathname.split("/");
	if (locale in languages) {
		return locale as Locale;
	}
	return defaultLocale;
}

export function useTranslations(locale: Locale) {
	return function t(key: keyof (typeof ui)[typeof defaultLocale], data?: Data) {
		const value = ui[locale][key] ?? ui[defaultLocale][key] ?? "";
		if (!data) {
			return value;
		}
		return Object.entries(data).reduce(
			(result, [k, v]) => result.replaceAll(`{{${k}}}`, v),
			value,
		);
	};
}

export function useTranslatedPath(locale: Locale) {
	return function translatePath(path: string, currentLocale = locale) {
		return !showDefaultLocale && currentLocale === defaultLocale
			? path
			: `/${currentLocale}${path}`;
	};
}
