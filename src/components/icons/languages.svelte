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
		d="M13 23L18 12L23 23M21.875 20.5556H14.125"
		stroke="currentColor"
		stroke-width="2"
		stroke-linecap="round"
		stroke-linejoin="round"
	/>
	<path
		d="M1 5.66668H7.4935M7.4935 5.66668H10.0909M7.4935 5.66668C7.4935 8.90881 6.34302 11.765 4.59702 13.4381M4.59702 13.4381C3.56722 14.4248 2.33026 15 1 15M4.59702 13.4381C3.16508 12.6113 2.65625 11.9239 2.2987 10.3333M4.59702 13.4381C6.17729 14.3505 8.44638 14.9437 11 15M3.5974 1.00002L4.8961 2.16668"
		stroke="currentColor"
		stroke-width="2"
		stroke-linecap="round"
		stroke-linejoin="round"
	/>
</svg>
