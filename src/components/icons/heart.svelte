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
		d="M7.5 3C4.46243 3 2 5.46243 2 8.5C2 9.67741 2.36997 10.7684 3 11.6631C3.46615 12.325 8.16947 17.1189 10.5847 19.5679C11.365 20.3591 12.635 20.3591 13.4153 19.5679C15.8305 17.1189 20.5338 12.325 21 11.6631C21.63 10.7684 22 9.67741 22 8.5C22 5.46243 19.5376 3 16.5 3C15.1075 3 13.8358 4.07791 12.8669 5.21285C12.4177 5.73901 11.5823 5.73901 11.1331 5.21285C10.1642 4.07791 8.89252 3 7.5 3Z"
		stroke="currentColor"
		stroke-width="2"
	/>
</svg>
