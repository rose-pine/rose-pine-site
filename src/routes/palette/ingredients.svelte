<script lang="ts">
	import { _ } from 'svelte-i18n'
	import palette from '@rose-pine/palette'
	import Checkbox from '$lib/components/checkbox.svelte'
	import { clipboard, colorSettings } from '$lib/store'
	import { formatColor } from '$lib/util'

	const variants = Object.keys(palette.variants)
	const roles = Object.keys(palette.roles)

	const variantNames = {
		main: 'Rosé Pine',
		moon: 'Rosé Pine Moon',
		dawn: 'Rosé Pine Dawn',
	}
</script>

<div class="space-y-40">
	{#each variants as variant}
		{@const variantName = variantNames[variant]}

		<div class="-mx-6 space-y-10 rounded-md bg-surface p-6 sm:mx-0">
			<div class="flex flex-wrap items-center justify-between gap-3">
				<h4
					id="{variant}-ingredients"
					class="max-w-full font-display text-lg font-semibold leading-none tracking-wide"
				>
					{variantName}
				</h4>

				<div class="flex items-center justify-end gap-3">
					<!-- @translation title attribute -->
					<Checkbox
						id="color-format"
						title={`Toggle colour format on/off. When on, a modern format is applied, removing "," and adding "deg" to hsl degree value.`}
						bind:checked={$colorSettings.format}
					>
						<span>{$_('common.format', { default: 'Format' })}</span>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							viewBox="0 0 24 24"
							stroke-width="2"
							stroke="currentColor"
							fill="none"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							{#if $colorSettings.format}
								<path stroke="none" d="M0 0h24v24H0z" fill="none" />
								<rect x="5" y="3" width="14" height="6" rx="2" />
								<path d="M19 6h1a2 2 0 0 1 2 2a5 5 0 0 1 -5 5l-5 0v2" />
								<rect x="10" y="15" width="4" height="6" rx="1" />
							{:else}
								<path stroke="none" d="M0 0h24v24H0z" fill="none" />
								<path
									d="M7 3h10a2 2 0 0 1 2 2v2a2 2 0 0 1 -2 2h-4m-4 0h-2a2 2 0 0 1 -2 -2v-2"
								/>
								<path d="M19 6h1a2 2 0 0 1 2 2a5 5 0 0 1 -5 5m-4 0h-1v2" />
								<rect x="10" y="15" width="4" height="6" rx="1" />
								<path d="M3 3l18 18" />
							{/if}
						</svg>
					</Checkbox>

					<!-- @translation title attribute -->
					<Checkbox
						id="color-decorators"
						title={`Toggle decorations on/off. Decorations include: "#", "rgb()", and "hsl()"`}
						bind:checked={$colorSettings.decorators}
					>
						<span>{$_('common.decorations', { default: 'Decorations' })}</span>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							viewBox="0 0 24 24"
							stroke-width="2"
							stroke="currentColor"
							fill="none"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							{#if $colorSettings.decorators}
								<path stroke="none" d="M0 0h24v24H0z" fill="none" />
								<path d="M7 4a12.25 12.25 0 0 0 0 16" />
								<path d="M17 4a12.25 12.25 0 0 1 0 16" />
							{:else}
								<path stroke="none" d="M0 0h24v24H0z" fill="none" />
								<path d="M5.743 5.745a12.253 12.253 0 0 0 1.257 14.255" />
								<path
									d="M17 4a12.25 12.25 0 0 1 2.474 11.467m-1.22 2.794a12.291 12.291 0 0 1 -1.254 1.739"
								/>
								<path d="M3 3l18 18" />
							{/if}
						</svg>
					</Checkbox>
				</div>
			</div>

			<div class="overflow-x-scroll">
				<table class="w-full min-w-max">
					<thead>
						<tr class="border-b">
							<th class="pl-2 text-left text-sm">Role</th>
							<th class="pr-2 text-right text-sm">Hex</th>
							<th class="pr-2 text-right text-sm">RGB</th>
							<th class="pr-2 text-right text-sm">HSL</th>
						</tr>
					</thead>

					<tbody>
						{#each roles as role}
							{@const currentColor = palette.variants[variant][role]}
							{@const formattedColor = formatColor(
								currentColor,
								$colorSettings.format,
								$colorSettings.decorators
							)}
							{@const colorName = role.replace(/([A-Z])/g, ' $1')}

							<tr class="h-10 bg-surface hover:bg-muted/5">
								<td class="pl-2 text-left">
									<div class="flex items-center">
										<div
											class="mr-3 h-[18px] w-[18px] rounded-full border"
											style:background={currentColor.hex}
										/>
										<span class="text-sm font-medium capitalize tracking-wide">
											{colorName}
										</span>
									</div>
								</td>
								<td class="pl-6 text-right font-mono text-sm">
									<button
										on:click={() =>
											clipboard.copy(
												formattedColor.hex,
												`${variant}.${role}.hex`
											)}
										class="rounded-md px-2 py-1 hover:bg-muted/10 focus:outline-none focus:ring"
									>
										{#if $clipboard.pos === `${variant}.${role}.hex`}
											<span class="text-rose">
												{$_('common.copied', { default: 'Copied' })}
											</span>
										{:else}
											<span>{formattedColor.hex}</span>
										{/if}
									</button>
								</td>
								<td class="pl-6 text-right font-mono text-sm">
									<button
										on:click={() =>
											clipboard.copy(
												formattedColor.rgb,
												`${variant}.${role}.rgb`
											)}
										class="rounded-md px-2 py-1 hover:bg-muted/10 focus:outline-none focus:ring"
									>
										{#if $clipboard.pos === `${variant}.${role}.rgb`}
											<span class="text-rose">
												{$_('common.copied', { default: 'Copied' })}
											</span>
										{:else}
											<span>{formattedColor.rgb}</span>
										{/if}
									</button>
								</td>
								<td class="pl-6 pr-2 text-right font-mono text-sm">
									<button
										on:click={() =>
											clipboard.copy(
												formattedColor.hsl,
												`${variant}.${role}.hsl`
											)}
										class="rounded-md px-2 py-1 hover:bg-muted/10 focus:outline-none focus:ring"
									>
										{#if $clipboard.pos === `${variant}.${role}.hsl`}
											<span class="text-rose">
												{$_('common.copied', { default: 'Copied' })}
											</span>
										{:else}
											<span>{formattedColor.hsl}</span>
										{/if}
									</button>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</div>
	{/each}
</div>
