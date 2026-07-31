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
		d="M13 1C17.2647 1 19.397 1 20.866 2.13656C21.2441 2.42916 21.5827 2.77049 21.8728 3.15181C23 4.633 23 6.78311 23 11.0833L23 12.9167C23 17.2169 23 19.367 21.8728 20.8482C21.5827 21.2295 21.2441 21.5708 20.866 21.8634C19.397 23 17.2647 23 13 23C8.73532 23 6.60297 23 5.13403 21.8634C4.75585 21.5708 4.41735 21.2295 4.12716 20.8482C3 19.367 3 17.2169 3 12.9167L3 11.0833C3 6.78311 3 4.633 4.12716 3.15181C4.41735 2.77048 4.75585 2.42916 5.13403 2.13656C6.60298 0.999999 8.73532 0.999999 13 1Z"
		stroke="currentColor"
		stroke-width="2"
	/>
	<path
		d="M7 7H14"
		stroke="currentColor"
		stroke-width="2"
		stroke-linecap="round"
	/>
	<path
		d="M7 12H18"
		stroke="currentColor"
		stroke-width="2"
		stroke-linecap="round"
	/>
	<path
		d="M7 17H16"
		stroke="currentColor"
		stroke-width="2"
		stroke-linecap="round"
	/>
</svg>
