<script lang="ts">
	let themes = ["system", "main", "moon", "dawn"] as const;
	let appearance = $state(localStorage.theme ?? "system");

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
	class="group flex cursor-pointer items-center gap-1.5 rounded-md border tonal-subtle px-3 py-1 text-sm font-medium capitalize transition hover:tonal-pressed-subtle"
>
	{#each themes as theme}
		<option value={theme} disabled={appearance === theme}>{theme}</option>
	{/each}
</select>
