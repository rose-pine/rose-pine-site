<script lang="ts">
	type Size = "sm" | "lg";

	type Props = {
		color: string;
		size?: Size;
	};

	let { color, size = "sm" }: Props = $props();

	const sizeMap = {
		sm: "size-4",
		lg: "size-12",
	} satisfies Record<Size, string>;
</script>

<div
	class="{sizeMap[size]} rounded-full border border-muted/10"
	style="background: var(--color-{color})"
></div>
