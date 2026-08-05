<script lang="ts">
	import type { Repo } from "../types/theme";
	import { getLocaleFromUrl, useTranslatedPath } from "../utilities/i18n";
	import { isValidIconCategory } from "../utilities/icons";
	import { UsersIcon } from "./icons";
	import ThemeIcon from "./theme-icon.svelte";

	let { theme, query = "" }: { theme: Repo; query?: string } = $props();

	let locale = getLocaleFromUrl();
	let translatePath = useTranslatedPath(locale);

	let matchedSubtheme = $derived.by(() => {
		if (!query) return null;
		const q = query.toLowerCase();
		if (theme.name.toLowerCase().includes(q)) return null;
		return (
			theme.subthemes.find((s) => s.name.toLowerCase().includes(q)) ?? null
		);
	});
</script>

<article>
	<a
		href={translatePath(`/themes/${theme.slug}`)}
		aria-labelledby={theme.slug}
		class="group isolate flex items-center gap-3 rounded-xl border border-muted/20 bg-surface px-4 py-3 hover:bg-muted/5"
	>
		{#if isValidIconCategory(theme.category)}
			<ThemeIcon size="md" category={theme.category} />
		{/if}
		<div class="flex flex-col truncate opacity-90 group-hover:opacity-100">
			{#snippet contributors(number: number)}
				<div class="flex items-center gap-1.5">
					<h2 id={theme.slug} class="shrink truncate font-semibold text-nowrap">
						{theme.name}
					</h2>
					{#if matchedSubtheme}
						<span class="shrink-0 truncate text-xs font-medium text-subtle">
							— "{matchedSubtheme.name}"
						</span>
					{/if}
				</div>
				<div
					class="mt-0.5 flex items-center gap-1 text-xs font-medium text-subtle"
				>
					<UsersIcon size={12} />
					<span class="pbe-px"
						>{number} contributor{number == 1 ? "" : "s"}</span
					>
				</div>
			{/snippet}
			{@render contributors(theme.contributors.length)}
		</div>
	</a>
</article>
