const { fontFamily } = require('tailwindcss/defaultTheme')

module.exports = {
	content: ['./src/**/*.svelte', './src/**/*.html'],
	theme: {
		extend: {
			fontSize: {
				md: '15px',
			},
			fontFamily: {
				sans: ['Inter', ...fontFamily.sans],
				display: ['Pier Sans', 'Inter', ...fontFamily.sans],
			},
			colors: {
				base: 'var(--base)',
				surface: 'var(--surface)',
				overlay: 'var(--overlay)',
				muted: 'var(--muted)',
				subtle: 'var(--subtle)',
				text: 'var(--text)',
				love: 'var(--love)',
				gold: 'var(--gold)',
				rose: 'var(--rose)',
				pine: 'var(--pine)',
				foam: 'var(--foam)',
				iris: 'var(--iris)',
				highlight: {
					low: 'var(--highlight-low)',
					med: 'var(--highlight-med)',
					high: 'var(--highlight-high)',
				},
			},
			borderColor: (theme) => ({
				DEFAULT: theme('colors.highlight.low', 'currentColor'),
			}),
		},
	},
	plugins: [],
}
