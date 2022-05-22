<script lang="ts">
	export let id = undefined
	export let hasPadding = true
	export let hoverable = false
	export let scheme: keyof typeof schemes = 'default'

	const schemes = {
		default: hoverable
			? 'bg-surface hover:bg-overlay text-text hover:rounded-2xl ring-highlight-high'
			: 'bg-surface text-text',
		love: hoverable
			? 'bg-love-low hover:bg-love-med text-love hover:rounded-2xl ring-love'
			: 'bg-love-low text-love',
		gold: hoverable
			? 'bg-gold-low hover:bg-gold-med text-gold hover:rounded-2xl ring-gold'
			: 'bg-gold-low text-gold',
		rose: hoverable
			? 'bg-rose-low hover:bg-rose-med text-rose hover:rounded-2xl ring-rose'
			: 'bg-rose-low text-rose',
		pine: hoverable
			? 'bg-pine-low hover:bg-pine-med text-pine hover:rounded-2xl ring-pine'
			: 'bg-pine-low text-pine',
		foam: hoverable
			? 'bg-foam-low hover:bg-foam-med text-foam hover:rounded-2xl ring-foam'
			: 'bg-foam-low text-foam',
		iris: hoverable
			? 'bg-iris-low hover:bg-iris-med text-iris hover:rounded-2xl ring-iris'
			: 'bg-iris-low text-iris',
	}
</script>

<div
	{id}
	class="{schemes[scheme]} {hasPadding
		? 'p-6 sm:p-10'
		: ''} flex h-full w-40 min-w-full flex-col rounded-3xl transition-[border-radius,background-color] duration-200 group-focus:ring group-focus:ring-inset"
>
	<slot />
</div>
