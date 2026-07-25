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
	<circle cx="15" cy="15" r="8" stroke="currentColor" stroke-width="2" />
	<path
		d="M18.6364 15.7273C17.5288 16.7821 16.5295 17.1818 15 17.1818C13.4705 17.1818 12.4712 16.7821 11.3636 15.7273"
		stroke="currentColor"
		stroke-width="2"
		stroke-linecap="round"
	/>
	<circle cx="12.4545" cy="12.4545" r="1.09091" fill="currentColor" />
	<circle cx="17.5455" cy="12.4545" r="1.09091" fill="currentColor" />
	<path
		d="M16.748 7C15.8599 3.54955 12.7277 1 9 1C4.58172 1 1 4.58172 1 9C1 12.7277 3.54955 15.8599 7 16.748"
		stroke="currentColor"
		stroke-width="2"
	/>
	<path
		d="M6.0533 9.00313C5.65337 8.62224 5.02039 8.63768 4.6395 9.03761C4.25862 9.43754 4.27406 10.0705 4.67399 10.4514L5.36364 9.72726L6.0533 9.00313ZM8 11.1121L8.15199 10.1237C7.38715 10.0061 6.78357 9.69862 6.0533 9.00313L5.36364 9.72726L4.67399 10.4514C5.63756 11.3691 6.60126 11.9087 7.84801 12.1005L8 11.1121Z"
		fill="currentColor"
	/>
	<circle cx="6.45454" cy="6.45454" r="1.09091" fill="currentColor" />
	<circle cx="11.5455" cy="6.45454" r="1.09091" fill="currentColor" />
</svg>
