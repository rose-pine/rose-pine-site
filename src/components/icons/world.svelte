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
	<path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
	<path d="M3.6 9h16.8" />
	<path d="M3.6 15h16.8" />
	<path d="M11.5 3a17 17 0 0 0 0 18" />
	<path d="M12.5 3a17 17 0 0 1 0 18" />
</svg>
