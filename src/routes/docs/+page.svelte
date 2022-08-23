<script lang="ts">
	import Section from '$lib/components/section.svelte'
	import PageHeading from '$lib/components/page-heading.svelte'
	import Card from '$lib/components/card.svelte'
</script>

<Section>
	<PageHeading
		title="Contributing"
		description="Usage guides and documentation"
	/>

	<div class="animate-enter" style="--stagger: 2">
		<div class="grid gap-6 sm:grid-cols-3">
			<!-- TODO: Consolidate focus logic between `a` and `Card` -->
			<a href="/docs/create" class="group focus:outline-none">
				<Card hoverable hasPadding={false} scheme="foam">
					<h3
						class="flex items-center justify-center py-20 px-6 text-center font-display text-2xl tracking-wide"
					>
						Create a theme
					</h3>
				</Card>
			</a>

			<a href="/docs/translate" class="group focus:outline-none">
				<Card hoverable hasPadding={false} scheme="rose">
					<h3
						class="flex items-center justify-center py-20 px-6 text-center font-display text-2xl tracking-wide"
					>
						Add a translation
					</h3>
				</Card>
			</a>

			<a href="/docs/usage" class="group focus:outline-none">
				<Card hoverable hasPadding={false} scheme="gold">
					<h3
						class="flex items-center justify-center py-20 px-6 text-center font-display text-2xl tracking-wide"
					>
						Theme specification
					</h3>
				</Card>
			</a>
		</div>
	</div>
</Section>
