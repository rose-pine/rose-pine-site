<script lang="ts">
	export let hoverable = false
	export let scheme: keyof typeof schemes = 'default'

	const schemes = {
		default: hoverable
			? 'bg-highlight-low hover:bg-highlight-med text-text'
			: 'bg-highlight-low text-text',
		love: hoverable
			? 'bg-love-low hover:bg-love-med text-love'
			: 'bg-love-low text-love',
		gold: hoverable
			? 'bg-gold-low hover:bg-gold-med text-gold'
			: 'bg-gold-low text-gold',
		rose: hoverable
			? 'bg-rose-low hover:bg-rose-med text-rose'
			: 'bg-rose-low text-rose',
		pine: hoverable
			? 'bg-pine-low hover:bg-pine-med text-pine'
			: 'bg-pine-low text-pine',
		foam: hoverable
			? 'bg-foam-low hover:bg-foam-med text-foam'
			: 'bg-foam-low text-foam',
		iris: hoverable
			? 'bg-iris-low hover:bg-iris-med text-iris'
			: 'bg-iris-low text-iris',
	}
</script>

<div
	class="{schemes[scheme]} rounded-lg px-4 py-1.5 font-mono text-sm font-medium"
>
	<slot />
</div>
