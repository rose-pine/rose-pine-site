<script lang="ts">
	import { onMount } from "svelte";
	import { ChevronDownIcon, RainbowIcon } from "./icons";

	type ThemeValue = "system" | "main" | "moon" | "dawn";
	let themes: ThemeValue[] = ["system", "main", "moon", "dawn"];

	let appearance = $state("");

	onMount(() => {
		appearance = localStorage.theme ?? "system";
	});

	let themeNameMap = {
		system: "System",
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

	let detailsElement: HTMLDetailsElement;

	function selectTheme(theme: ThemeValue) {
		updateTheme(theme);
		detailsElement.open = false;
	}
</script>

<details bind:this={detailsElement} class="group/dropdown dropdown dropdown-up">
	<summary class="button button-ghost">
		<RainbowIcon size={16} />
		<span class="pbe-px"
			>{themeNameMap[appearance as ThemeValue] || themeNameMap.system}</span
		>
		<ChevronDownIcon
			size={14}
			class="transition-transform duration-150 group-open/dropdown:rotate-180"
		/>
	</summary>
	<div class="dropdown-menu">
		{#each themes as theme}
			<button class="dropdown-item" onclick={() => selectTheme(theme)}>
				{themeNameMap[theme]}
			</button>
		{/each}
	</div>
</details>
