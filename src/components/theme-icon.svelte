<script lang="ts">
	import {
		categoryColorMap,
		containerSizeMap,
		getSvelteIconComponent,
		iconSizeMap,
		radiusMap,
		type IconCategory,
		type IconSize,
	} from "../utilities/icons";

	type Props = {
		category: IconCategory;
		size: IconSize;
	};

	let { category, size }: Props = $props();
</script>

{#snippet themeIcon()}
	{@const IconComponent = getSvelteIconComponent(category)}
	<div
		aria-label={category}
		class={[
			"flex items-center justify-center",
			containerSizeMap[size],
			radiusMap[size],
			categoryColorMap[category],
		]}
	>
		<IconComponent size={iconSizeMap[size]} />
	</div>
{/snippet}

{@render themeIcon()}
