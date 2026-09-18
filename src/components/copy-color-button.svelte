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
		class="group button button-ghost button-sm -mx-(--cell-offset) px-(--cell-offset) py-[calc(var(--cell-offset)/2)] font-mono disabled:select-none"
	>
		<div
			class="button-icon group-enabled:opacity-0
			group-enabled:group-hover:opacity-100"
		>
			{#if copied}
				<CopyCheckIcon class="button-icon" />
			{:else}
				<CopyIcon class="button-icon" />
			{/if}
		</div>

		<!-- Ensure colours are output LTR to preserve RGB/HSL order
			 (specifically with decorations disabled) -->
		<span dir="ltr">{formattedColor}</span>
	</button>
</div>
