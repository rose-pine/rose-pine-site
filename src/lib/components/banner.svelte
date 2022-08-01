<script lang="ts">
	import type { SvelteComponent } from 'svelte'

	export let icon: SvelteComponent
	export let scheme: keyof typeof schemes = 'foam'

	const schemes = {
		love: 'bg-love/10 text-love',
		gold: 'bg-gold/10 text-gold',
		rose: 'bg-rose/10 text-rose',
		pine: 'bg-pine/10 text-pine',
		foam: 'bg-foam/10 text-foam',
		iris: 'bg-iris/10 text-iris',
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
