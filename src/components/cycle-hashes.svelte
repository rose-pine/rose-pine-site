<script lang="ts">
	import Key from "$components/key.svelte";
	import { searchIsOpen } from "$store";

	export let hashes: string[];

	let show = true;

	function gotoNext(hash: string) {
		const position = hashes.indexOf(hash) ?? 0;
		let next = position + 1;

		if (next > hashes.length - 1) {
			next = 0;
		}

		location.href = `#${hashes[next]}`;
	}

	function gotoPrevious(hash: string) {
		const position = hashes.indexOf(hash) ?? 0;
		let next = position - 1;

		if (next < 0) {
			next = hashes.length - 1;
		}

		location.href = `#${hashes[next]}`;
	}

	function handleKeydown(e: KeyboardEvent) {
		if ($searchIsOpen) return;

		const hash = location.hash.substring(1);

		if (e.key === "j") {
			e.preventDefault();
			gotoNext(hash);
		}

		if (e.key === "k") {
			e.preventDefault();
			gotoPrevious(hash);
		}
	}
</script>

<svelte:window on:keydown={handleKeydown} />

<button
	on:click={() => (show = false)}
	aria-label="Hide keybind hint"
	class="shadow-3xl fixed bottom-4 right-1/2 hidden translate-x-1/2 rounded-full border border-overlay bg-overlay px-3 py-1.5 transition focus:outline-none focus:ring supports-[backdrop-filter]:bg-overlay/60 supports-[backdrop-filter]:backdrop-blur-md"
	class:show
>
	<p class="flex items-center space-x-1.5">
		<span class="text-sm font-medium text-subtle">cycle through sections</span
		><Key>j/k</Key>
	</p>
</button>

<style lang="postcss">
	.show {
		@apply sm:flex;
	}
</style>
