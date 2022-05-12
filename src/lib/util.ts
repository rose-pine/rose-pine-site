import type { Color } from '@rose-pine/palette'
import { browser } from '$app/env'

export const toCamelCase = (phrase: string) => {
	return phrase
		.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) =>
			index == 0 ? word.toLowerCase() : word.toUpperCase()
		)
		.replace(/\s+/g, '')
}

export type ColorFormat = 'default' | 'unstyled'
export const formatColor = (color: Color, format: ColorFormat): Color => {
	if (format === 'unstyled') {
		return {
			hex: color.hex.replace('#', ''),
			rgb: color.rgb.replace('rgb(', '').replace(')', ''),
			hsl: color.hsl.replace('hsl(', '').replace(')', ''),
		}
	}

	return color
}

export const getSafeStorage = (key: string, safeValues: string[]): string => {
	if (!browser) return

	const value = localStorage.getItem(key)

	if (!safeValues.includes(value)) {
		localStorage.removeItem(key)
		return
	}

	return value
}

export const setSafeStorage = (key: string, value: string) => {
	if (!browser) return

	localStorage.setItem(key, value)
}
