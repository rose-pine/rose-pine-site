<script lang="ts">
	export let id: Optional<string> = undefined;
	export let href: Optional<string> = undefined;
	export let linkText: Optional<string> = undefined;
	export let size: "sm" | "lg" = "sm";

	const isExternal = href?.startsWith("http");
</script>

<svelte:element
	this={href ? "a" : "div"}
	{id}
	{href}
	class="flex h-full w-full flex-col bg-surface transition target:ring focus:outline-none focus:ring"
	class:hoverable={href}
	class:size-sm={size === "sm"}
	class:size-lg={size === "lg"}
>
	<slot />

	{#if linkText}
		<div class="flex-1" />

		<div class="pt-1.5">
			<span
				class="inline font-medium text-iris underline-offset-2 after:inline-block after:whitespace-pre hover:underline"
				class:internal-link={!isExternal}
				class:external-link={isExternal}>{linkText}</span
			>
		</div>
	{/if}
</svelte:element>

<style lang="postcss">
	.size-sm {
		@apply rounded-xl p-5;
	}
	.size-lg {
		@apply rounded-3xl p-6 lg:p-10;
	}
	.internal-link {
		@apply after:content-['_→'];
	}
	.external-link {
		@apply after:content-['_↗'];
	}
	.hoverable:hover {
		@apply bg-muted/10;
	}
</style>
