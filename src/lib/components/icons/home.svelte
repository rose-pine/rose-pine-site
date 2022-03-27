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
	aria-label="home"
>
	<path stroke="none" d="M0 0h24v24H0z" fill="none" />
	<polyline points="5 12 3 12 12 3 21 12 19 12" />
	<path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />
	<path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" />
</svg>
