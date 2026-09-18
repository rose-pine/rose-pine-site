<script lang="ts">
	import type { Component, Snippet } from "svelte";
	import { preferences } from "../state.svelte";
	import type { IconProps } from "../types/icon";
	import {
		BracesIcon,
		BracketsIcon,
		ChevronDownIcon,
		CopyCheckIcon,
		CopyIcon,
		IndentIcon,
		LayersIcon,
	} from "./icons";

	type SyntaxLabel = "CSS" | "JSON" | "TOML" | "YAML";

	type SyntaxEntry = {
		label: SyntaxLabel;
		value: string;
		valuePlain: string;
	};

	type Props = {
		syntaxes: SyntaxEntry[];
		children: Snippet;
	};
	let { syntaxes, children }: Props = $props();

	let iconMap: Record<SyntaxLabel, Component<IconProps>> = {
		CSS: LayersIcon,
		JSON: BracesIcon,
		TOML: BracketsIcon,
		YAML: IndentIcon,
	};

	let copied = $state(false);
	let detailsElement: HTMLDetailsElement;
	let resolvedSyntaxes = $derived(
		syntaxes.map((s) => ({
			label: s.label,
			value: preferences.colorsAreStyled ? s.value : s.valuePlain,
			Icon: iconMap[s.label],
		})),
	);

	function copyToClipboard(text: string) {
		try {
			navigator.clipboard.writeText(text);
			copied = true;
			detailsElement.open = false;

			setTimeout(() => {
				copied = false;
			}, 2000);
		} catch (error) {
			console.error("failed to copy", error);
		}
	}
</script>

<details bind:this={detailsElement} class="dropdown">
	<summary class="flex h-full items-center justify-between gap-1.5">
		<div class="button button-ghost button-sm">
			{#if copied}
				<CopyCheckIcon class="button-icon" />
			{:else}
				<CopyIcon class="button-icon" />
			{/if}
			{@render children()}
			<ChevronDownIcon class="summary-caret" />
		</div>
	</summary>

	<div class="dropdown-menu dropdown-menu-align-end">
		<div
			class="py-dropdown-gutters-half ps-dropdown-gutters-half text-left text-xs font-medium tracking-wide text-subtle uppercase select-none"
		>
			Copy as...
		</div>

		<ul role="list">
			{#each resolvedSyntaxes as { label, value, Icon }}
				<li>
					<button
						onclick={() => copyToClipboard(value)}
						aria-label="Copy as {label}"
						class="dropdown-item"
					>
						<div
							class="flex size-6 items-center justify-center
						rounded border border-muted/20 bg-muted/10"
						>
							<Icon class="dropdown-item-icon size-3" />
						</div>
						<span>{label}</span>
					</button>
				</li>
			{/each}
		</ul>
	</div>
</details>
