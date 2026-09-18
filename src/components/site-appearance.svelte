<script lang="ts">
	import { onMount } from "svelte";
	import Dropdown from "./dropdown.svelte";
	import { RainbowIcon } from "./icons";

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
</script>

<Dropdown align="end" direction="above">
	{#snippet trigger()}
		<RainbowIcon />
		{themeNameMap[appearance as ThemeValue] || themeNameMap.system}
	{/snippet}

	<ul>
		{#each themes as theme}
			<li>
				<button
					onclick={() => updateTheme(theme)}
					aria-current={appearance === theme ? "true" : undefined}
				>
					{themeNameMap[theme]}
				</button>
			</li>
		{/each}
	</ul>
</Dropdown>
