<script>
	import { InfoCircle } from 'tabler-icons-svelte'
	import Section from '$lib/components/section.svelte'
	import PageHeading from '$lib/components/page-heading.svelte'
	import Banner from '$lib/components/banner.svelte'
	import Link from '$lib/components/link.svelte'
	import ListItem from '$lib/components/list-item.svelte'
	import List from '$lib/components/list.svelte'
</script>

<Section>
	<PageHeading
		title="Add a translation"
		description="Contributing guide for translators"
	/>

	<div class="animate-enter space-y-10" style="--stagger: 2">
		<Banner icon={InfoCircle}>
			Work-in-progress document. Translations are not yet available.
		</Banner>

		<div class="space-y-10">
			<section
				class="flex flex-col space-y-6 rounded-3xl bg-surface p-6 sm:p-10"
			>
				<h3 class="font-display text-xl font-bold tracking-wide">
					New languages
				</h3>

				<List>
					<ListItem>Add a new locale</ListItem>
				</List>
			</section>

			<section
				class="flex flex-col space-y-6 rounded-3xl bg-surface p-6 sm:p-10"
			>
				<h3 class="font-display text-xl font-bold tracking-wide">
					Existing languages
				</h3>

				<List>
					<ListItem>Modify the locale file</ListItem>
				</List>
			</section>
		</div>
	</div>
</Section>
