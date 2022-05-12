import { readable, writable } from 'svelte/store'
import { browser } from '$app/env'

export const languages = readable({
	en: 'English',
	fr: 'Français',
	it: 'Italiano',
	de: 'Deutsch',
	nl: 'Nederlands',
})

export const commandMenuIsOpen = writable(false)

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
