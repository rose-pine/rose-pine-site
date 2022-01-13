<script>
	import { GithubIcon, TwitterIcon } from './icons'
</script>

<footer class="mx-auto w-full max-w-6xl">
	<div
		class="px-6 md:px-10 space-x-6 h-32 bg-base flex items-center justify-between"
	>
		<p class="text-sm text-muted">
			&copy; {new Date().getFullYear()} Rosé Pine
		</p>

		<div class="space-x-4 flex items-center">
			<a
				href="https://github.com/rose-pine"
				aria-label="GitHub"
				class="w-6 h-6 flex items-center justify-center rounded hover:bg-highlight-low focus:outline-none focus:ring focus:ring-highlight-high"
			>
				<GithubIcon class="w-5 h-5" />
			</a>

			<div class="text-xs text-highlight-high">|</div>

			<a
				href="https://twitter.com/rosepinetheme"
				aria-label="Twitter"
				class="w-6 h-6 flex items-center justify-center rounded hover:bg-highlight-low focus:outline-none focus:ring focus:ring-highlight-high"
			>
				<TwitterIcon class="w-[18px] h-[18px]" />
			</a>
		</div>
	</div>
</footer>

<div class="h-2 w-full bg-gradient-to-r from-love to-rose" />
