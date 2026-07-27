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
		d="M1 12C1 7.30885 1 4.96327 2.13656 3.34743C2.42916 2.93144 2.77049 2.55908 3.15181 2.23988C4.633 1 6.78311 1 11.0833 1H12.9167C17.2169 1 19.367 1 20.8482 2.23988C21.2295 2.55908 21.5708 2.93144 21.8634 3.34743C23 4.96327 23 7.30885 23 12C23 16.6912 23 19.0367 21.8634 20.6526C21.5708 21.0686 21.2295 21.4409 20.8482 21.7601C19.367 23 17.2169 23 12.9167 23H11.0833C6.78311 23 4.633 23 3.15181 21.7601C2.77049 21.4409 2.42916 21.0686 2.13656 20.6526C1 19.0367 1 16.6912 1 12Z"
		stroke="currentColor"
		stroke-width="2"
	/>
	<path
		d="M2 8L22 8"
		stroke="currentColor"
		stroke-width="2"
		stroke-linecap="round"
	/>
	<circle cx="9.5" cy="4.5" r="1.5" fill="currentColor" />
	<circle cx="13.5" cy="4.5" r="1.5" fill="currentColor" />
	<circle cx="5.5" cy="4.5" r="1.5" fill="currentColor" />
</svg>
