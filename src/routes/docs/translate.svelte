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
			We are moving to a different internationalisation library and will update
			this document once complete.
		</Banner>

		<div class="space-y-10">
			<section
				class="flex flex-col space-y-6 rounded-3xl bg-surface p-6 sm:p-10"
			>
				<h3 class="font-display text-xl font-bold tracking-wide">
					New languages
				</h3>

				<p>
					We are working on simplifying these steps. Please open an issue if you
					get stuck and we'll gladly help out.
				</p>

				<List>
					<ListItem
						><strong>Create a new locale file</strong> inside
						<code>src/lib/locales/</code></ListItem
					>
					<ListItem
						><strong>Import your locale</strong> inside
						<code>routes/__layout.svelte</code></ListItem
					>
					<ListItem
						><strong>Declare your locale</strong> in the <code>locales</code>
						array as well as <code>addMessages(...)</code></ListItem
					>
					<ListItem
						><strong>Add your locale</strong> as a meta tag inside the head of
						<code>src/app.html</code></ListItem
					>
					<ListItem
						><strong>Test your locale</strong> within
						<code>test/locales.js</code>
					</ListItem>
				</List>
			</section>

			<section
				class="flex flex-col space-y-6 rounded-3xl bg-surface p-6 sm:p-10"
			>
				<h3 class="font-display text-xl font-bold tracking-wide">
					Existing languages
				</h3>

				<List>
					<ListItem
						><strong>Ask questions</strong> if anything is unclear. Translations
						can be complicated!</ListItem
					>
					<ListItem
						><strong>Update translations</strong> within the respective <Link
							href="https://github.com/rose-pine/rose-pine-site/tree/main/src/lib/locales"
							>locale file</Link
						></ListItem
					>
				</List>
			</section>
		</div>
	</div>
</Section>
