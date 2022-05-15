const { fontFamily } = require('tailwindcss/defaultTheme')

module.exports = {
	content: ['./src/**/*.svelte', './src/**/*.html'],
	theme: {
		extend: {
			maxWidth: {
				content: '72rem',
			},
			fontSize: {
				md: '15px',
			},
			fontFamily: {
				sans: ['Inter var', 'Inter', ...fontFamily.sans],
				display: ['"Pier Sans"', 'Inter var', 'Inter', ...fontFamily.sans],
			},
			colors: {
				base: 'var(--base)',
				surface: 'var(--surface)',
				overlay: 'var(--overlay)',
				muted: 'var(--muted)',
				subtle: 'var(--subtle)',
				text: 'var(--text)',
				love: {
					DEFAULT: 'var(--love)',
					low: 'var(--love-low)',
					med: 'var(--love-med)',
					high: 'var(--love-high)',
				},
				gold: {
					DEFAULT: 'var(--gold)',
					low: 'var(--gold-low)',
					med: 'var(--gold-med)',
					high: 'var(--gold-high)',
				},
				rose: {
					DEFAULT: 'var(--rose)',
					low: 'var(--rose-low)',
					med: 'var(--rose-med)',
					high: 'var(--rose-high)',
				},
				pine: {
					DEFAULT: 'var(--pine)',
					low: 'var(--pine-low)',
					med: 'var(--pine-med)',
					high: 'var(--pine-high)',
				},
				foam: {
					DEFAULT: 'var(--foam)',
					low: 'var(--foam-low)',
					med: 'var(--foam-med)',
					high: 'var(--foam-high)',
				},
				iris: {
					DEFAULT: 'var(--iris)',
					low: 'var(--iris-low)',
					med: 'var(--iris-med)',
					high: 'var(--iris-high)',
				},
				highlight: {
					low: 'var(--highlight-low)',
					'low-blend': 'var(--highlight-low-blend)',
					med: 'var(--highlight-med)',
					'med-blend': 'var(--highlight-med-blend)',
					high: 'var(--highlight-high)',
					'high-blend': 'var(--highlight-high-blend)',
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
