<script>
	import { _, locale } from 'svelte-i18n'
	import { setSafeStorage } from '$lib/util'
	import { languages } from '$lib/store'

	$: setSafeStorage('locale', $locale)
</script>

<div class="relative flex items-center">
	<label for="languages" class="sr-only">
		{$_('languages.label')}
	</label>

	<select
		id="languages"
		bind:value={$locale}
		class="w-full appearance-none rounded-md bg-highlight-low py-1 pr-7 pl-2 text-sm leading-normal text-subtle focus:outline-none focus:ring focus:ring-highlight-high"
	>
		<option value={$locale}>{$_('languages.label')}</option>
		<!-- disable selected locale to ensure element displays "Languages" -->
		{#each Object.keys($languages) as language}
			<option value={language} disabled={$locale === language}>
				{$languages[language]}
			</option>
		{/each}
	</select>

	<span
		aria-hidden="true"
		class="absolute right-0 z-10 mt-px mr-2 inline-block border-x-4 border-t-[6px] border-x-transparent border-t-muted align-middle text-subtle"
	/>
</div>
