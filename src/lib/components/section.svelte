<script>
	export let id = undefined
	export let backgroundColor = undefined
</script>

<section {id} class="py-20 w-full" style:background-color={backgroundColor}>
	<div class="mx-auto px-6 md:px-10 w-full max-w-6xl">
		<slot />
	</div>
</section>
