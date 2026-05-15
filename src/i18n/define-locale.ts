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
