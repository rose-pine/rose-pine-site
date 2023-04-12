<script lang="ts">
	export let id: string;
	export let checked = false;
</script>

<div class="inline-block">
	<input {id} bind:checked type="checkbox" class="peer invisible absolute" />
	<label
		for={id}
		class="inline-flex h-8 w-full cursor-pointer select-none items-center justify-center rounded-md border bg-muted/5 px-2 text-sm text-subtle transition hover:border-muted/20 hover:bg-muted/10 hover:text-text focus:outline-none focus:ring peer-checked:border-foam/20 peer-checked:bg-foam/10 peer-checked:text-foam peer-checked:ring-foam/30"
		><slot /></label
	>
</div>
