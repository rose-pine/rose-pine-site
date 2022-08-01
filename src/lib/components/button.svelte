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
		class="inline-flex items-center space-x-2 rounded-full bg-muted/20 px-6 py-2.5 font-medium tracking-wide transition hover:bg-muted/30 focus:outline-none focus:ring"
		><slot /></a
	>
{:else if action}
	<button
		on:click={action}
		class="inline-flex items-center space-x-2 rounded-full bg-muted/20 px-6 py-2.5 font-medium tracking-wide transition hover:bg-muted/30 focus:outline-none focus:ring"
		><slot /></button
	>
{/if}
