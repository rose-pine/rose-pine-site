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
		d="M19.0136 17.7143L18.364 5.63603L6.28571 4.98636M18.364 5.63603L5.63603 18.364"
		stroke="currentColor"
		stroke-width="2"
		stroke-linecap="round"
		stroke-linejoin="round"
	/>
</svg>
