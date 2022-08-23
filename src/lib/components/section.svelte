<script lang="ts">
	export let id: string | undefined = undefined
	export let paddingTop = true
</script>

<section
	{id}
	class="w-full px-page-gutter {paddingTop ? 'py-page-top' : 'pb-page-top'}"
>
	<div class="mx-auto w-full max-w-content">
		<slot />
	</div>
</section>
