<script>
	import { _, locale } from 'svelte-i18n'
</script>

<div class="relative flex items-center">
	<label for="languages" class="sr-only">
		{$_('component.language.label')}
	</label>

	<select
		id="languages"
		bind:value={$locale}
		class="pr-7 pl-2 py-1 w-full leading-normal text-sm text-subtle bg-highlight-low rounded-md appearance-none focus:outline-none focus:ring focus:ring-highlight-high"
	>
		<option value={$locale}>{$_('component.language.label')}</option>
		<!-- disable selected locale to ensure the selected shows "Languages" -->
		<option value="en" disabled={$locale === 'en'}>English</option>
		<option value="fr" disabled={$locale === 'fr'}>Française</option>
		<option value="it" disabled={$locale === 'it'}>Italiana</option>
	</select>

	<span
		aria-hidden="true"
		class="mt-px mr-2 text-subtle border-t-[6px] border-t-muted border-x-4 border-x-transparent inline-block align-middle absolute right-0 z-10"
	/>
</div>
