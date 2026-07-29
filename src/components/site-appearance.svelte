<script lang="ts">
	import { onMount } from "svelte";

	type ThemeValue = "system" | "main" | "moon" | "dawn";
	let themes: ThemeValue[] = ["system", "main", "moon", "dawn"];

	let appearance = $state("");

	onMount(() => {
		appearance = localStorage.theme ?? "system";
	});

	let themeNameMap = {
		system: "Match system",
		main: "Rosé Pine",
		moon: "Rosé Pine Moon",
		dawn: "Rosé Pine Dawn",
	} satisfies Record<ThemeValue, string>;

	function updateTheme(theme: string) {
		appearance = theme;
		if (appearance === "system") {
			localStorage.removeItem("theme");
			delete document.documentElement.dataset.theme;
		} else {
			document.documentElement.dataset.theme = appearance;
			localStorage.theme = appearance;
		}
	}
</script>

<select
	bind:value={() => appearance, updateTheme}
	class="flex items-center gap-1.5 rounded-md border tonal-subtle px-1.5 py-1 text-sm font-medium capitalize transition hover:tonal-pressed-subtle"
>
	{#each themes as theme}
		<option value={theme} disabled={appearance === theme}
			>{themeNameMap[theme]}</option
		>
	{/each}
</select>
