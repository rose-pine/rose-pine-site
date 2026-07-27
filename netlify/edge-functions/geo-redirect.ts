import type { Context } from "@netlify/edge-functions";
import locales from "./locales.json" with { type: "json" };

const defaultLocale = "en";

export function detectPreferredLang(header: string): string {
	const entries = header
		.split(",")
		.map((part) => {
			const [lang, q] = part.split(";");
			return {
				lang: lang.trim(),
				quality: q ? parseFloat(q.split("=")[1]) : 1,
			};
		})
		.filter(({ quality }) => quality > 0)
		.filter(
			({ lang }) =>
				locales.includes(lang) || locales.includes(lang.split("-")[0]),
		)
		.sort((a, b) => b.quality - a.quality);

	if (entries.length === 0) {
		return "en";
	}

	const best = entries[0].lang;
	return locales.includes(best) ? best : best.split("-")[0];
}

function setLocaleCookie(context: Context, locale: string) {
	context.cookies.set({
		name: "locale",
		value: locale,
		path: "/",
		maxAge: 60 * 60 * 24 * 365,
		sameSite: "Lax",
	});
}

export default async (request: Request, context: Context) => {
	const url = new URL(request.url);
	const pathLocale = url.pathname.split("/")[1];
	const langParam = url.searchParams.get("lang");

	if (langParam && locales.includes(langParam)) {
		setLocaleCookie(context, langParam);
		const returnTo = url.searchParams.get("returnTo") || "/";
		const prefix = langParam === defaultLocale ? "" : `/${langParam}`;
		return Response.redirect(`${url.origin}${prefix}${returnTo}`, 302);
	}

	if (locales.includes(pathLocale)) {
		setLocaleCookie(context, pathLocale);
		return context.next();
	}

	const cookieLocale = context.cookies.get("locale");
	const locale =
		cookieLocale && locales.includes(cookieLocale)
			? cookieLocale
			: detectPreferredLang(request.headers.get("accept-language") ?? "");

	setLocaleCookie(context, locale);

	return locale === defaultLocale
		? context.next()
		: Response.redirect(`${url.origin}/${locale}${url.pathname}`, 302);
};

export const config = { path: "/" };
