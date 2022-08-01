<script>
	export let indent = 0

	let indentBy = `${indent * 48}px`
</script>

<div class="flex h-7 items-center space-x-3 bg-base px-10 hover:bg-muted/10">
	{#if indent > 0}
		<div class="shrink-0" style="width: {indentBy}" />
	{/if}

	<slot />
</div>
