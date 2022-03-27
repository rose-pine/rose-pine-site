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
	aria-label="sun"
>
	<path stroke="none" d="M0 0h24v24H0z" fill="none" />
	<path d="M4 5h7" />
	<path d="M9 3v2c0 4.418 -2.239 8 -5 8" />
	<path d="M5 9c-.003 2.144 2.952 3.908 6.7 4" />
	<path d="M12 20l4 -9l4 9" />
	<path d="M19.1 18h-6.2" />
</svg>
