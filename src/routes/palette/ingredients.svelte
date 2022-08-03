<script lang="ts">
	import { _ } from 'svelte-i18n'
	import palette from '@rose-pine/palette'
	import Select from '$lib/components/select.svelte'
	import { clipboard } from '$lib/store'
	import { formatColor, getSafeStorage, setSafeStorage } from '$lib/util'
	import type { ColorFormat } from '$lib/util'

	let colorFormat =
		(getSafeStorage('color-format', ['default', 'unstyled']) as ColorFormat) ||
		'default'

	$: setSafeStorage('color-format', colorFormat)

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

		<div class="-mx-6 rounded-md bg-surface p-6 sm:mx-0">
			<div class="flex items-center justify-between space-x-1 pb-6">
				<h4
					id="{variant}-ingredients"
					class="max-w-full font-display text-lg font-semibold leading-none tracking-wide"
				>
					{variantName}
				</h4>

				<Select
					id="color-format"
					bind:value={colorFormat}
					label={$_('page.palette.format_label', { default: 'Format' })}
					options={[
						[
							$_('page.palette.format_default', { default: 'Default' }),
							'default',
						],
						[
							$_('page.palette.format_unstyled', { default: 'Unstyled' }),
							'unstyled',
						],
					]}
				/>
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
							{@const formattedColor = formatColor(currentColor, colorFormat)}
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
