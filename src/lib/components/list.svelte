<script lang="ts">
	import { setContext } from 'svelte'

	export let showNumbers = true

	let pos = 0
	setContext('list-number', {
		shouldShow: showNumbers,
		get: () => (pos += 1),
	})
</script>

<ul
	class="flex flex-col space-y-6 leading-relaxed marker:text-subtle sm:space-y-3"
>
	<slot />
</ul>
