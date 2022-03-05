<script>
	export let color = undefined
	export let size = 15
	export let width = undefined
	export let height = undefined
</script>

<div
	class="flex items-center justify-center"
	style:width={width ?? `${size}px`}
	style:height={height ?? `${size}px`}
>
	<div
		class="rounded-full"
		style:background={color}
		style:width={width ?? `${size - 2}px`}
		style:height={height ?? `${size - 2}px`}
	/>
</div>
