<script lang="ts">
	export let hoverable = false
	export let scheme: keyof typeof schemes = 'default'

	const schemes = {
		default: hoverable
			? 'bg-muted/10 hover:bg-muted/20 text-text'
			: 'bg-muted/10 text-text',
		love: hoverable
			? 'bg-love/10 hover:bg-love/20 text-love'
			: 'bg-love/10 text-love',
		gold: hoverable
			? 'bg-gold/10 hover:bg-gold/20 text-gold'
			: 'bg-gold/10 text-gold',
		rose: hoverable
			? 'bg-rose/10 hover:bg-rose/20 text-rose'
			: 'bg-rose/10 text-rose',
		pine: hoverable
			? 'bg-pine/10 hover:bg-pine/20 text-pine'
			: 'bg-pine/10 text-pine',
		foam: hoverable
			? 'bg-foam/10 hover:bg-foam/20 text-foam'
			: 'bg-foam/10 text-foam',
		iris: hoverable
			? 'bg-iris/10 hover:bg-iris/20 text-iris'
			: 'bg-iris/10 text-iris',
	}
</script>

<div
	class="{schemes[scheme]} rounded-lg px-4 py-1.5 font-mono text-sm font-medium"
>
	<slot />
</div>
