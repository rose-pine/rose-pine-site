<script>
	import { BrandGithub, BrandTwitter } from 'tabler-icons-svelte'
</script>

<footer class="mx-auto w-full max-w-content">
	<div
		class="flex h-32 items-center justify-between space-x-6 bg-base px-6 md:px-10"
	>
		<p class="text-sm text-muted">
			&copy; {new Date().getFullYear()} Rosé Pine
		</p>

		<div class="flex items-center space-x-4">
			<a
				href="https://github.com/rose-pine"
				aria-label="GitHub"
				class="flex h-8 w-8 items-center justify-center rounded hover:bg-highlight-low focus:outline-none focus:ring focus:ring-highlight-high"
			>
				<BrandGithub size={18} />
			</a>

			<div class="text-xs text-highlight-high">|</div>

			<a
				href="https://twitter.com/rosepinetheme"
				aria-label="Twitter"
				class="flex h-8 w-8 items-center justify-center rounded hover:bg-highlight-low focus:outline-none focus:ring focus:ring-highlight-high"
			>
				<BrandTwitter size={18} />
			</a>
		</div>
	</div>
</footer>

<div class="h-2 w-full bg-gradient-to-r from-love to-rose" />
