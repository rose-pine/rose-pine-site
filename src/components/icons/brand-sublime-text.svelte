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
	<path d="M19 8l-14 4.5v-5.5l14 -4.5z" />
	<path d="M19 17l-14 4.5v-5.5l14 -4.5z" />
	<path d="M19 11.5l-14 -4.5" />
	<path d="M5 12.5l14 4.5" />
</svg>
