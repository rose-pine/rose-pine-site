import assert from "node:assert/strict";
import { test } from "node:test";
import { detectPreferredLang } from "../netlify/edge-functions/geo-redirect.ts";

const acceptLanguages = [
	// prefers "en-US", we provide "en"
	{ value: "en-US,en;q=0.9,zh-CN;q=0.8,zh;q=0.7", wants: "en" },
	// prefers "it" then "en"
	{ value: "it;q=0.9,en;q=0.8", wants: "it" },
	// prefers "fr", not in order of priority
	{ value: "fr;q=0.9,en;q=0.8", wants: "fr" },
	// prefers "fr" (fallback to any language)
	{ value: "fr;q=0.9,*;q=0.5", wants: "fr" },
	// prefers "sd" (unsupported), fallback to "nl"
	{ value: "sd;q=0.9,nl;q=0.8,zh-CN;q=0.7,zh;q=0.6", wants: "nl" },
	// prefers "es" then "pt" (no "q" defaults to 1)
	{ value: "pt;q=0.9,es", wants: "es" },
	// prefers "en", does NOT prefer "sv"
	{ value: "sv;q=0,en;q=0.9", wants: "en" },
	// does NOT prefer "sv", fallback to "en"
	{ value: "sv;q=0", wants: "en" },
	// prefers "ca" (poorly formatted)
	{ value: "ca;Q=0.7 , en;q=0.6", wants: "ca" },
];

test("detect preferred language from Accept-Language", (t) => {
	for (const { value, wants } of acceptLanguages) {
		t.test(value, () => assert.equal(detectPreferredLang(value), wants));
	}
});
