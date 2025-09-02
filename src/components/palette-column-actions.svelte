<script lang="ts">
	import { DropdownMenu } from "bits-ui";
	import { formatColor } from "../color";
	import palette from "../data/palette.json";
	import { preferences } from "../state.svelte";
	import type { Snippet } from "svelte";

	type Props = {
		format: ColorFormat;
		variant: Variant;
		children: Snippet;
	};
	let { format, variant, children }: Props = $props();

	let open = $state(false);
	let copied = $state(false);
	let syntaxes = $derived([
		{
			label: "CSS",
			value: palette[variant]
				.map(
					(color) =>
						`--color-${color.role}: ${formatColor(color, format, preferences.colorsAreStyled)};`,
				)
				.join("\n"),
		},
		{
			label: "JSON",
			value: JSON.stringify(
				Object.fromEntries(
					palette[variant].map((color) => [
						color.role,
						formatColor(color, format, preferences.colorsAreStyled),
					]),
				),
				undefined,
				"\t",
			),
		},
		{
			label: "TOML",
			value: `${palette[variant]
				.map(
					(color) =>
						`${color.role} = "${formatColor(color, format, preferences.colorsAreStyled)}"`,
				)
				.join("\n")}`,
		},
		{
			label: "YAML",
			value: `${palette[variant]
				.map(
					(color) =>
						`${color.role}: '${formatColor(color, format, preferences.colorsAreStyled)}'`,
				)
				.join("\n")}`,
		},
	]);

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

{#snippet copySyntax(syntax: (typeof syntaxes)[0])}
	<DropdownMenu.Item>
		{#snippet child()}
			<button
				onclick={() => {
					open = false;
					copyToClipboard(syntax.value);
				}}
				aria-label={`Copy ${variant} palette as ${syntax.label}`}
				class="flex cursor-pointer items-center gap-2 rounded-(--card-inner-radius) border tonal-subtle py-1.5 pr-3 pl-2.5 font-mono text-sm font-medium transition hover:tonal-gold"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="14"
					height="14"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
					<path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
				</svg>
				<span>{syntax.label}</span>
			</button>
		{/snippet}
	</DropdownMenu.Item>
{/snippet}

<DropdownMenu.Root bind:open>
	<DropdownMenu.Trigger
		class="group flex h-full cursor-pointer items-center justify-between gap-1.5"
	>
		<span>{@render children()}</span>
		<div
			class={[
				"flex items-center gap-0.5 rounded-md border py-1 pr-1 pl-1.5",
				copied
					? "tonal-gold"
					: "tonal-muted transition group-hover:tonal-pressed-muted",
			]}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="15"
				height="15"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				class={[copied ? "" : "text-subtle transition group-hover:text-text"]}
			>
				<rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
				<path
					d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"
				/>
				{#if copied}
					<path d="m9 14 2 2 4-4" />
				{/if}
			</svg>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="15"
				height="15"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				class={[
					"pt-px",
					copied
						? "text-gold/80"
						: "text-muted transition group-hover:text-subtle",
				]}><path d="m6 9 6 6 6-6" /></svg
			>
		</div>
	</DropdownMenu.Trigger>

	<DropdownMenu.Portal>
		<DropdownMenu.Content
			class="min-w-40 rounded-(--card-radius) border border-muted/20 bg-surface shadow-xl [--card-gutter:--spacing(3)] [--card-inner-radius:calc(var(--card-radius)/2)] [--card-radius:--spacing(3)]"
		>
			<DropdownMenu.Group class="flex flex-col gap-3 p-(--card-gutter)">
				<DropdownMenu.GroupHeading
					class="text-center text-xs font-medium tracking-wide text-muted uppercase"
					>Copy as...</DropdownMenu.GroupHeading
				>

				<div class="grid grid-cols-2 gap-1.5">
					{#each syntaxes as syntax}
						{@render copySyntax(syntax)}
					{/each}
				</div>
			</DropdownMenu.Group>
		</DropdownMenu.Content>
	</DropdownMenu.Portal>
</DropdownMenu.Root>
