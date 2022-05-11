<script lang="ts">
	export let title: string
	export let description: string
</script>

<svelte:head>
	<title>{title} | Rosé Pine</title>
	<meta name="description" content={description} />
</svelte:head>
