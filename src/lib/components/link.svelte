<script lang="ts">
	export let href = ''

	const isExternal = href.startsWith('http')
	const rel = isExternal ? 'external' : undefined
	const target = isExternal ? '_blank' : undefined
</script>

<a
	{rel}
	{href}
	{target}
	class="text-iris underline underline-offset-2 hover:text-text"><slot /></a
>
