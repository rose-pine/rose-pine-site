const { fontFamily } = require('tailwindcss/defaultTheme')

module.exports = {
	content: ['./src/**/*.{html,svelte,js,ts}'],
	theme: {
		extend: {
			spacing: {
				'page-top': 'var(--page-top)',
				'page-gutter': 'var(--page-gutter)',
				'header-height': 'var(--header-height)',
				'footer-height': 'var(--footer-height)',
			},
			maxWidth: {
				content: 'var(--content-width)',
			},
			minHeight: {
				content: 'var(--content-height)',
			},
			fontFamily: {
				display: ['"Pier Sans"', ...fontFamily.sans],
			},
			colors: {
				base: 'hsl(var(--color-base) / <alpha-value>)',
				surface: 'hsl(var(--color-surface) / <alpha-value>)',
				overlay: 'hsl(var(--color-overlay) / <alpha-value>)',
				muted: 'hsl(var(--color-muted) / <alpha-value>)',
				subtle: 'hsl(var(--color-subtle) / <alpha-value>)',
				text: 'hsl(var(--color-text) / <alpha-value>)',
				love: 'hsl(var(--color-love) / <alpha-value>)',
				gold: 'hsl(var(--color-gold) / <alpha-value>)',
				rose: 'hsl(var(--color-rose) / <alpha-value>)',
				pine: 'hsl(var(--color-pine) / <alpha-value>)',
				foam: 'hsl(var(--color-foam) / <alpha-value>)',
				iris: 'hsl(var(--color-iris) / <alpha-value>)',
			},
			borderColor: {
				DEFAULT: 'hsl(var(--color-muted) / 0.2)',
			},
			ringColor: {
				DEFAULT: 'hsl(var(--color-muted) / 0.3)',
			},
			boxShadow: {
				DEFAULT: '0 10px 30px -20px rgba(87, 82, 121, 0.2)',
				lg: '0 10px 40px -15px rgba(87, 82, 121, 0.2)',
			},
		},
	},
	plugins: [],
}
