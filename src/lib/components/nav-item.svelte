<script>
	import { page } from '$app/stores'

	export let href = ''
	export let label = ''
</script>

<a
	{href}
	class="w-full rounded-md px-2 py-1 text-sm text-subtle hover:bg-muted/5 focus:outline-none focus:ring"
	class:active={$page.url.pathname.includes(href)}
>
	{label}
</a>

<style lang="postcss">
	.active {
		@apply text-text;
	}
</style>
