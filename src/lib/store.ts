import { readable, writable } from 'svelte/store'
import { browser } from '$app/env'
import { getSafeStorage, setSafeStorage } from '$lib/util'

export const languages = readable({
	en: 'English',
	fr: 'Français',
	it: 'Italiano',
	de: 'Deutsch',
	nl: 'Nederlands',
	es: 'Español',
	ca: 'Català',
	se: 'Svenska',
})

export type ColorFormat = 'modern' | 'legacy'
export const colorSettings = createColorSettings()

function createColorSettings() {
	interface ColorSettings {
		format: boolean
		decorators: boolean
	}

	const { subscribe, set } = writable<ColorSettings>({
		format: getSafeStorage('color-format', ['modern', 'legacy']) === 'modern',
		decorators: getSafeStorage('color-decorators', ['show', 'hide']) === 'show',
	})

	return {
		subscribe,
		set: ({ format, decorators }: ColorSettings) => {
			setSafeStorage('color-format', format ? 'modern' : 'legacy')
			setSafeStorage('color-decorators', decorators ? 'show' : 'hide')

			set({ format, decorators })
		},
		get: () => {
			const format = getSafeStorage('color-format', ['modern', 'legacy'])
			const decorators = getSafeStorage('color-decorators', ['show', 'hide'])

			return {
				format: format === 'modern',
				decorators: decorators === 'show',
			}
		},
	}
}

export const searchIsOpen = writable(false)

function createClipboard() {
	const { subscribe, set } = writable({ value: '', pos: '' })
	let timeout: any = setTimeout

	return {
		subscribe,
		copy: (value: string, pos = '') => {
			if (browser) {
				navigator.clipboard.writeText(value).then(() => set({ value, pos }))

				clearTimeout(timeout)
				timeout = setTimeout(() => {
					set({ value: '', pos: '' })
				}, 600)
			}
		},
	}
}

export const clipboard = createClipboard()
