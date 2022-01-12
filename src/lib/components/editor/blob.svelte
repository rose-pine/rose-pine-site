<script lang="ts">
	type Color =
		| 'base'
		| 'surface'
		| 'overlay'
		| 'muted'
		| 'subtle'
		| 'text'
		| 'love'
		| 'gold'
		| 'rose'
		| 'pine'
		| 'foam'
		| 'iris'
		| 'highlight-low'
		| 'highlight-med'
		| 'highlight-high'

	type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl'

	export let color: Color = 'subtle'
	export let size: Size = 'sm'

	const colorMap = {
		base: 'bg-base',
		surface: 'bg-surface',
		overlay: 'bg-overlay',
		muted: 'bg-muted',
		subtle: 'bg-subtle',
		text: 'bg-text',
		love: 'bg-love',
		gold: 'bg-gold',
		rose: 'bg-rose',
		pine: 'bg-pine',
		foam: 'bg-foam',
		iris: 'bg-iris',
		'highlight-low': 'bg-highlight-low',
		'highlight-med': 'bg-highlight-med',
		'highlight-high': 'bg-highlight-high',
	}

	const sizeMap = {
		xs: 'w-6',
		sm: 'w-8',
		md: 'w-10',
		lg: 'w-12',
		xl: 'w-14',
		'2xl': 'w-16',
		'3xl': 'w-20',
		'4xl': 'w-24',
		'5xl': 'w-28',
		'6xl': 'w-32',
	}
</script>

<div class="h-3.5 rounded-full shrink-0 {sizeMap[size]} {colorMap[color]}" />
