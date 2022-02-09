import { writable } from 'svelte/store'
import { browser } from '$app/env'

function copy() {
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

export const clipboard = copy()
