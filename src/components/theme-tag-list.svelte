<script lang="ts">
	import { themeSearch } from "../state.svelte";

	let { tags }: { tags: string[] } = $props();

	function toggleTag(tag: string) {
		// re-assign to maintain reactivity
		const newTags = new Set(themeSearch.tags);
		if (newTags.has(tag)) {
			newTags.delete(tag);
		} else {
			newTags.add(tag);
		}
		themeSearch.tags = newTags;
	}

	function clearTags() {
		themeSearch.tags = new Set();
	}
</script>

<fieldset aria-label="Filter by tags" class="flex flex-wrap gap-2.5">
	<legend class="sr-only">Filter by tags</legend>

	{#each tags as tag}
		<label class="relative cursor-pointer">
			<input
				type="checkbox"
				class="peer sr-only"
				checked={themeSearch.tags.has(tag)}
				onchange={() => toggleTag(tag)}
			/>
			<span
				class="flex rounded-full border tonal-muted px-3 py-1.5 font-mono text-xs text-subtle transition-all select-none peer-checked:tonal-foam peer-checked:font-semibold peer-focus:ring peer-focus:ring-foam hover:tonal-pressed-muted hover:text-text peer-checked:hover:tonal-pressed-foam"
			>
				{tag}
			</span>
		</label>
	{/each}

	{#if themeSearch.tags.size > 0}
		<button
			type="button"
			onclick={() => clearTags()}
			class="flex cursor-pointer rounded-full border tonal-love px-3 py-1.5 font-mono text-xs transition-all select-none hover:tonal-pressed-love focus:ring focus:ring-love focus:outline-none"
		>
			&times; Clear tags
		</button>
	{/if}
</fieldset>
