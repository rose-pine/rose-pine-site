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
	aria-label="book"
>
	<path stroke="none" d="M0 0h24v24H0z" fill="none" />
	<path
		d="M6 4h11a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-11a1 1 0 0 1 -1 -1v-14a1 1 0 0 1 1 -1m3 0v18"
	/>
	<line x1="13" y1="8" x2="15" y2="8" />
	<line x1="13" y1="12" x2="15" y2="12" />
</svg>
