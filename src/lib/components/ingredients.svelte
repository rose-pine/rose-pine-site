<script lang="ts">
	import { _ } from 'svelte-i18n'
	import palette from '@rose-pine/palette'
	import { browser } from '$app/env'

	let copiedItem = ''
	let copiedTimeout = setTimeout

	function copy(item, itemId) {
		if (browser) {
			navigator.clipboard.writeText(item).then(() => (copiedItem = itemId))

			clearTimeout(copiedTimeout)
			copiedTimeout = setTimeout(() => {
				copiedItem = ''
			}, 600)
		}
	}

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

	function format(color, mode?: Formats) {
		if (mode === 'unstyled')
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
		<div class="p-6 bg-surface rounded-md">
			<div class="pb-6 flex items-center justify-between">
				<h4
					id="{variant}-ingredients"
					class="leading-none font-display font-semibold text-lg tracking-wide max-w-full"
				>
					{variantName}
				</h4>

				<div class="pl-1 relative flex items-center">
					<label for="color-format" class="sr-only">
						{$_('component.ingredients.format-select.label')}
					</label>

					<select
						id="color-format"
						bind:value={colorFormat}
						class="pr-7 pl-2 py-1 w-full leading-normal text-sm text-subtle bg-highlight-low rounded-md appearance-none focus:outline-none focus:ring focus:ring-highlight-high"
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
						class="mt-px mr-2 text-subtle border-t-[6px] border-t-muted border-x-4 border-x-transparent inline-block align-middle absolute right-0 z-10"
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
											class="mr-3 w-[18px] h-[18px] border rounded-full"
											style:background={colors.default[variant][role].hex}
											style:border-color={borderColor}
										/>
										<span class="font-medium text-md tracking-wide"
											>{colorName}</span
										>
									</div>
								</td>
								<td class="pl-6 font-mono text-sm text-right">
									<button
										on:click={() => copy(color.hex, `${variant}.${role}.hex`)}
									>
										{#if copiedItem === `${variant}.${role}.hex`}
											<span class="text-rose">copied</span>
										{:else}
											<span>{color.hex}</span>
										{/if}
									</button>
								</td>
								<td class="pl-6 font-mono text-sm text-right">
									<button
										on:click={() => copy(color.rgb, `${variant}.${role}.rgb`)}
									>
										{#if copiedItem === `${variant}.${role}.rgb`}
											<span class="text-rose">copied</span>
										{:else}
											<span>{color.rgb}</span>
										{/if}
									</button>
								</td>
								<td class="pl-6 pr-2 font-mono text-sm text-right">
									<button
										on:click={() => copy(color.hsl, `${variant}.${role}.hsl`)}
									>
										{#if copiedItem === `${variant}.${role}.hsl`}
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
