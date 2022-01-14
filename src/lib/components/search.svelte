<script>
	import { _ } from 'svelte-i18n'
	import { SearchIcon } from '$lib/components/icons'

	export let search = ''
	export let label = $_('component.search.label')
	export let placeholder = $_('component.search.placeholder')
	let element
</script>

<div
	class="space-x-3 mt-12 lg:mt-0 w-full max-w-sm h-10 bg-surface border-2 border-transparent rounded-full shadow-none flex items-center transition-shadow overflow-hidden focus-within:border-highlight-med focus:shadow"
>
	<label for="search" class="pl-3">
		<span class="sr-only">{label}</span>
		<SearchIcon color="var(--subtle)" size={20} />
	</label>

	<input
		type="text"
		bind:this={element}
		id="search"
		placeholder={`${placeholder} ${$_('component.search.focus-help')}`}
		bind:value={search}
		class="w-full h-10 py-3 pr-3 text-sm text-text placeholder-muted font-medium bg-transparent selection:bg-highlight-high focus:outline-none"
	/>
</div>

<svelte:body
	on:keydown={(e) => {
		if (
			e.key === '/' &&
			element != null &&
			document.activeElement.tagName === 'BODY' &&
			document.activeElement !== element
		) {
			e.preventDefault()
			element.focus()
		}
	}} />
