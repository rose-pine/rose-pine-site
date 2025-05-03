<script lang="ts">
	import { formatColor } from "../utilities";
	import { getLangFromUrl, useTranslations } from "../i18n/utilities";
	import { preferences } from "../state.svelte";

	let { color, format }: { color: Color; format: ColorFormat } = $props();
	let formattedColor = $derived(
		formatColor(color, format, preferences.colorStyle),
	);
	let isCopied = $state(false);

	let lang = getLangFromUrl();
	let t = useTranslations(lang);
	let element: HTMLButtonElement;

	function copyToClipboard() {
		if (!element) {
			return;
		}
		try {
			navigator.clipboard.writeText(formattedColor);
			isCopied = true;

			setTimeout(() => {
				isCopied = false;
			}, 2000);
		} catch (error) {
			console.error("Failed to copy", error);
		}
	}
</script>

<button
	bind:this={element}
	onclick={copyToClipboard}
	disabled={isCopied}
	class="-mx-(--cell-offset) rounded-(--card-inner-radius) px-(--cell-offset) py-[calc(var(--cell-offset)/2)] font-mono text-sm hover:bg-muted/10 hover:font-semibold disabled:bg-muted/10 disabled:font-semibold disabled:italic disabled:select-none"
	>{isCopied ? t("shared.copied") : formattedColor}</button
>
