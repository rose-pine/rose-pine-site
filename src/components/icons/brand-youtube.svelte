<script lang="ts">
	export let size = 24;
	export let stroke = 2;
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	width={size}
	height={size}
	viewBox="0 0 24 24"
	stroke-width={stroke}
	stroke="currentColor"
	fill="none"
	stroke-linecap="round"
	stroke-linejoin="round"
	{...$$restProps}
>
	<path stroke="none" d="M0 0h24v24H0z" fill="none" />
	<path
		d="M3 5m0 4a4 4 0 0 1 4 -4h10a4 4 0 0 1 4 4v6a4 4 0 0 1 -4 4h-10a4 4 0 0 1 -4 -4z"
	/>
	<path d="M10 9l5 3l-5 3z" />
</svg>
