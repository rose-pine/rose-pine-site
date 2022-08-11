import { readable, writable } from 'svelte/store'
import { browser } from '$app/env'
import { getSafeStorage, setSafeStorage } from '$lib/util'

export const languages = readable({
	en: 'English',
	fr: 'Français',
	it: 'Italiano',
	de: 'Deutsch',
	nl: 'Nederlands',
})

export type ColorFormat = 'modern' | 'legacy'
export const colorSettings = createColorSettings()

function createColorSettings() {
	interface ColorSettings {
		format: ColorFormat
		showDecorators: boolean
	}

	const { subscribe, set } = writable<ColorSettings>({
		format: getSafeStorage('color-format', ['modern', 'legacy']),
		showDecorators:
			getSafeStorage('color-decorators', ['show', 'hide']) === 'show',
	})

	return {
		subscribe,
		set: ({ format, showDecorators }: ColorSettings) => {
			setSafeStorage('color-format', format)
			setSafeStorage('color-decorators', showDecorators ? 'show' : 'hide')
			set({ format, showDecorators })
		},
		get: () => {
			const format = getSafeStorage('color-format', ['modern', 'legacy'])
			const decorators = getSafeStorage('color-decorators', ['show', 'hide'])

			return { format, showDecorators: decorators === 'show' }
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
