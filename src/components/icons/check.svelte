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
	<path d="M5 12l5 5l10 -10" />
</svg>
