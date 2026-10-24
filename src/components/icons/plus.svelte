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
		d="M12 20L12 4"
		stroke-width="2"
		stroke-linecap="round"
		stroke="currentColor"
	/>
	<path
		d="M20 12L4 12"
		stroke-width="2"
		stroke-linecap="round"
		stroke="currentColor"
	/>
</svg>
