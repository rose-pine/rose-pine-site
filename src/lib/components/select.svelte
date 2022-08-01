<script lang="ts">
	export let id: string
	export let value: string
	export let label: string
	export let options: string[][]
</script>

<div class="flex flex-col">
	<label for={id} class="sr-only">
		<span class="text-xs font-medium text-subtle">{label}</span>
	</label>

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

			{#each options as option}
				<option value={option[1]} disabled={value === option[1]}>
					{option[0]}
				</option>
			{/each}
		</select>

		<span
			aria-hidden="true"
			class="absolute right-0 z-10 mt-px mr-2 inline-block border-x-4 border-t-[6px] border-x-transparent border-t-muted align-middle text-subtle"
		/>
	</div>
</div>
