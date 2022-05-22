<script>
	import { InfoCircle } from 'tabler-icons-svelte'
	import Section from '$lib/components/section.svelte'
	import PageHeading from '$lib/components/page-heading.svelte'
	import Banner from '$lib/components/banner.svelte'
	import Chip from '$lib/components/chip.svelte'
	import RoleCard from '$lib/components/role-card.svelte'
</script>

<Section>
	<PageHeading
		title="Theme specification"
		description="Palette usage and roles"
	/>

	<div class="animate-enter space-y-6" style="--stagger: 2">
		<Banner icon={InfoCircle}>
			Work-in-progress document. Translations are not yet available.
		</Banner>

		<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
			<RoleCard role="base">
				<svelte:fragment slot="description">Primary background</svelte:fragment>

				<svelte:fragment slot="list">
					<li>General backgrounds, e.g. windows, tabs</li>
					<li>Extended panels, e.g. sidebars</li>
				</svelte:fragment>
			</RoleCard>

			<RoleCard role="surface">
				<svelte:fragment slot="description"
					>Low contrast background atop <a href="#base">base</a
					></svelte:fragment
				>

				<svelte:fragment slot="list">
					<li>Secondary panels, e.g. editor terminals</li>
					<li>Inputs, e.g. text search, checkboxes</li>
				</svelte:fragment>
			</RoleCard>

			<RoleCard role="overlay">
				<svelte:fragment slot="description"
					>Medium contrast background atop <a href="#surface">surface</a
					></svelte:fragment
				>

				<svelte:fragment slot="list">
					<li>Active backgrounds, e.g. tabs, list items</li>
					<li>Inputs, e.g. text search, checkboxes</li>
					<li>Hover selections</li>
					<li>Terminal black</li>
				</svelte:fragment>
			</RoleCard>

			<RoleCard role="muted">
				<svelte:fragment slot="description"
					>Low contrast foreground</svelte:fragment
				>

				<svelte:fragment slot="list">
					<li>Ignored content, e.g. filenames ignored by Git</li>
					<li>Terminal bright black</li>
				</svelte:fragment>

				<svelte:fragment slot="chips">
					<Chip><span class="text-muted">Comments</span></Chip>
				</svelte:fragment>
			</RoleCard>

			<RoleCard role="subtle">
				<svelte:fragment slot="description"
					>Medium contrast foreground</svelte:fragment
				>

				<svelte:fragment slot="list">
					<li>Inactive foregrounds, e.g. tabs, list items</li>
				</svelte:fragment>

				<svelte:fragment slot="chips">
					<Chip><span class="text-subtle">Operators</span></Chip>
					<Chip><span class="text-subtle">Punctuation</span></Chip>
				</svelte:fragment>
			</RoleCard>

			<RoleCard role="text">
				<svelte:fragment slot="description"
					>High contrast foreground</svelte:fragment
				>

				<svelte:fragment slot="list">
					<li>Active foregrounds, e.g. tabs, list items</li>
					<li>
						Cursor foreground paired with <a href="#highlight-high"
							>highlight high</a
						> background
					</li>
					<li>
						Selection foreground paired with <a href="#highlight-med"
							>highlight med</a
						> background
					</li>
					<li>Terminal white, bright white</li>
				</svelte:fragment>

				<svelte:fragment slot="chips">
					<Chip><span class="text-text">Variables</span></Chip>
				</svelte:fragment>
			</RoleCard>

			<RoleCard role="love">
				<svelte:fragment slot="description">Be kind; love all</svelte:fragment>

				<svelte:fragment slot="list">
					<li>Diagnostic errors</li>
					<li>Deleted files in Git</li>
					<li>Terminal red, bright red</li>
				</svelte:fragment>

				<svelte:fragment slot="chips">
					<Chip><span class="text-love">Built-ins</span></Chip>
				</svelte:fragment>
			</RoleCard>

			<RoleCard role="gold">
				<svelte:fragment slot="description"
					>Wealth is not gold, but the feeling of</svelte:fragment
				>
				<svelte:fragment slot="list">
					<li>Diagnostic warnings</li>
					<li>Terminal yellow, bright yellow</li>
				</svelte:fragment>

				<svelte:fragment slot="chips">
					<Chip><span class="text-gold">Strings</span></Chip>
				</svelte:fragment>
			</RoleCard>

			<RoleCard role="rose">
				<svelte:fragment slot="description"
					>A beautiful yet cautious blossom</svelte:fragment
				>
				<svelte:fragment slot="list">
					<li>
						Matching search background paired with <a href="#base">base</a> foreground
					</li>
					<li>Modified files in Git</li>
					<li>Terminal cyan, bright cyan</li>
				</svelte:fragment>

				<svelte:fragment slot="chips">
					<Chip><span class="text-rose">Booleans</span></Chip>
				</svelte:fragment>
			</RoleCard>

			<RoleCard role="pine">
				<svelte:fragment slot="description"
					>Fresh winter greenery</svelte:fragment
				>
				<svelte:fragment slot="list">
					<li>Renamed files in Git</li>
					<li>Terminal green, bright green</li>
				</svelte:fragment>

				<svelte:fragment slot="chips">
					<Chip><span class="text-pine">Functions</span></Chip>
				</svelte:fragment>
			</RoleCard>

			<RoleCard role="foam">
				<svelte:fragment slot="description">Summer bubbles</svelte:fragment>
				<svelte:fragment slot="list">
					<li>Additions in Git</li>
					<li>Diagnostic information</li>
					<li>Terminal blue, bright blue</li>
				</svelte:fragment>

				<svelte:fragment slot="chips">
					<Chip><span class="text-foam">Keys</span></Chip>
					<Chip><span class="text-foam">Tags</span></Chip>
				</svelte:fragment>
			</RoleCard>

			<RoleCard role="iris">
				<svelte:fragment slot="description"
					>Smells of groundedness</svelte:fragment
				>
				<svelte:fragment slot="list">
					<li>Merged and staged changes in Git</li>
					<li>Diagnostic hints</li>
					<li>Inline links</li>
					<li>Terminal magenta, bright magenta</li>
				</svelte:fragment>

				<svelte:fragment slot="chips">
					<Chip><span class="text-iris">Parameters</span></Chip>
				</svelte:fragment>
			</RoleCard>

			<RoleCard role="highlight low">
				<svelte:fragment slot="description"
					>Low contrast highlight</svelte:fragment
				>
				<svelte:fragment slot="list">
					<li>Cursorline background</li>
				</svelte:fragment>
			</RoleCard>

			<RoleCard role="highlight med">
				<svelte:fragment slot="description"
					>Medium contrast highlight</svelte:fragment
				>
				<svelte:fragment slot="list">
					<li>
						Selection background paired with <a href="#text">text</a> foreground
					</li>
				</svelte:fragment>
			</RoleCard>

			<RoleCard role="highlight high">
				<svelte:fragment slot="description"
					>High contrast highlight</svelte:fragment
				>
				<svelte:fragment slot="list">
					<li>Borders / visual dividers</li>
					<li>
						Cursor background paired with <a href="#text">text</a> foreground
					</li>
				</svelte:fragment>
			</RoleCard>
		</div>
	</div>
</Section>
