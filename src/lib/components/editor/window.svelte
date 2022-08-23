<div
	class="relative mx-auto h-80 w-full max-w-lg self-center overflow-hidden rounded-3xl border bg-base lg:h-96 lg:max-w-xl"
>
	<div class="flex h-14 items-center px-5">
		<div class="flex items-center space-x-2">
			<div class="h-3.5 w-3.5 rounded-full bg-muted/20" />
			<div class="h-3.5 w-3.5 rounded-full bg-muted/20" />
			<div class="h-3.5 w-3.5 rounded-full bg-muted/20" />
		</div>
	</div>

	<slot />

	<div
		class="absolute bottom-0 flex h-8 w-full items-center rounded-b-3xl bg-surface px-6 supports-blur:bg-surface/80 supports-blur:backdrop-blur-md"
	>
		<div class="flex w-full items-center font-mono text-xs text-subtle">
			<svg viewBox="0 0 15 15" fill="none" class="mr-1.5 h-2.5 w-2.5">
				<path
					d="M2.5 4.5a2 2 0 110-4 2 2 0 010 4zm0 0v6m2 2a2 2 0 11-2-2m2 2a2 2 0 00-2-2m2 2h5a3 3 0 003-3v-2m0 0a2 2 0 110-4 2 2 0 010 4z"
					stroke="currentColor"
				/>
			</svg>
			<span>main</span>
		</div>
	</div>
</div>
