<main>
	<slot />
</main>

<style lang="postcss" global>
	@tailwind base;
	@tailwind components;
	@tailwind utilities;

	body {
		@apply antialiased;
	}

	/* TODO: handle reduce motion on a case by case basis */
	@media (prefers-reduced-motion: reduce) {
		* {
			animation-delay: 0.01ms !important;
			animation-duration: 0.01ms !important;
			animation-iteration-count: 1 !important;
			transition-duration: 0.01ms !important;
		}
	}
</style>
