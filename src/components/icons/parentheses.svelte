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
	<path d="M7 4a12.25 12.25 0 0 0 0 16" />
	<path d="M17 4a12.25 12.25 0 0 1 0 16" />
</svg>
