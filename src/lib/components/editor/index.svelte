<script>
	import Window from '$lib/components/editor/window.svelte'
	import Line from '$lib/components/editor/line.svelte'
	import Blob from '$lib/components/editor/blob.svelte'
</script>

<Window>
	<Line>
		<Blob size="md" color="pine" />
		<Blob size="sm" color="text" />
		<Blob size="sm" color="pine" />
		<Blob size="xl" color="gold" />
	</Line>

	<Line>
		<Blob size="md" color="pine" />
		<Blob size="md" color="text" />
		<Blob size="sm" color="pine" />
		<Blob size="2xl" color="gold" />
	</Line>

	<Line />

	<Line>
		<Blob size="lg" color="pine" />
		<Blob size="3xl" color="rose" />
		<Blob size="sm" color="iris" />
		<Blob size="sm" color="iris" />
		<Blob size="xs" color="subtle" />
	</Line>

	<Line indent={1}>
		<Blob size="xs" color="subtle" />
		<Blob size="lg" color="subtle" />
		<Blob size="md" color="subtle" />
	</Line>

	<Line indent={1}>
		<Blob size="md" color="love" />
		<Blob size="2xl" color="text" />
		<Blob size="lg" color="gold" />
		<Blob size="4xl" color="text" />
	</Line>

	<Line />

	<Line indent={1}>
		<Blob size="sm" color="pine" />
		<Blob size="xl" color="text" />
		<Blob size="lg" color="iris" />
		<Blob size="md" color="foam" />
		<Blob size="xs" color="subtle" />
	</Line>

	<Line indent={2}>
		<Blob size="md" color="foam" />
		<Blob size="sm" color="gold" />
	</Line>

	<Line indent={2}>
		<Blob size="md" color="foam" />
		<Blob size="2xl" color="rose" />
	</Line>

	<Line indent={2}>
		<Blob size="sm" color="foam" />
		<Blob size="md" color="gold" />
	</Line>

	<Line indent={1}>
		<Blob size="xs" color="subtle" />
	</Line>

	<Line />

	<Line indent={1}>
		<Blob size="lg" color="foam" />
		<Blob size="md" color="iris" />
		<Blob size="xs" color="pine" />
		<Blob size="sm" color="gold" />
	</Line>

	<Line indent={1}>
		<Blob size="xl" color="foam" />
		<Blob size="lg" color="iris" />
		<Blob size="xs" color="pine" />
		<Blob size="md" color="gold" />
	</Line>

	<Line indent={1}>
		<Blob size="sm" color="foam" />
		<Blob size="xl" color="iris" />
		<Blob size="xs" color="pine" />
		<Blob size="sm" color="gold" />
	</Line>

	<Line>
		<Blob size="xs" color="subtle" />
	</Line>
</Window>
