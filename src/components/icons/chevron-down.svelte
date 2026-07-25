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
		d="M4.6985 9L10.435 14.7365C11.2161 15.5176 12.4824 15.5176 13.2635 14.7365L19 9"
		stroke="currentColor"
		stroke-width="2"
		stroke-linecap="round"
	/>
</svg>
