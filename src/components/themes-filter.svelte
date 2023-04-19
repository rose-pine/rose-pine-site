<script lang="ts">
	import { IconSearch } from "$components/icons";
	import Key from "$components/key.svelte";
	import { queryTheme } from "$store";

	export let label: string;

	let element: HTMLElement;

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === "Escape") {
			element.blur();
		}

		if (
			e.key === "/" &&
			element != null &&
			document.activeElement?.tagName === "BODY" &&
			document.activeElement !== element
		) {
			e.preventDefault();
			element.focus();
		}
	}
</script>

<svelte:window on:keydown={handleKeydown} />

<div
	class="relative flex h-12 w-full items-center space-x-3 overflow-hidden rounded-full border bg-surface px-3 transition focus-within:ring"
>
	<label for="search">
		<span class="sr-only">{label}</span>
		<span class="text-subtle">
			<IconSearch size={20} aria-hidden="true" />
		</span>
	</label>

	<input
		id="search"
		type="text"
		bind:this={element}
		bind:value={$queryTheme}
		placeholder={label}
		class="h-12 w-full bg-transparent py-3 text-sm font-medium text-text placeholder-muted focus:outline-none sm:h-10"
	/>

	<div class="absolute right-3">
		<Key>/</Key>
	</div>
</div>
