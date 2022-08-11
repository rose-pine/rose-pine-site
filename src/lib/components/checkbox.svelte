<script lang="ts">
	export let id: string
	export let checked = false
</script>

<div class="inline-block">
	<input {id} bind:checked type="checkbox" class="peer invisible absolute" />
	<label
		for={id}
		tabindex="0"
		class="inline-flex h-9 w-full cursor-pointer select-none items-center space-x-2 rounded-md border bg-muted/5 px-2 text-subtle transition hover:border-muted/20 hover:bg-muted/10 hover:text-text focus:outline-none focus:ring peer-checked:border-pine peer-checked:bg-pine/10 peer-checked:text-pine peer-checked:ring-pine/30 sm:h-7 sm:text-sm"
		><slot /></label
	>
</div>
