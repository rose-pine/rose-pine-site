<script lang="ts">
	import { preferences } from "../state.svelte";
	import { CheckIcon } from "./icons";

	function toggleColorStyle() {
		preferences.colorsAreStyled = !preferences.colorsAreStyled;
	}
</script>

<button
	type="button"
	role="switch"
	aria-checked={preferences.colorsAreStyled}
	aria-label="Toggle palette styles"
	onclick={toggleColorStyle}
	class="group flex cursor-pointer items-center gap-1.5 rounded-card-inner border tonal-muted px-3 py-1 text-sm font-medium text-subtle transition hover:tonal-pressed-muted hover:text-text aria-checked:tonal-foam"
>
	<span class="pbe-px">#Decorations</span>
	<CheckIcon size={15} class="invisible group-aria-checked:visible" />
</button>
