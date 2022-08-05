<script lang="ts">
	import { _ } from 'svelte-i18n'
	import { page } from '$app/stores'
	import palette from '@rose-pine/palette'
	import Select from '$lib/components/select.svelte'
	import Section from '$lib/components/section.svelte'
	import PageHeading from '$lib/components/page-heading.svelte'
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

<Section>
	<PageHeading
		title={$_('page.palette.title', { default: 'Palette' })}
		description={$_('page.palette.description', {
			default: 'Curated colours, endless creations',
		})}
	>
		<div
			class="inline-flex items-center divide-x overflow-hidden rounded-md border bg-surface"
		>
			<a
				href="#swatches"
				class="px-4 py-2 text-sm font-medium focus:outline-none focus:ring focus:ring-inset
				{$page.url.hash === '' || $page.url.hash === '#swatches'
					? 'bg-surface text-text'
					: 'bg-muted/10 text-subtle'}"
			>
				{$_('common.swatches', { default: 'Swatches' })}
			</a>

			<a
				href="#ingredients"
				class="px-4 py-2 text-sm font-medium focus:outline-none focus:ring focus:ring-inset
				{$page.url.hash === '#ingredients'
					? 'bg-surface text-text'
					: 'bg-muted/10 text-subtle'}"
			>
				{$_('common.ingredients', { default: 'Ingredients' })}
			</a>
		</div>
	</PageHeading>

	<div class="animate-enter" style="--stagger: 2">
		<!-- Ingredients -->
		<div
			id="ingredients"
			class="peer hidden scroll-mt-[9999px] space-y-40 target:block"
		>
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
									{@const formattedColor = formatColor(
										currentColor,
										colorFormat
									)}
									{@const colorName = role.replace(/([A-Z])/g, ' $1')}

									<tr class="h-10 bg-surface hover:bg-muted/5">
										<td class="pl-2 text-left">
											<div class="flex items-center">
												<div
													class="mr-3 h-[18px] w-[18px] rounded-full border"
													style:background={currentColor.hex}
												/>
												<span
													class="text-sm font-medium capitalize tracking-wide"
												>
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

		<!-- Swatches -->
		<div
			id="swatches"
			class="block scroll-mt-[9999px] space-y-40 peer-target:hidden"
		>
			{#each variants as variant}
				{@const variantName = variantNames[variant]}

				<div>
					<h4
						id="{variant}-swatches"
						class="pb-6 font-display text-lg font-semibold leading-none tracking-wide"
					>
						{variantName}
					</h4>

					<div class="grid grid-cols-3 gap-4 sm:gap-6 md:grid-cols-6">
						{#each roles as role}
							{@const color = palette.variants[variant][role]}
							{@const colorName = role.replace(/([A-Z])/g, ' $1')}

							<button
								on:click={() =>
									clipboard.copy(color.hex, `${variant}.${role}.hex`)}
								class="flex h-full flex-col items-center rounded-2xl bg-gradient-to-br from-surface via-base to-surface bg-[length:200%_200%] bg-left-top shadow transition-[background-position,box-shadow] hover:bg-right-bottom focus:outline-none focus:ring dark:from-overlay dark:to-base dark:shadow-none"
							>
								<div
									class="h-10 w-full rounded-t-2xl"
									style:background={color.hex}
								/>
								<p
									class="px-2 py-6 text-center font-display text-sm font-semibold capitalize tracking-wide"
								>
									{#if $clipboard.pos === `${variant}.${role}.hex`}
										<span class="text-rose"
											>{$_('common.copied', { default: 'Copied' })}</span
										>
									{:else}
										<span>{colorName}</span>
									{/if}
								</p>
							</button>
						{/each}
					</div>
				</div>
			{/each}
		</div>
	</div>
</Section>
