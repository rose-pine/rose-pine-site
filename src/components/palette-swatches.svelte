<script lang="ts">
	import Card from "$components/card.svelte";
	import { specification } from "$data/palette";
</script>

<section class="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
	{#each specification as role}
		<Card id={role.id}>
			<div class="flex items-start justify-between gap-3">
				<div>
					<h2
						class="text-lg font-semibold capitalize tracking-tight target:ring"
					>
						{role.name}
					</h2>

					<p class="font-serif italic text-subtle">{role.description}</p>
				</div>

				<div class="flex items-center -space-x-1.5 sm:space-x-1.5">
					{#each role.colors as color}
						<div
							class="h-8 w-8 shrink-0 rounded-full border ring-2 ring-surface"
							style:background={color}
						/>
					{/each}
				</div>
			</div>

			<div class="h-6" />

			<ul
				role="list"
				class="flex-1 list-disc pl-[18px] leading-relaxed marker:text-muted"
			>
				{#each role.scenarios as scenario}
					<li class="text-[15px] font-medium">{scenario}</li>
				{/each}
			</ul>

			{#if role.tags}
				<div class="h-6" />

				<ul role="list" class="flex items-center space-x-1.5">
					{#each role.tags as tag}
						<li
							class="scheme-{role.id} inline-flex rounded-md px-3 py-1.5 font-mono text-sm font-semibold"
						>
							{tag}
						</li>
					{/each}
				</ul>
			{/if}
		</Card>
	{/each}
</section>
