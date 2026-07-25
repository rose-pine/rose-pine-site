<script lang="ts">
	import { preferences } from "../state.svelte";
	import { CopyCheckIcon, CopyIcon } from "./icons";

	let {
		formattedStyled,
		formattedPlain,
	}: { formattedStyled: string; formattedPlain: string } = $props();
	let formattedColor = $derived(
		preferences.colorsAreStyled ? formattedStyled : formattedPlain,
	);
	let copied = $state(false);

	function copyToClipboard() {
		try {
			navigator.clipboard.writeText(formattedColor);
			copied = true;

			setTimeout(() => {
				copied = false;
			}, 2000);
		} catch (error) {
			console.error("failed to copy", error);
		}
	}
</script>

<div class="flex items-center justify-end gap-3">
	<button
		aria-live="polite"
		onclick={copyToClipboard}
		disabled={copied}
		class="group -mx-(--cell-offset) flex items-center gap-1.5 rounded-card-inner px-(--cell-offset) py-[calc(var(--cell-offset)/2)] font-mono text-sm hover:bg-muted/10 hover:font-semibold disabled:tonal-gold disabled:font-semibold disabled:select-none"
	>
		<div
			class="group-enabled:invisible group-enabled:text-subtle group-enabled:group-hover:visible"
		>
			{#if copied}
				<CopyCheckIcon size={15} />
			{:else}
				<CopyIcon size={15} />
			{/if}
		</div>

		<!-- Ensure colours are output LTR to preserve RGB/HSL order
			 (specifically with decorations disabled) -->
		<span dir="ltr">{formattedColor}</span>
	</button>
</div>
