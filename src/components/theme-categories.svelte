<script lang="ts">
	import categories from "../data/categories.json";
	import { themeSearch } from "../state.svelte";
	import { getLocaleFromUrl, useTranslations } from "../utilities/i18n";
	import { getSvelteIconComponent } from "../utilities/icons";

	let locale = getLocaleFromUrl();
	let t = useTranslations(locale);

	let allLabel = $derived(t("shared.all"));
	let AllIcon = $derived(getSvelteIconComponent(""));
</script>

<div>
	<fieldset aria-label="Filter by category">
		<legend class="sr-only">Category</legend>

		<div role="radiogroup" class="flex flex-wrap gap-2">
			<label
				for="category-{allLabel}"
				class="flex cursor-pointer items-center gap-2 rounded-full border tonal-muted px-3 py-1.5 font-mono text-xs font-medium text-subtle capitalize transition-[background-color] select-none focus-within:ring focus-within:ring-rose focus-within:outline-none hover:tonal-pressed-muted hover:text-text has-checked:tonal-rose has-checked:font-semibold has-checked:hover:tonal-pressed-rose"
			>
				<input
					type="radio"
					name="category"
					id="category-{allLabel}"
					value=""
					bind:group={themeSearch.category}
					class="sr-only"
				/>
				<AllIcon size="12" />
				{allLabel}
			</label>

			{#each categories as category}
				{#if category !== "none"}
					{@const CategoryIcon = getSvelteIconComponent(category)}

					<label
						for="category-{category}"
						class="flex cursor-pointer items-center gap-2 rounded-full border tonal-muted px-3 py-1.5 font-mono text-xs font-medium text-subtle capitalize transition-[background-color] select-none focus-within:ring focus-within:ring-rose focus-within:outline-none hover:tonal-pressed-muted hover:text-text has-checked:tonal-rose has-checked:font-semibold has-checked:hover:tonal-pressed-rose"
					>
						<input
							type="radio"
							name="category"
							id="category-{category}"
							value={category}
							bind:group={themeSearch.category}
							class="sr-only"
						/>
						<CategoryIcon size="12" />
						{category}
					</label>
				{/if}
			{/each}
		</div>
	</fieldset>
</div>
