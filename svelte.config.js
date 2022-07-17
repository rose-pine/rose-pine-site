import adapter from '@sveltejs/adapter-netlify'
import preprocess from 'svelte-preprocess'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: preprocess({ postcss: true }),

	kit: {
		adapter: adapter(),
		prerender: {
			default: true,
		},
	},
}

export default config
