/**
 * Improved built-in types.
 * Inspired by https://github.com/sindresorhus/ts-extras
 */

export type ObjectEntries<T extends object> = Array<
	{ [K in keyof T]-?: [ObjectKeys<Pick<T, K>>, T[K]] }[keyof T]
>;

export type ObjectKeys<T extends object> = `${Exclude<keyof T, symbol>}`;

export const objectEntries = Object.entries as <T extends object>(
	value: T,
) => ObjectEntries<T>;

export const objectFromEntries = Object.fromEntries as <
	Entries extends ReadonlyArray<readonly [PropertyKey, unknown]>,
>(
	values: Entries,
) => number extends Entries["length"]
	? { [T in Entries[number] as T[0]]?: T[1] }
	: { [T in Entries[number] as T[0]]: T[1] };

export const objectKeys = Object.keys as <T extends object>(
	value: T,
) => Array<ObjectKeys<T>>;
