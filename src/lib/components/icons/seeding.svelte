<script>
	export let color = undefined
	export let size = 15
	export let width = undefined
	export let height = undefined
</script>

<svg
	{color}
	width={width ?? size}
	height={height ?? size}
	viewBox="0 0 24 24"
	stroke-width="1.5"
	stroke="currentColor"
	fill="none"
	stroke-linecap="round"
	stroke-linejoin="round"
	aria-label="seeding"
>
	<path stroke="none" d="M0 0h24v24H0z" fill="none" />
	<path d="M12 10a6 6 0 0 0 -6 -6h-3v2a6 6 0 0 0 6 6h3" />
	<path d="M12 14a6 6 0 0 1 6 -6h3v1a6 6 0 0 1 -6 6h-3" />
	<line x1="12" y1="20" x2="12" y2="10" />
</svg>
