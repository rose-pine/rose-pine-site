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
	class="group button button-secondary border button-sm"
>
	Decorations
	<CheckIcon class="invisible group-aria-checked:visible" />
</button>
