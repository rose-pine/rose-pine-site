<script>
	import { _ } from 'svelte-i18n'
	import { SearchIcon } from '$lib/components/icons'

	export let search = ''
	export let label = $_('component.search.label')
	export let placeholder = $_('component.search.placeholder')
	let element
</script>

<div
	class="mt-12 flex h-10 w-full max-w-sm items-center space-x-3 overflow-hidden rounded-full border-2 border-transparent bg-surface shadow-none transition-shadow focus-within:border-highlight-med focus:shadow lg:mt-0"
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
		class="h-10 w-full bg-transparent py-3 pr-3 text-sm font-medium text-text placeholder-muted selection:bg-highlight-high focus:outline-none"
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
