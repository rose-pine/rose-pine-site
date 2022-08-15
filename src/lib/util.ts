import type { Color } from '@rose-pine/palette'
import { browser } from '$app/env'

export const toCamelCase = (phrase: string) => {
	return phrase
		.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) =>
			index == 0 ? word.toLowerCase() : word.toUpperCase()
		)
		.replace(/\s+/g, '')
}

export function getSafeStorage<T extends string>(
	key: string,
	safeValues: T[]
): T {
	if (!browser) return safeValues[0]

	const value = localStorage.getItem(key) ?? safeValues[0]

	if (!safeValues.includes(value)) {
		localStorage.removeItem(key)
		return safeValues[0]
	}

	return value
}

export const setSafeStorage = (key: string, value: string) => {
	if (!browser) return

	localStorage.setItem(key, value)
}

export const formatColor = (
	color: Color,
	format: boolean,
	decorators: boolean
): Color => {
	let { hex, rgb, hsl } = { ...color }

	if (!decorators) {
		hex = hex.replace('#', '')
		rgb = rgb.replace('rgb(', '').replace(')', '')
		hsl = hsl.replace('hsl(', '').replace(')', '')
	}

	if (format) {
		return {
			hex,
			rgb: rgb.replaceAll(',', ''),
			hsl: hsl
				.replaceAll(',', '')
				.split(' ')
				.map((v, i) => (i === 0 ? `${v}deg` : v))
				.join(' '),
		}
	}

	return { hex, rgb, hsl }
}
