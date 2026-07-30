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
	<circle cx="12" cy="12" r="11" stroke="currentColor" stroke-width="2" />
	<circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" />
	<circle cx="15.5" cy="8.5" r="1.5" fill="currentColor" />
	<path
		d="M17 13C17 13 16.3082 14.1152 15 14C13.6918 13.8848 13.3119 12 12 12C10.6881 12 10.3082 13.8848 9 14C7.69183 14.1152 7 13 7 13"
		stroke="currentColor"
		stroke-width="2"
		stroke-linecap="round"
	/>
</svg>
