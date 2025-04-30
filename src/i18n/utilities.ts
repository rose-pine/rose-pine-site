import { type GetStaticPathsItem } from "astro";
import { ui, defaultLang, showDefaultLang, languages } from "./ui";

// Supported languages and `undefined` for the default language.
type Lang = keyof typeof languages | undefined;
type LangPath<T extends GetStaticPathsItem> = Omit<T, "params"> & {
	params: T["params"] & { lang: Lang };
};

/**
 * Generates localized static paths by combining entries with each language
 * variant. If no entries are provided, returns one path per language.
 */
export async function withLangPaths<T extends GetStaticPathsItem>(
	entries: T[] = [],
): Promise<LangPath<T>[]> {
	const langVariants = Object.keys(languages).map((lang) => ({
		lang: lang as Lang,
	}));

	if (!showDefaultLang) {
		langVariants.push({ lang: undefined });
	}

	if (entries.length === 0) {
		return langVariants.map((lang) => ({ params: lang }) as LangPath<T>);
	}

	const localizedPaths = langVariants.flatMap((variant) =>
		entries.map((entry) => ({
			...entry,
			params: {
				...entry.params,
				...variant,
			},
		})),
	);

	return localizedPaths;
}

export function getUrlWithoutLang(url: URL) {
	let [, lang] = url.pathname.split("/");
	if (lang in languages) {
		return url.pathname.replace(`/${lang}`, "");
	}
	return url.pathname;
}

export function getLangFromUrl(url: URL) {
	let [, lang] = url.pathname.split("/");
	if (lang in languages) {
		return lang as keyof typeof languages;
	}
	return defaultLang;
}

export function useTranslations(lang: keyof typeof ui) {
	return function t(key: keyof (typeof ui)[typeof defaultLang]) {
		return ui[lang][key] || ui[defaultLang][key];
	};
}

export function useTranslatedPath(lang: keyof typeof ui) {
	return function translatePath(path: string, currentLang: string = lang) {
		return !showDefaultLang && currentLang === defaultLang
			? path
			: `/${currentLang}${path}`;
	};
}
