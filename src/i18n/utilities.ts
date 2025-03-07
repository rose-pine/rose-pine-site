import { ui, defaultLang, showDefaultLang, languages } from "./ui";

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
