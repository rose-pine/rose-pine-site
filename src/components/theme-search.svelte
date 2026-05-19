<script lang="ts">
	import { themeSearch } from "../state.svelte";
	import { getLocaleFromUrl, useTranslations } from "../utilities/i18n";

	let locale = getLocaleFromUrl();
	let t = useTranslations(locale);

	let searchInput: HTMLInputElement;

	function focusSearch(event: KeyboardEvent) {
		if (event.key === "/") {
			event.preventDefault();
			searchInput.focus();
		}
	}
</script>

<svelte:window onkeydown={focusSearch} />

<label
	for="theme-search"
	class="flex h-14 cursor-text items-center gap-3 rounded-(--input-radius) border border-muted/20 bg-surface px-3 transition [--input-inner-radius:calc(var(--input-radius)/2)] [--input-radius:1rem] focus-within:border-muted/40"
>
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="20"
		height="20"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width="2"
		stroke-linecap="round"
		stroke-linejoin="round"
		class="text-subtle"
		><path d="m21 21-4.34-4.34" /><circle cx="11" cy="11" r="8" /></svg
	>
	<input
		id="theme-search"
		bind:this={searchInput}
		bind:value={themeSearch.query}
		type="search"
		placeholder={t("themes.search_placeholder")}
		class="flex-1 placeholder:text-muted focus:outline-none"
	/>
	<kbd
		title={t("themes.search_focus_cue")}
		class="rounded-(--input-inner-radius) border tonal-muted px-1.5 py-0.5 font-mono text-sm"
		>/</kbd
	>
</label>
