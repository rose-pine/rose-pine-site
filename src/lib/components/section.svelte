<script>
	export let id = undefined
	export let backgroundColor = undefined
</script>

<section
	{id}
	class="w-full py-page-top px-page-gutter"
	style:background-color={backgroundColor}
>
	<div class="mx-auto w-full max-w-content">
		<slot />
	</div>
</section>
