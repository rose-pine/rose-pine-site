<script>
	import { BrandGithub, BrandTwitter } from 'tabler-icons-svelte'
</script>

<footer class="flex justify-center px-page-gutter">
	<div
		class="flex h-footer-height w-full max-w-content items-center justify-between space-x-3"
	>
		<p class="text-sm text-muted">
			&copy; {new Date().getFullYear()} Rosé Pine
		</p>

		<div class="flex items-center space-x-4">
			<a
				href="https://github.com/rose-pine"
				aria-label="GitHub"
				class="flex h-8 w-8 items-center justify-center rounded hover:bg-muted/5 focus:outline-none focus:ring"
			>
				<BrandGithub size={18} />
			</a>

			<div class="h-6 w-px shrink-0 bg-muted/30" aria-hidden="true" />

			<a
				href="https://twitter.com/rosepinetheme"
				aria-label="Twitter"
				class="flex h-8 w-8 items-center justify-center rounded hover:bg-muted/5 focus:outline-none focus:ring"
			>
				<BrandTwitter size={18} />
			</a>
		</div>
	</div>
</footer>
