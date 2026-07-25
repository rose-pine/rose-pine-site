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
		d="M11.0088 1.96973C11.1637 0.813578 12.8363 0.813577 12.9912 1.96973L13.7529 7.6709C13.9322 9.01249 14.9875 10.0678 16.3291 10.2471L22.0303 11.0088C23.1864 11.1637 23.1864 12.8363 22.0303 12.9912L16.3291 13.7529C14.9875 13.9322 13.9322 14.9875 13.7529 16.3291L12.9912 22.0303C12.8363 23.1864 11.1637 23.1864 11.0088 22.0303L10.2471 16.3291C10.0678 14.9875 9.01249 13.9322 7.6709 13.7529L1.96973 12.9912C0.813577 12.8363 0.813578 11.1637 1.96973 11.0088L7.6709 10.2471C9.01249 10.0678 10.0678 9.01249 10.2471 7.6709L11.0088 1.96973Z"
		stroke="currentColor"
		stroke-width="2"
	/>
	<circle cx="3" cy="21" r="2" stroke="currentColor" stroke-width="2" />
	<path
		d="M23 3L21 3M19 3L21 3M21 3L21 1M21 3L21 5"
		stroke="currentColor"
		stroke-width="2"
		stroke-linecap="round"
	/>
</svg>
