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
	<!-- Version with border -->
	<!-- <foreignObject x="1" y="1" width="22" height="22"> -->
	<!-- 	<div -->
	<!-- 		xmlns="http://www.w3.org/1999/xhtml" -->
	<!-- 		style="width:100%;height:100%;border-radius:50%;background:conic-gradient(var(--color-love) 0%,var(--color-love) 16.666%,var(--color-rose) 16.666%,var(--color-rose) 33.333%,var(--color-gold) 33.333%,var(--color-gold) 50%,var(--color-pine) 50%,var(--color-pine) 66.666%,var(--color-foam) 66.666%,var(--color-foam) 83.333%,var(--color-iris) 83.333%,var(--color-iris) 100%)" -->
	<!-- 	></div> -->
	<!-- </foreignObject> -->
	<!-- <circle cx="12" cy="12" r="11" stroke="currentColor" stroke-width="2" /> -->

	<foreignObject x="0" y="0" width="24" height="24">
		<div
			xmlns="http://www.w3.org/1999/xhtml"
			style="width:100%;height:100%;border-radius:50%;background:conic-gradient(var(--color-love) 0%,var(--color-love) 16.666%,var(--color-rose) 16.666%,var(--color-rose) 33.333%,var(--color-gold) 33.333%,var(--color-gold) 50%,var(--color-pine) 50%,var(--color-pine) 66.666%,var(--color-foam) 66.666%,var(--color-foam) 83.333%,var(--color-iris) 83.333%,var(--color-iris) 100%)"
		></div>
	</foreignObject>
</svg>
