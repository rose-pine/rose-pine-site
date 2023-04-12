<script lang="ts">
	import {
		variants,
		variantKeys,
		roles,
		roleKeys,
		colorFormats,
	} from "@rose-pine/palette";
	import { IconParentheses, IconParenthesesOff } from "@tabler/icons-svelte";
	import Card from "$components/card.svelte";
	import Checkbox from "$components/checkbox.svelte";
	import { formatColor } from "$data/palette";
	import { clipboard, storage } from "$store";
</script>

<div class="space-y-20">
	{#each variantKeys as variant}
		{@const currentVariant = variants[variant]}

		<Card id={currentVariant.id}>
			<div class="flex flex-wrap items-center justify-between gap-6">
				<div class="flex shrink-0 items-center space-x-3">
					<img
						width="32"
						height="32"
						src="/assets/logo-{currentVariant.key}.png"
						alt="{currentVariant.name} flower logo"
						class="rounded-full border"
					/>
					<h2
						class="max-w-full font-display text-lg font-semibold leading-none tracking-tight"
					>
						{currentVariant.name}
					</h2>
				</div>

				<Checkbox
					id={`${currentVariant.id}-decorations`}
					bind:checked={$storage.decorations}
				>
					<span>Decorations&nbsp;</span>
					{#if $storage.decorations}
						<IconParentheses size={16} aria-hidden="true" />
					{:else}
						<IconParenthesesOff size={16} aria-hidden="true" />
					{/if}
				</Checkbox>
			</div>

			<div class="h-6" />

			<div class="overflow-x-scroll">
				<table class="w-full min-w-max overflow-x-scroll">
					<thead>
						<tr class="border-b">
							<th class="pl-2 text-left text-sm">Role</th>
							<th class="pr-4 text-right text-sm">Hex</th>
							<th class="pr-4 text-right text-sm">RGB</th>
							<th class="pr-4 text-right text-sm">HSL</th>
						</tr>
					</thead>

					<tbody>
						{#each roleKeys as role}
							{@const currentRole = roles[role]}
							{@const currentColor = currentRole.colors[variant]}
							{@const formattedColor = formatColor(
								currentColor,
								$storage.decorations
							)}

							<tr
								class="h-10 bg-surface transition even:bg-muted/5 hover:bg-muted/10"
							>
								<td class="pl-2 text-left">
									<div class="flex items-center space-x-3">
										<div
											class="h-[18px] w-[18px] rounded-full border"
											style:background={`#${currentColor.hex}`}
										/>
										<span class="text-sm font-semibold capitalize">
											{currentRole.name}
										</span>
									</div>
								</td>

								{#each colorFormats as format}
									{@const position = `${variant}.${role}.${format}`}

									<td class="pl-6 text-right font-mono text-sm">
										<button
											on:click={() =>
												clipboard.copy(formattedColor[format], position)}
											class="rounded-md px-2 py-1 transition hover:bg-foam/10 hover:text-foam focus:outline-none focus:ring"
										>
											{#if $clipboard.position === position}
												<span class="text-foam">Copied</span>
											{:else}
												<span>{formattedColor[format]}</span>
											{/if}
										</button>
									</td>
								{/each}
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</Card>
	{/each}
</div>
