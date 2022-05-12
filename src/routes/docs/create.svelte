<script>
	import { ExternalLink, InfoCircle } from 'tabler-icons-svelte'
	import Section from '$lib/components/section.svelte'
	import PageHeading from '$lib/components/page-heading.svelte'
	import Banner from '$lib/components/banner.svelte'
	import Button from '$lib/components/button.svelte'
	import Link from '$lib/components/link.svelte'
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
			<section class="flex flex-col rounded-3xl bg-surface p-6 sm:p-10">
				<h3>Getting started</h3>

				<p>
					Thank you for your interest in bringing Rosé Pine to more people!
					Before we begin, be sure to familiarise yourself with any guides the
					desired app provides.
				</p>

				<p>
					When possible, use <Link href="https://github.com/rose-pine/build"
						>@rose-pine/build</Link
					> to generate all three variants from one base file. This enables referencing
					the Rosé Pine palette values by name.
				</p>
			</section>

			<section class="flex flex-col rounded-3xl bg-surface p-6 sm:p-10">
				<h3>Creating your theme</h3>

				<p>
					Reference our <Link href="/docs/usage">usage documentation</Link> and begin
					creating your theme with the help of our
					<Link href="https://github.com/rose-pine/build">build tool</Link>.
				</p>
			</section>

			<section class="flex flex-col rounded-3xl bg-surface p-6 sm:p-10">
				<h3>Submitting your theme</h3>

				<p>
					Once happy with your theme, use our
					<Link href="https://github.com/rose-pine/rose-pine-template"
						>project template</Link
					>
					to setup your repo. Next, open an issue on
					<Link href="https://github.com/rose-pine/rose-pine-theme"
						>Rosé Pine</Link
					> and let us know if you'd like your repo copied or transfered to our org.
					You will be added as a maintainer on that project.
				</p>

				<p>
					Finally, we need to get your theme onto the website. Add your entry to
					the <Link
						href="https://github.com/rose-pine/rose-pine-site/blob/main/src/lib/data/themes.json"
						>themes list</Link
					> and it will be automatically formatted.
				</p>
			</section>
		</div>
	</div>
</Section>

<style lang="postcss">
	h3 {
		@apply pb-6 font-display text-xl font-bold tracking-wide;
	}
	p:not(:last-child) {
		@apply pb-3;
	}
</style>
