<script lang="ts">
	export let id: string | undefined = undefined
	export let hasPadding = true
	export let hoverable = false
	export let scheme: keyof typeof schemes = 'default'

	const schemes = {
		default: hoverable
			? 'bg-surface hover:bg-overlay text-text hover:rounded-2xl'
			: 'bg-surface text-text',
		love: hoverable
			? 'bg-love/10 hover:bg-love/20 text-love hover:rounded-2xl ring-love'
			: 'bg-love/10 text-love',
		gold: hoverable
			? 'bg-gold/10 hover:bg-gold/20 text-gold hover:rounded-2xl ring-gold'
			: 'bg-gold/10 text-gold',
		rose: hoverable
			? 'bg-rose/10 hover:bg-rose/20 text-rose hover:rounded-2xl ring-rose'
			: 'bg-rose/10 text-rose',
		pine: hoverable
			? 'bg-pine/10 hover:bg-pine/20 text-pine hover:rounded-2xl ring-pine'
			: 'bg-pine/10 text-pine',
		foam: hoverable
			? 'bg-foam/10 hover:bg-foam/20 text-foam hover:rounded-2xl ring-foam'
			: 'bg-foam/10 text-foam',
		iris: hoverable
			? 'bg-iris/10 hover:bg-iris/20 text-iris hover:rounded-2xl ring-iris'
			: 'bg-iris/10 text-iris',
	}
</script>

<div
	{id}
	class="{schemes[scheme]} {hasPadding
		? 'p-5 lg:p-10'
		: ''} flex h-full w-40 min-w-full scroll-mt-10 flex-col rounded-3xl transition-[border-radius,background-color] target:ring group-focus:ring group-focus:ring-inset {$$restProps.class}"
>
	<slot />
</div>
