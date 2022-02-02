<script>
	import { _, locale } from 'svelte-i18n'
	import { browser } from '$app/env'

	$: {
		if (browser) {
			localStorage.setItem('locale', $locale)
		}
	}
</script>

<div class="relative flex items-center">
	<label for="languages" class="sr-only">
		{$_('component.language.label')}
	</label>

	<select
		id="languages"
		bind:value={$locale}
		class="w-full appearance-none rounded-md bg-highlight-low py-1 pr-7 pl-2 text-sm leading-normal text-subtle focus:outline-none focus:ring focus:ring-highlight-high"
	>
		<option value={$locale}>{$_('component.language.label')}</option>
		<!-- disable selected locale to ensure element displays "Languages" -->
		<option value="en" disabled={$locale === 'en'}>English</option>
		<option value="fr" disabled={$locale === 'fr'}>Français</option>
		<option value="it" disabled={$locale === 'it'}>Italiano</option>
		<option value="de" disabled={$locale === 'de'}>Deutsch</option>
	</select>

	<span
		aria-hidden="true"
		class="absolute right-0 z-10 mt-px mr-2 inline-block border-x-4 border-t-[6px] border-x-transparent border-t-muted align-middle text-subtle"
	/>
</div>
