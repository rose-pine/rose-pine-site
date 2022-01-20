import adapter from '@sveltejs/adapter-auto'
import preprocess from 'svelte-preprocess'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: preprocess(),

	kit: {
		adapter: adapter(),
		target: '#svelte',
		vite: {
			ssr: {
				noExternal: ['has-match', '@rose-pine/palette'],
			},
		},
	},
}

export default config
