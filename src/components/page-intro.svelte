<script lang="ts">
	export let heading: string;
	export let subheading: Optional<string> = undefined;
	export let tagline: Optional<string> = undefined;
</script>

<section class="flex flex-col items-center justify-between gap-6 md:flex-row">
	<div class="shrink-0 text-center md:text-left">
		<h1 class="animate-enter text-xl font-bold tracking-tight">
			{heading}
		</h1>

		{#if subheading}
			<div class="h-4" />

			<p class="animate-enter font-serif italic" style="--stagger: 1">
				{subheading}
			</p>
		{/if}

		{#if tagline}
			<div class="h-2" />

			<div class="animate-enter" style="--stagger: 2">
				<p
					class="inline bg-gradient-to-r from-rose via-iris to-foam bg-clip-text text-sm font-medium tabular-nums text-transparent"
				>
					{tagline}
				</p>
			</div>
		{/if}
	</div>

	{#if $$slots.default}
		<div class="animate-enter w-full max-w-sm" style="--stagger: 1">
			<slot />
		</div>
	{/if}
</section>
