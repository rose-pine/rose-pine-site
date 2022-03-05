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
	aria-label="boat"
>
	<path stroke="none" d="M0 0h24v24H0z" fill="none" />
	<path
		d="M2 20a2.4 2.4 0 0 0 2 1a2.4 2.4 0 0 0 2 -1a2.4 2.4 0 0 1 2 -1a2.4 2.4 0 0 1 2 1a2.4 2.4 0 0 0 2 1a2.4 2.4 0 0 0 2 -1a2.4 2.4 0 0 1 2 -1a2.4 2.4 0 0 1 2 1a2.4 2.4 0 0 0 2 1a2.4 2.4 0 0 0 2 -1"
	/>
	<path d="M4 18l-1 -3h18l-1 3" />
	<path d="M11 12h7l-7 -9v9" />
	<line x1="8" y1="7" x2="6" y2="12" />
</svg>
