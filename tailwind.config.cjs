const { fontFamily } = require('tailwindcss/defaultTheme')

module.exports = {
	content: ['./src/**/*.svelte', './src/**/*.html'],
	theme: {
		extend: {
			fontSize: {
				md: ['15px', '15px'],
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
			boxShadow: {
				DEFAULT: '0 10px 30px -20px rgba(87, 82, 121, 0.2)',
				lg: '0 10px 40px -15px rgba(87, 82, 121, 0.2)',
			},
			borderColor: (theme) => ({
				DEFAULT: theme('colors.highlight.low', 'currentColor'),
			}),
		},
	},
	plugins: [],
}
