<script lang="ts">
	import { variantKeys } from "@rose-pine/palette";
	import Card from "$components/card.svelte";
	import { IconCheck, IconCopy } from "$components/icons";
	import { specification } from "$data/palette";
	import { clipboard } from "$store";
</script>

<section class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
	{#each specification as role}
		<Card id={role.id} class="group relative overflow-hidden">
			<div class="flex justify-between gap-1.5">
				<div>
					<h2
						class="text-lg font-semibold capitalize leading-tight tracking-tight target:ring"
					>
						{role.name}
					</h2>

					<p class="mt-1 leading-snug">
						<em class="font-serif text-subtle">{role.description}</em>
					</p>
				</div>

				<div class="flex shrink-0 items-center -space-x-1.5 self-start">
					{#each role.colors as color, i}
						<div
							class="h-7 w-7 shrink-0 rounded-full border-2 ring-2 ring-surface transition dark:first:z-[3] dark:last:z-[1] dark:[&:nth-child(2)]:z-[2]"
							style:background={color}
						/>
					{/each}
				</div>
			</div>

			<div class="h-6" />

			{#if role.content}
				<p>
					{@html role.content.replaceAll(/\*\*(.*?)\*\*/g, "<b>$1</b>")}
				</p>
			{:else}
				<ul
					role="list"
					class="flex-1 list-disc pl-[18px] leading-relaxed marker:text-muted"
				>
					{#each role.scenarios as scenario}
						<li class="text-[15px] font-medium">{scenario}</li>
					{/each}
				</ul>
			{/if}

			{#if role.tags}
				<ul role="list" class="mt-6 flex items-center space-x-1.5">
					{#each role.tags as tag}
						<li
							class="scheme-{role.id} inline-flex rounded-md px-3 py-1.5 font-mono text-sm font-semibold"
						>
							{tag}
						</li>
					{/each}
				</ul>
			{/if}

			<div
				class="absolute inset-0 z-20 flex items-center justify-center bg-surface p-3 opacity-0 transition duration-200 group-focus-within:opacity-100 group-hover:opacity-100 supports-[backdrop-filter]:bg-surface/80 supports-[backdrop-filter]:backdrop-blur-md"
			>
				<div class="flex items-center gap-3.5">
					{#each role.colors as color, i}
						{@const variantName = variantKeys[i]}

						<div class="space-y-1.5 text-center">
							<p
								class="text-[11px] font-medium uppercase tracking-wide text-subtle"
							>
								{variantName}
							</p>

							<button
								on:click={() => clipboard.copy(color, variantName)}
								class="group/item flex flex-col items-center justify-center space-y-1.5"
							>
								<div
									class="h-10 w-10 rounded-full border-2"
									style:background={color}
								/>

								{#if $clipboard.position === variantName}
									<div class="text-foam">
										<IconCheck size={16} stroke={1.5} />
									</div>
								{:else}
									<div class="text-muted">
										<IconCopy size={16} stroke={1.5} />
									</div>
								{/if}
							</button>
						</div>
					{/each}
				</div>
			</div>
		</Card>
	{/each}
</section>
