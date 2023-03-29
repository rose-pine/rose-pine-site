<script lang="ts">
	import { getContext } from 'svelte'

	const { shouldShow: shouldShowNumber, get: number } =
		getContext('list-number')
</script>

<li
	class="flex flex-col space-y-3 sm:flex-row sm:items-center sm:space-x-3 sm:space-y-0 {shouldShowNumber
		? ''
		: 'ml-[18px] list-item list-disc'}"
>
	{#if shouldShowNumber}
		<span
			class="flex h-9 w-6 shrink-0 items-center justify-center rounded-full bg-text text-sm font-medium"
			style:color="hsl(var(--color-base))"
		>
			{number()}
		</span>
	{/if}

	<span class="text-sm"><slot /></span>
</li>
