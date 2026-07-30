<script lang="ts">
	import { UserMustacheIcon } from "./icons";

	type Props = {
		src?: string;
		alt?: string;
		size?: number;
	};

	let { src, alt, size = 24 }: Props = $props();
</script>

{#if src}
	<img
		width={size}
		height={size}
		{src}
		{alt}
		class="rounded-full border border-overlay bg-surface object-cover object-center"
	/>
{:else}
	<UserMustacheIcon size={size - 18} class="text-subtle" />
{/if}
