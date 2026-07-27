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
		d="M6.34314 17.6568L17.6568 6.34312"
		stroke="currentColor"
		stroke-width="2"
		stroke-linecap="round"
	/>
	<path
		d="M17.6569 17.6568L6.34315 6.34312"
		stroke="currentColor"
		stroke-width="2"
		stroke-linecap="round"
	/>
</svg>
