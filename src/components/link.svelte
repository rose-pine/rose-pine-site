<script lang="ts">
	export let href: Optional<string> = undefined;
	export let decorations = true;
	export let nested = false;

	const element = href && !nested ? "a" : "span";
</script>

<svelte:element
	this={element}
	{href}
	class="inline font-medium text-iris underline-offset-2 after:inline-block after:whitespace-pre hover:underline"
	class:link={decorations}><slot /></svelte:element
>

<style lang="postcss">
	.link {
		@apply after:content-['_→'];
	}
	.link[href^="http"] {
		@apply after:content-['_↗'];
	}
</style>
