<script lang="ts">
	import { Label, RadioGroup } from "bits-ui";
	import categories from "../data/categories.json";
	import { getLangFromUrl, useTranslations } from "../i18n/utilities";
	import { themeSearch } from "../state.svelte";
	import { getSvelteIconComponent } from "../utilities/icons-svelte";

	let lang = getLangFromUrl();
	let t = useTranslations(lang);
</script>

{#snippet radio(category: string = "")}
	{@const IconComponent = getSvelteIconComponent(category)}
	{@const label = category === "" ? t("shared.all") : category}

	<RadioGroup.Item
		id="category-{label}"
		value={category}
		class="flex items-center gap-2 rounded-full border tonal-muted px-3 py-1.5 font-mono text-xs font-medium text-subtle capitalize transition-[background-color] select-none hover:tonal-pressed-muted hover:text-text focus:outline-none focus-visible:ring focus-visible:ring-rose data-[state=checked]:tonal-rose data-[state=checked]:font-semibold data-[state=checked]:hover:tonal-pressed-rose"
	>
		<IconComponent size="12" strokeWidth="2" />
		<Label.Root for="category-{label}">{label}</Label.Root>
	</RadioGroup.Item>
{/snippet}

<div>
	<fieldset aria-label="Filter by category">
		<legend class="sr-only">Category</legend>

		<RadioGroup.Root
			orientation="horizontal"
			bind:value={themeSearch.category}
			class="flex flex-wrap gap-2"
		>
			{@render radio()}

			{#each categories as category}
				{#if category !== "none"}
					{@render radio(category)}
				{/if}
			{/each}
		</RadioGroup.Root>
	</fieldset>
</div>
