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
		d="M12 1C16.2647 1 18.397 1 19.866 2.13656C20.2441 2.42916 20.5827 2.77049 20.8728 3.15181C22 4.633 22 6.78311 22 11.0833L22 12.9167C22 17.2169 22 19.367 20.8728 20.8482C20.5827 21.2295 20.2441 21.5708 19.866 21.8634C18.397 23 16.2647 23 12 23C7.73532 23 5.60297 23 4.13403 21.8634C3.75585 21.5708 3.41735 21.2295 3.12716 20.8482C2 19.367 2 17.2169 2 12.9167L2 11.0833C2 6.78311 2 4.633 3.12716 3.15181C3.41735 2.77048 3.75585 2.42916 4.13403 2.13656C5.60298 0.999999 7.73532 0.999999 12 1Z"
		stroke="currentColor"
		stroke-width="2"
	/>
	<path
		d="M6 7H13"
		stroke="currentColor"
		stroke-width="2"
		stroke-linecap="round"
	/>
	<path
		d="M6 12H17"
		stroke="currentColor"
		stroke-width="2"
		stroke-linecap="round"
	/>
	<path
		d="M6 17H15"
		stroke="currentColor"
		stroke-width="2"
		stroke-linecap="round"
	/>
</svg>
