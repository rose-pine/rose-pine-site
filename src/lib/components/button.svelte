<script lang="ts">
	export let href = ''
	export let action: () => void

	const isExternal = href.startsWith('http')
	const rel = isExternal ? 'external' : undefined
	const target = isExternal ? '_blank' : undefined
</script>

{#if href}
	<a
		{rel}
		{href}
		{target}
		class="inline-flex items-center space-x-2 rounded-full bg-highlight-med px-6 py-2.5 text-md font-medium tracking-wide transition-colors duration-150 hover:bg-highlight-high focus:outline-none focus:ring focus:ring-highlight-high"
		><slot /></a
	>
{:else if action}
	<button
		on:click={action}
		class="inline-flex items-center space-x-2 rounded-full bg-highlight-med px-6 py-2.5 text-md font-medium tracking-wide transition-colors duration-150 hover:bg-highlight-high focus:outline-none focus:ring focus:ring-highlight-high"
		><slot /></button
	>
{/if}
