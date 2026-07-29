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

<details bind:this={detailsElement} class="group/details relative">
	<summary class="flex h-full items-center justify-between gap-1.5">
		<span>{@render children()}</span>
		<div
			class={[
				"flex items-center gap-0.5 rounded-md border py-1 ps-1.5 pe-1 transition",
				copied
					? "tonal-gold"
					: "tonal-subtle group-hover/details:tonal-pressed-subtle",
			]}
		>
			{#if copied}
				<CopyCheckIcon size={15} />
			{:else}
				<CopyIcon size={15} />
			{/if}
			<ChevronDownIcon size={15} />
		</div>
	</summary>

	<div
		class="absolute top-[calc(100%+2px)] left-1/2 z-50 flex w-full min-w-40 -translate-x-1/2 flex-col rounded-dropdown border border-muted/20 bg-surface px-dropdown-gutters-half pbe-dropdown-gutters-half shadow-xl"
	>
		<div
			class="ps-dropdown-gutters-half pbs-dropdown-gutters pbe-dropdown-gutters-half text-left text-xs font-medium tracking-wide text-subtle uppercase select-none"
		>
			Copy as...
		</div>

		<ul role="list">
			{#each resolvedSyntaxes as { label, value, Icon }}
				<li>
					<button
						onclick={() => copyToClipboard(value)}
						aria-label="Copy as {label}"
						class="flex w-full items-center gap-dropdown-gutters-half rounded-dropdown-inner p-dropdown-gutters-half text-left font-mono text-sm font-medium transition hover:bg-muted/10"
					>
						<div
							class="flex size-6 items-center justify-center rounded-sm border tonal-subtle"
						>
							<Icon size={14} />
						</div>
						<span>{label}</span>
					</button>
				</li>
			{/each}
		</ul>
	</div>
</details>
