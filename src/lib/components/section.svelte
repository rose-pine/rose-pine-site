<script>
	export let id = undefined
	export let backgroundColor = undefined
</script>

<section {id} class="w-full py-20" style:background-color={backgroundColor}>
	<div class="mx-auto w-full max-w-content px-6 md:px-10">
		<slot />
	</div>
</section>
