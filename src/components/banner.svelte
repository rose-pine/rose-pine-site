<script lang="ts">
	export let links: [name: string, href: string][];
</script>

<aside
	class="flex h-banner-height items-center overflow-x-auto whitespace-nowrap bg-love/10 px-3 text-center text-love"
>
	<div class="flex-1" />

	{#each links as [name, href], index}
		<a
			{href}
			class="text-sm font-medium transition hover:underline focus:outline-none focus:ring"
		>
			{name}
		</a>

		{#if index < links.length - 1}
			<div class="mx-3 h-6 border-r border-love/20" />
		{/if}
	{/each}

	<div class="flex-1" />
</aside>
