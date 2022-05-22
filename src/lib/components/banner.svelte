<script lang="ts">
	import type { SvelteComponent } from 'svelte'

	export let icon: SvelteComponent
	export let scheme: keyof typeof schemes = 'foam'

	const schemes = {
		love: 'bg-love-low text-love',
		gold: 'bg-gold-low text-gold',
		rose: 'bg-rose-low text-rose',
		pine: 'bg-pine-low text-pine',
		foam: 'bg-foam-low text-foam',
		iris: 'bg-iris-low text-iris',
	}
</script>

<div class="{schemes[scheme]} rounded-2xl p-6">
	<div class="flex items-center space-x-3">
		<div class="shrink-0">
			<svelte:component this={icon} size={20} />
		</div>
		<p class="font-medium"><slot /></p>
	</div>
</div>
