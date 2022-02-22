import { browser } from '$app/env'

function getSafeStorage(key: string, safeValues: string[]): string {
	if (!browser) return

	const value = localStorage.getItem(key)

	if (!safeValues.includes(value)) {
		localStorage.removeItem(key)
		return
	}

	return value
}

function setSafeStorage(key: string, value: string) {
	if (!browser) return

	localStorage.setItem(key, value)
}

export { getSafeStorage, setSafeStorage }
