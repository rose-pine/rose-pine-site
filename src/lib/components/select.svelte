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

	<div class="relative flex items-center">
		<select
			{id}
			bind:value
			class="w-full appearance-none rounded-md bg-highlight-low py-1 pr-7 pl-2 text-sm leading-normal text-subtle focus:outline-none focus:ring focus:ring-highlight-high"
		>
			<option {value}>{label}</option>

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
