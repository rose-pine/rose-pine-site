<script lang="ts">
	export let gradient = 'from-rose to-iris'
</script>

<span
	class="bg-gradient-to-r {gradient} bg-clip-text text-sm font-medium text-transparent"
>
	<slot />
</span>
