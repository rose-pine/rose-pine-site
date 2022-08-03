<script>
	import { _ } from 'svelte-i18n'
	import { SearchIcon } from '$lib/components/icons'

	export let query = ''
	export let label = $_('common.search.label')
	export let placeholder = $_('common.search.label')
	let element
</script>

<div
	class="flex h-12 w-full max-w-sm items-center space-x-3 overflow-hidden rounded-full bg-surface shadow-none transition-shadow focus-within:ring focus:shadow sm:h-10 lg:mt-0"
>
	<label for="search" class="pl-3">
		<span class="sr-only">{label}</span>
		<span class="text-subtle"><SearchIcon size={20} /></span>
	</label>

	<input
		id="search"
		type="text"
		bind:this={element}
		bind:value={query}
		{placeholder}
		class="h-12 w-full bg-transparent py-3 pr-3 text-sm font-medium text-text placeholder-muted focus:outline-none sm:h-10"
	/>
</div>

<svelte:body
	on:keydown={(event) => {
		if (event.key === 'Escape') {
			element.blur()
			return
		}
		if (
			(((event.ctrlKey || event.metaKey) && event.key === 'k') ||
				event.key === '/') &&
			element != null &&
			document.activeElement.tagName === 'BODY' &&
			document.activeElement !== element
		) {
			event.preventDefault()
			element.focus()
		}
	}} />
