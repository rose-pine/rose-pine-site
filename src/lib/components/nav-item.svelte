<script>
	import { page } from '$app/stores'

	export let href = ''
	export let label = ''
	export let showActive = true
</script>

<a
	{href}
	class="px-2 py-1 w-full text-sm sm:text-md text-subtle rounded-md hover:bg-highlight-low focus:outline-none focus:ring focus:ring-highlight-high"
	class:active={showActive && $page.url.pathname === href}
>
	{label}
</a>

<style>
	.active {
		@apply text-text;
	}
</style>
