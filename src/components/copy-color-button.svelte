<script lang="ts">
	import { formatColor } from "../color";
	import { preferences } from "../state.svelte";
	import type { Color, ColorFormat } from "../types/palette";

	let { color, format }: { color: Color; format: ColorFormat } = $props();
	let formattedColor = $derived(
		formatColor(color, format, preferences.colorsAreStyled),
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
		class="group -mx-(--cell-offset) flex items-center gap-1.5 rounded-(--card-inner-radius) px-(--cell-offset) py-[calc(var(--cell-offset)/2)] font-mono text-sm hover:bg-muted/10 hover:font-semibold disabled:tonal-gold disabled:font-semibold disabled:select-none"
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="15"
			height="15"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			class="group-enabled:invisible group-enabled:text-subtle group-enabled:group-hover:visible"
		>
			<rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
			<path
				d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"
			/>
			{#if copied}
				<path d="m9 14 2 2 4-4" />
			{/if}
		</svg>
		<!-- Ensure colours are output LTR to preserve RGB/HSL order
			 (specifically with decorations disabled) -->
		<span dir="ltr">{formattedColor}</span>
	</button>
</div>
