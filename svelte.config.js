import adapter from '@sveltejs/adapter-static'
import preprocess from 'svelte-preprocess'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: preprocess(),

	kit: {
		adapter: adapter(),
		vite: {
			ssr: {
				noExternal: ['has-match', '@rose-pine/palette'],
			},
		},
	},
}

export default config
