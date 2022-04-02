import fs from 'node:fs'
import path from 'node:path'
import test from 'ava'

const LOCALES_PATH = path.join(process.cwd(), 'src/lib/locales/')

const removeValues = (obj) => {
	for (const k in obj) {
		if (typeof obj[k] === 'object' && obj[k] !== null) {
			removeValues(obj[k])
		} else {
			// Clear values so we can test if all keys match
			obj[k] = ''
		}
	}
	return obj
}

const hasTranslations = test.macro({
	exec(t, input, expected) {
		const localePath = (value) =>
			`${path.join(process.cwd(), 'src/lib/locales')}/${value}.json`
		const localeFile = (value) =>
			JSON.parse(fs.readFileSync(localePath(value), 'utf8'))

		const preparedInput = removeValues(localeFile(input))
		const preparedExpected = removeValues(localeFile(expected))

		t.deepEqual(preparedInput, preparedExpected)
	},
	title(providedTitle = '', input, expected) {
		return `${providedTitle} ${input} matches ${expected}`.trim()
	},
})

test(hasTranslations, 'fr', 'en')
test(hasTranslations, 'it', 'en')
test(hasTranslations, 'de', 'en')
