<script lang="ts">
	import type { Component, Snippet } from "svelte";
	import { preferences } from "../state.svelte";
	import type { IconProps } from "../types/icon";
	import Dropdown from "./dropdown.svelte";
	import {
		BracesIcon,
		BracketsIcon,
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

			setTimeout(() => {
				copied = false;
			}, 2000);
		} catch (error) {
			console.error("failed to copy", error);
		}
	}
</script>

<Dropdown triggerSize="sm" align="end">
	{#snippet trigger()}
		{#if copied}
			<CopyCheckIcon />
		{:else}
			<CopyIcon />
		{/if}
		{@render children()}
	{/snippet}

	<div
		class="py-(--space) ps-(--space) text-left text-xs font-medium tracking-wide text-subtle uppercase select-none"
	>
		Copy as...
	</div>

	<ul>
		{#each resolvedSyntaxes as { label, value, Icon }}
			<li>
				<button
					onclick={() => copyToClipboard(value)}
					aria-label="Copy as {label}"
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
</Dropdown>
