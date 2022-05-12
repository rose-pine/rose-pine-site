<script lang="ts">
	import { getContext } from 'svelte'

	const { shouldShow: shouldShowNumber, get: number } =
		getContext('list-number')
</script>

<li
	class="flex flex-col space-y-3 text-md sm:flex-row sm:items-center sm:space-y-0 sm:space-x-3 {shouldShowNumber
		? ''
		: 'ml-[18px] list-item list-disc'}"
>
	{#if shouldShowNumber}
		<span
			style:color="var(--base)"
			class="flex h-9 w-6 shrink-0 items-center justify-center rounded-full bg-text text-md font-medium"
		>
			{number()}
		</span>
	{/if}

	<span><slot /></span>
</li>
