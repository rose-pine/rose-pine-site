<script lang="ts">
	const menu = [
		["GitHub", "https://github.com/rose-pine"],
		["Discord", "https://discord.gg/r6wf35KVJW"],
		["Twitter", "https://twitter.com/rosepinetheme"],
	];
</script>

<footer
	class="flex h-footer-height items-center justify-center border-t px-page-gutter"
>
	<div
		class="flex w-full max-w-content flex-col-reverse items-center justify-between gap-3 sm:flex-row sm:gap-0"
	>
		<p class="text-sm text-muted">
			Copyright &copy; {new Date().getFullYear()} Rosé Pine
		</p>

		<nav aria-label="Media">
			<ul role="list" class="flex items-center">
				{#each menu as [name, href]}
					<li>
						<a
							{href}
							class="rounded-md px-2.5 py-1.5 text-sm font-medium text-subtle transition hover:text-text focus:outline-none focus:ring focus:ring-inset"
						>
							{name}
						</a>
					</li>
				{/each}
			</ul>
		</nav>
	</div>
</footer>
