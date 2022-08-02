<script lang="ts">
	import { ChevronDownIcon } from '$lib/components/icons'

	export let id: string
	export let value: string
	export let label: string
	export let options: string[][]
</script>

<div class="relative flex shrink-0 items-center">
	<label for={id} class="sr-only">{label}</label>

	<select
		{id}
		bind:value
		class="w-full cursor-pointer appearance-none rounded-md border bg-muted/5 h-7 pl-2 pr-6 text-sm text-subtle transition hover:bg-muted/10 hover:text-text focus:outline-none focus:ring"
	>
		<option {value}>{label}</option>
		{#each options as [optionLabel, optionValue]}
			<option value={optionValue} disabled={value === optionValue}
				>{optionLabel}</option
			>
		{/each}
	</select>

	<div
		aria-hidden="true"
		class="pointer-events-none absolute right-0 z-10 mr-1.5 mt-px text-subtle"
	>
		<ChevronDownIcon size={14} />
	</div>
</div>
