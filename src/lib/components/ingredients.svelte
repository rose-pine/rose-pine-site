<script lang="ts">
	import { _ } from 'svelte-i18n'
	import palette from '@rose-pine/palette'
	import { browser } from '$app/env'
	import { clipboard } from '$lib/store'

	const formats = ['default', 'unstyled'] as const
	type Format = typeof formats[number]
	let colorFormat: Format = 'default'

	if (browser) {
		colorFormat = (localStorage.getItem('color-format') as Format) || 'default'
		if (!formats.includes(colorFormat)) {
			colorFormat = 'default'
		}
	}

	$: {
		if (browser) {
			localStorage.setItem('color-format', colorFormat)
		}
	}

	function format(
		color: { hex: string; rgb: string; hsl: string },
		format?: Format
	) {
		if (format === 'unstyled')
			return {
				hex: color.hex.replace('#', ''),
				rgb: color.rgb.replace('rgb(', '').replace(')', ''),
				hsl: color.hsl.replace('hsl(', '').replace(')', ''),
			}

		return color
	}

	let colors = { default: {}, unstyled: {} }

	const variants = Object.keys(palette.variants)
	const roles = Object.keys(palette.roles)

	variants.map((variant) => {
		colors.default[variant] = {}
		colors.unstyled[variant] = {}

		roles.map((role) => {
			let currentColor = palette.variants[variant][role]

			colors.default[variant][role] = format(currentColor, 'default')
			colors.unstyled[variant][role] = format(currentColor, 'unstyled')
		})
	})
</script>

{#each variants as variant}
	{@const variantName =
		variant === 'moon'
			? 'Rosé Pine Moon'
			: variant === 'dawn'
			? 'Rosé Pine Dawn'
			: 'Rosé Pine'}

	<div class="py-20">
		<div class="rounded-md bg-surface p-6">
			<div class="flex items-center justify-between pb-6">
				<h4
					id="{variant}-ingredients"
					class="max-w-full font-display text-lg font-semibold leading-none tracking-wide"
				>
					{variantName}
				</h4>

				<div class="relative flex items-center pl-1">
					<label for="color-format" class="sr-only">
						{$_('component.ingredients.format-select.label')}
					</label>

					<select
						id="color-format"
						bind:value={colorFormat}
						class="w-full appearance-none rounded-md bg-highlight-low py-1 pr-7 pl-2 text-sm leading-normal text-subtle focus:outline-none focus:ring focus:ring-highlight-high"
					>
						<option value={colorFormat}
							>{$_('component.ingredients.format-select.options.format')}
						</option>
						<option value="default" disabled={colorFormat === 'default'}
							>{$_('component.ingredients.format-select.options.default')}
						</option>
						<option value="unstyled" disabled={colorFormat === 'unstyled'}
							>{$_('component.ingredients.format-select.options.unstyled')}
						</option>
					</select>

					<span
						aria-hidden="true"
						class="absolute right-0 z-10 mt-px mr-2 inline-block border-x-4 border-t-[6px] border-x-transparent border-t-muted align-middle text-subtle"
					/>
				</div>
			</div>
			<div class="overflow-x-scroll">
				<table class="w-full min-w-max">
					<thead>
						<tr class="border-b">
							<th class="pl-2 text-left text-md">Role</th>
							<th class="pr-2 text-right text-md">Hex</th>
							<th class="pr-2 text-right text-md">RGB</th>
							<th class="pr-2 text-right text-md">HSL</th>
						</tr>
					</thead>

					<tbody>
						{#each roles as role}
							{@const color = colors[colorFormat][variant][role]}
							{@const colorName =
								role === 'highlightLow'
									? 'highlight low'
									: role === 'highlightMed'
									? 'highlight med'
									: role === 'highlightHigh'
									? 'highlight high'
									: role}
							{@const borderColor =
								colorName.length > 4 || colorName === 'base'
									? 'var(--muted)'
									: color.hex}

							<tr
								class="h-9 odd:bg-surface even:bg-base hover:bg-highlight-low"
							>
								<td class="pl-2 text-left">
									<div class="flex items-center">
										<div
											class="mr-3 h-[18px] w-[18px] rounded-full border"
											style:background={colors.default[variant][role].hex}
											style:border-color={borderColor}
										/>
										<span class="text-md font-medium tracking-wide"
											>{colorName}</span
										>
									</div>
								</td>
								<td class="pl-6 text-right font-mono text-sm">
									<button
										on:click={() =>
											clipboard.copy(color.hex, `${variant}.${role}.hex`)}
									>
										{#if $clipboard.pos === `${variant}.${role}.hex`}
											<span class="text-rose">copied</span>
										{:else}
											<span>{color.hex}</span>
										{/if}
									</button>
								</td>
								<td class="pl-6 text-right font-mono text-sm">
									<button
										on:click={() =>
											clipboard.copy(color.rgb, `${variant}.${role}.rgb`)}
									>
										{#if $clipboard.pos === `${variant}.${role}.rgb`}
											<span class="text-rose">copied</span>
										{:else}
											<span>{color.rgb}</span>
										{/if}
									</button>
								</td>
								<td class="pl-6 pr-2 text-right font-mono text-sm">
									<button
										on:click={() =>
											clipboard.copy(color.hsl, `${variant}.${role}.hsl`)}
									>
										{#if $clipboard.pos === `${variant}.${role}.hsl`}
											<span class="text-rose">copied</span>
										{:else}
											<span>{color.hsl}</span>
										{/if}
									</button>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</div>
	</div>
{/each}
