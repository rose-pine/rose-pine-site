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
		d="M21.7602 19.6526C21.441 20.0686 21.0687 20.4409 20.6527 20.7601C19.0368 22 17.6913 22 13.0001 22H11.0001C6.30896 22 4.96338 22 3.34754 20.7601C2.93155 20.4409 2.55919 20.0686 2.23999 19.6526C1.00011 18.0367 1.00011 16.6911 1.00011 12C1.00011 7.30885 1.00011 5.96327 2.23999 4.34743C2.55919 3.93144 2.93155 3.55908 3.34754 3.23988C4.57479 2.29817 5.223 2.05446 8.00011 2C12 2 11 7 14 7H19C20.3333 7 23.0001 7.8 23.0001 11C23.0001 12 23.0001 10.5 23.0001 12C23.0001 13.1982 23.0001 13.1781 22.9794 14"
		stroke="currentColor"
		stroke-width="2"
		stroke-linecap="round"
	/>
	<path
		d="M10.5 3H19.0207C20.354 3 23 3.8 23 7V11"
		stroke="currentColor"
		stroke-width="2"
	/>
</svg>
