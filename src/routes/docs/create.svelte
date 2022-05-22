<script>
	import { ExternalLink, InfoCircle } from 'tabler-icons-svelte'
	import Section from '$lib/components/section.svelte'
	import PageHeading from '$lib/components/page-heading.svelte'
	import Banner from '$lib/components/banner.svelte'
	import Button from '$lib/components/button.svelte'
	import Link from '$lib/components/link.svelte'
	import ListItem from '$lib/components/list-item.svelte'
	import List from '$lib/components/list.svelte'
</script>

<Section>
	<PageHeading
		title="Create a theme"
		description="Contributing guide for designers and creators"
	>
		<Button href="https://github.com/rose-pine/rose-pine-template">
			<span>Project Template</span>
			<ExternalLink size={16} />
		</Button>
	</PageHeading>

	<div class="animate-enter space-y-10" style="--stagger: 2">
		<Banner icon={InfoCircle}>
			Work-in-progress document. Translations are not yet available.
		</Banner>

		<div class="space-y-10">
			<section
				class="flex flex-col space-y-6 rounded-3xl bg-surface p-6 sm:p-10"
			>
				<h3 class="font-display text-xl font-bold tracking-wide">
					Official themes
				</h3>

				<p>
					Official themes follow our <Link href="/docs/usage">usage guide</Link>
					and exist in the Rosé Pine organization.
				</p>

				<List>
					<ListItem>
						<strong>Create a repository</strong> based on the Rosé Pine <Link
							href="https://github.com/rose-pine/rose-pine-template/generate"
							>template</Link
						>
					</ListItem>

					<ListItem>
						<strong>Build your theme</strong> using the official <Link
							href="https://github.com/rose-pine/build">build tool</Link
						> when possible
					</ListItem>

					<ListItem>
						<strong>Submit your theme</strong> by <Link
							href="https://github.com/rose-pine/rose-pine-theme/issues/new?assignees=&labels=new+theme&template=add-theme.yml&title=New+theme+for+%3Capp%3E"
							>creating an issue</Link
						> and we'll invite you to the organization
					</ListItem>
				</List>
			</section>

			<section
				class="flex flex-col space-y-6 rounded-3xl bg-surface p-6 sm:p-10"
			>
				<h3 class="font-display text-xl font-bold tracking-wide">
					Community themes
				</h3>

				<p>
					Community themes use the Rosé Pine <Link href="/palette">palette</Link
					> but are not required to strictly follow our <Link href="/docs/usage"
						>usage guide</Link
					>.
				</p>

				<List>
					<ListItem>
						<strong>Update your colors</strong> to match our palette
					</ListItem>

					<ListItem>
						<strong>Add your theme</strong> to the Rosé Pine site's <Link
							href="https://github.com/rose-pine/rose-pine-site/blob/main/src/themes.json"
							>list of themes</Link
						>
					</ListItem>
				</List>
			</section>
		</div>
	</div>
</Section>
