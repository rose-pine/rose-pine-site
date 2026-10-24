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
		d="M23 23L17.3137 17.3137"
		stroke-width="2"
		stroke-linecap="round"
		stroke="currentColor"
	/>
	<circle cx="10.5" cy="10.5" r="9.5" stroke="currentColor" stroke-width="2" />
</svg>
