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
		d="M23 11.0833L23 12.9167C23 17.2169 23 19.367 21.8728 20.8482C21.5827 21.2295 21.2441 21.5708 20.866 21.8634C19.397 23 17.2647 23 13 23C8.73532 23 6.60298 23 5.13403 21.8634C4.75585 21.5708 4.41735 21.2295 4.12716 20.8482C3 19.367 3 17.2169 3 12.9167L3 11.0833C3 6.78311 3 4.633 4.12716 3.15181C4.41735 2.77049 4.75585 2.42916 5.13403 2.13656C6.60298 1 8.73532 1 13 1"
		stroke="currentColor"
		stroke-width="2"
		stroke-linecap="round"
	/>
	<path
		d="M1 7L5 7"
		stroke="currentColor"
		stroke-width="2"
		stroke-linecap="round"
	/>
	<path
		d="M1 12L5 12"
		stroke="currentColor"
		stroke-width="2"
		stroke-linecap="round"
	/>
	<path
		d="M1 17L5 17"
		stroke="currentColor"
		stroke-width="2"
		stroke-linecap="round"
	/>
	<path
		d="M19.3232 1.63184C20.1643 0.789127 21.5271 0.789127 22.3682 1.63184C23.2105 2.4761 23.2104 3.84612 22.3682 4.69043L13.376 13.7021C11.7966 15.1434 10.7242 15.7107 9.96387 15.9072C9.49384 16.0286 8.95745 15.8657 8.5459 15.4629C8.13466 15.0603 7.96571 14.5334 8.08008 14.0674C8.2657 13.3115 8.83117 12.2405 10.3242 10.6504L19.3232 1.63184Z"
		stroke="currentColor"
		stroke-width="2"
		stroke-linecap="round"
		stroke-linejoin="round"
	/>
</svg>
