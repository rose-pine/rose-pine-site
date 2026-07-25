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
		d="M1 10C1 6.16179 1 4.24268 2.13656 2.92063C2.42916 2.58027 2.77049 2.27561 3.15181 2.01445C4.633 1 6.78311 1 11.0833 1H12.9167C17.2169 1 19.367 1 20.8482 2.01445C21.2295 2.27561 21.5708 2.58027 21.8634 2.92063C23 4.24268 23 6.16179 23 10C23 13.8382 23 15.7573 21.8634 17.0794C21.5708 17.4197 21.2295 17.7244 20.8482 17.9856C19.367 19 17.2169 19 12.9167 19H11.0833C6.78311 19 4.633 19 3.15181 17.9856C2.77049 17.7244 2.42916 17.4197 2.13656 17.0794C1 15.7573 1 13.8382 1 10Z"
		stroke="currentColor"
		stroke-width="2"
	/>
	<path
		d="M2 15L22 15"
		stroke="currentColor"
		stroke-width="2"
		stroke-linecap="round"
	/>
	<path
		d="M16 23L8 23"
		stroke="currentColor"
		stroke-width="2"
		stroke-linecap="round"
	/>
	<path
		d="M12 19L12 23"
		stroke="currentColor"
		stroke-width="2"
		stroke-linecap="round"
	/>
</svg>
