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
		d="M1 11C1 6.73532 1 4.60298 2.13656 3.13403C2.42916 2.75585 2.77049 2.41735 3.15181 2.12716C4.633 1 6.78311 1 11.0833 1H12.9167C17.2169 1 19.367 1 20.8482 2.12716C21.2295 2.41735 21.5708 2.75585 21.8634 3.13403C23 4.60298 23 6.73532 23 11C23 15.2647 23 19.397 21.8634 20.866C21.5708 21.2441 21.2295 21.5827 20.8482 21.8728C19.367 23 17.2169 23 12.9167 23H11.0833C6.78311 23 4.633 23 3.15181 21.8728C2.77049 21.5827 2.42916 21.2441 2.13656 20.866C1 19.397 1 15.2647 1 11Z"
		stroke="currentColor"
		stroke-width="2"
	/>
	<circle cx="15.8891" cy="8.11091" r="1.5" fill="currentColor" />
	<circle cx="12" cy="12" r="1.5" fill="currentColor" />
	<circle cx="8.11091" cy="15.8891" r="1.5" fill="currentColor" />
</svg>
