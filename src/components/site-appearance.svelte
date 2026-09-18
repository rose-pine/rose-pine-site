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

<details bind:this={detailsElement} class="dropdown">
	<summary class="button button-ghost">
		<RainbowIcon class="button-icon" />
		{themeNameMap[appearance as ThemeValue] || themeNameMap.system}
		<ChevronDownIcon class="summary-caret" />
	</summary>
	<ul
		role="list"
		class="dropdown-menu dropdown-menu-align-end dropdown-menu-open-up"
	>
		{#each themes as theme}
			<li>
				<button
					class="dropdown-item"
					onclick={() => selectTheme(theme)}
					aria-current={appearance === theme ? "true" : undefined}
				>
					{themeNameMap[theme]}
				</button>
			</li>
		{/each}
	</ul>
</details>
