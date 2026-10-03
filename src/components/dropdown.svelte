<script lang="ts">
	import type { Snippet } from "svelte";
	import { ChevronDownIcon } from "./icons";

	type Props = {
		children: Snippet;
		trigger: Snippet;
		triggerSize?: "sm" | "md" | "lg" | "touch";
		align?: "start" | "end";
		direction?: "above" | "below";
	};
	let {
		children,
		trigger,
		triggerSize = "md",
		align = "start",
		direction = "below",
	}: Props = $props();

	let triggerSizeMap = {
		sm: "button-sm",
		md: "",
		lg: "button-lg",
		touch: "button-touch",
	};
</script>

<details data-dropdown class="group relative">
	<summary
		class={[
			"button button-ghost group-open:bg-muted/10",
			triggerSizeMap[triggerSize],
		]}
	>
		{@render trigger()}
		<ChevronDownIcon
			class="size-3.5 transition-transform group-open:rotate-180"
		/>
	</summary>

	<div
		class={[
			"absolute z-50 max-h-72 w-48 overflow-y-auto rounded-(--radius) border border-overlay bg-surface p-(--space) shadow-md shadow-black/5",
			align === "end" && "inset-e-0",
			direction === "above" && "bottom-full mbe-1.5",
			direction === "below" && "mbs-1.5",
		]}
	>
		{@render children()}
	</div>
</details>

<style lang="postcss">
	[data-dropdown] {
		--space: 0.375rem;
		--radius: 0.75rem;
		--radius-inner: calc(var(--radius)/2);
	}

	[data-dropdown]
		:global(:has(li > [aria-current]) li > :is(a, button)::before) {
		content: " ";
		margin-inline-end: 0.25ch;
		font-family: var(--font-mono);
	}

	[data-dropdown]
		:global(
			:has(li > [aria-current]) li > :is(a, button)[aria-current]::before
		) {
		content: "✓";
	}

	[data-dropdown] :global(li > :is(a, button)) {
		padding: var(--space);
		width: 100%;
		font-size: 0.875rem;
		font-weight: 500;
		border-radius: var(--radius-inner);
		display: flex;
		align-items: center;
		gap: var(--space);

		&:hover {
			background: color-mix(in oklab, var(--color-muted) 10%, transparent);
		}
	}
</style>
