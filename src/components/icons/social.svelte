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
		d="M7 12C7 13.6569 5.65685 15 4 15C2.34315 15 1 13.6569 1 12C1 10.3431 2.34315 9 4 9C5.65685 9 7 10.3431 7 12ZM7 12H17M17 12C17 13.6569 18.3431 15 20 15C21.6569 15 23 13.6569 23 12C23 10.3431 21.6569 9 20 9C18.3431 9 17 10.3431 17 12Z"
		stroke="currentColor"
		stroke-width="2"
	/>
	<path
		d="M12 17C10.3431 17 9 18.3431 9 20C9 21.6569 10.3431 23 12 23C13.6569 23 15 21.6569 15 20C15 18.3431 13.6569 17 12 17ZM12 17V7M12 7C13.6569 7 15 5.65685 15 4C15 2.34315 13.6569 1 12 1C10.3431 1 9 2.34315 9 4C9 5.65685 10.3431 7 12 7Z"
		stroke="currentColor"
		stroke-width="2"
	/>
</svg>
