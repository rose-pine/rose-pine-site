<script lang="ts">
	import palette from '@rose-pine/palette'
	import { browser } from '$app/env'

	const variants = Object.keys(palette.variants)
	const roles = Object.keys(palette.roles)

	let copied = ['', '', '']

	function copy(point: [string, string], thing: string) {
		if (browser) {
			navigator.clipboard
				.writeText(thing)
				.then(() => (copied = [...point, thing]))

			setTimeout(() => {
				copied = ['', '', '']
			}, 600)
		}
	}
</script>

{#each variants as variant}
	{@const variantName =
		variant === 'moon'
			? 'Rosé Pine Moon'
			: variant === 'dawn'
			? 'Rosé Pine Dawn'
			: 'Rosé Pine'}

	<div class="py-20">
		<div class="p-6 bg-surface rounded-md overflow-x-scroll">
			<h4
				id="{variant}-ingredients"
				class="pb-6 leading-none font-display font-semibold text-lg tracking-wide"
			>
				{variantName}
			</h4>

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
						{@const color = palette.variants[variant][role]}
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

						<tr class="h-9 odd:bg-surface even:bg-base hover:bg-highlight-low">
							<td class="pl-2 text-left">
								<div class="flex items-center">
									<div
										class="mr-4 w-[18px] h-[18px] border rounded-full"
										style:background={color.hex}
										style:border-color={borderColor}
									/>
									<span class="font-medium text-md tracking-wide"
										>{colorName}</span
									>
								</div>
							</td>
							<td class="pl-6 font-mono text-sm text-right">
								<button on:click={() => copy([variant, role], color.hex)}>
									{#if copied[0] === variant && copied[1] === role && copied[2] === color.hex}
										<span class="text-rose">copied</span>
									{:else}
										<span>{color.hex}</span>
									{/if}
								</button>
							</td>
							<td class="pl-6 font-mono text-sm text-right">
								<button on:click={() => copy([variant, role], color.rgb)}>
									{#if copied[0] === variant && copied[1] === role && copied[2] === color.rgb}
										<span class="text-rose">copied</span>
									{:else}
										<span>{color.rgb}</span>
									{/if}
								</button>
							</td>
							<td class="pl-6 pr-2 font-mono text-sm text-right">
								<button on:click={() => copy([variant, role], color.hsl)}>
									{#if copied[0] === variant && copied[1] === role && copied[2] === color.hsl}
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
{/each}
