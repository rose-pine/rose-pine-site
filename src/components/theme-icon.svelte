<script lang="ts">
	import { categoryColorMap } from "../utilities/icon-config";
	import { getSvelteIconComponent } from "../utilities/icons-svelte";
	let {
		category,
		size,
	}: { category: keyof typeof categoryColorMap; size: Size } = $props();

	type Size = "sm" | "md" | "lg";
	let iconSizeMap = {
		sm: 14,
		md: 18,
		lg: 32,
	};
	let containerSizeMap = {
		sm: "size-6",
		md: "size-8",
		lg: "size-12",
	};
	let radiusMap = {
		sm: "rounded-sm",
		md: "rounded-md",
		lg: "rounded-lg",
	};
</script>

{#snippet themeIcon()}
	{@const IconComponent = getSvelteIconComponent(category)}
	<div
		class={[
			"flex items-center justify-center",
			containerSizeMap[size],
			radiusMap[size],
			categoryColorMap[category],
		]}
		title={category}
	>
		<div class="sr-only">{category}</div>
		<IconComponent size={iconSizeMap[size]} strokeWidth="2" />
	</div>
{/snippet}
{@render themeIcon()}
