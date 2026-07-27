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
		d="M8 20L14.4238 12.6585C14.7537 12.2815 14.7537 11.7185 14.4238 11.3415L8 4"
		stroke="currentColor"
		stroke-width="2"
		stroke-linecap="round"
	/>
</svg>
