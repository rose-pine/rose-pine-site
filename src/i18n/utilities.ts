import { type GetStaticPathsItem } from "astro";
import { defaultLang, languages, showDefaultLang, ui } from "./ui";

export type Lang = keyof typeof languages | undefined;
type LangPath<T extends GetStaticPathsItem> = Omit<T, "params"> & {
	params: T["params"] & { lang: Lang };
};
type Data = { [key: string]: any };

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

export function getUrlWithoutLang(url: URL = new URL(window.location.href)) {
	let [, lang] = url.pathname.split("/");
	if (lang in languages) {
		return url.pathname.replace(`/${lang}`, "");
	}
	return url.pathname;
}

export function getLangFromUrl(url: URL = new URL(window.location.href)) {
	let [, lang] = url.pathname.split("/");
	if (lang in languages) {
		return lang as keyof typeof languages;
	}
	return defaultLang;
}

export function useTranslations(lang: keyof typeof ui) {
	return function t(key: keyof (typeof ui)[typeof defaultLang], data?: Data) {
		let result: string = ui[lang][key] ?? ui[defaultLang][key];
		if (data) {
			Object.entries(data).forEach(([k, v]) => {
				result = result.replaceAll(`{{${k}}}`, v);
			});
		}
		return result;
	};
}

export function useTranslatedPath(lang: keyof typeof ui) {
	return function translatePath(path: string, currentLang: string = lang) {
		return !showDefaultLang && currentLang === defaultLang
			? path
			: `/${currentLang}${path}`;
	};
}
