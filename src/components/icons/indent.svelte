<script lang="ts">
	import type { IconProps } from "../../types/icon";

	let { size = 24, ...restProps }: IconProps = $props();
</script>

<svg
	aria-hidden="true"
	width={size}
	height={size}
	viewBox="0 0 24 24"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
	{...restProps}
>
	<path
		d="M3 19L3 12"
		stroke="currentColor"
		stroke-width="2"
		stroke-linecap="round"
	/>
	<path
		d="M8 12L21 12"
		stroke="currentColor"
		stroke-width="2"
		stroke-linecap="round"
	/>
	<path
		d="M8 19H21"
		stroke="currentColor"
		stroke-width="2"
		stroke-linecap="round"
	/>
	<path
		d="M17 5L3 5"
		stroke="currentColor"
		stroke-width="2"
		stroke-linecap="round"
	/>
</svg>
