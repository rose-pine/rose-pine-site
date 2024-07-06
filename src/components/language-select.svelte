<script lang="ts">
	import i18next, { t } from "i18next";
	import { localizePath } from "astro-i18next";
	import { pathname } from "$store";

	let activator: HTMLElement;

	const supportedLanguages = i18next.languages;
	const currentLanguage = i18next.language;

	const languageNames = {
		ca: "Català",
		de: "Deutsch",
		en: "English",
		es: "Español",
		fr: "Français",
		id: "Bahasa Indonesia",
		it: "Italiano",
		nl: "Nederlands",
		sv: "Svenska",
                tr: "Türkçe",
		"zh-CN": "简体中文",
	};
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<span
	class="group relative inline-block"
	on:mouseenter={() => activator.setAttribute("aria-expanded", "true")}
	on:mouseleave={() => activator.setAttribute("aria-expanded", "false")}
>
	<button
		type="button"
		bind:this={activator}
		aria-expanded="false"
		aria-controls={`${currentLanguage}-dropdown`}
		class="flex h-8 items-center rounded-md px-3 text-text focus:outline-none focus:ring group-focus-within:bg-muted/10 group-hover:bg-muted/10"
	>
		<slot>
			<span class="sr-only">{t("navigation.languages")}</span>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="20"
				height="20"
				viewBox="0 0 24 24"
				stroke-width="2"
				stroke="currentColor"
				fill="none"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				<path d="M4 6h7M9 6c0 4.418-2.239 8-5 8" />
				<path d="M5 10c0 2.144 2.952 3.908 6.7 4M12 21l4-9 4 9M19.1 19h-6.2" />
				<path d="m6 2 1 1" />
			</svg>
		</slot>

		<span class="group-focus-within:rotate-180 group-hover:rotate-180">
			<svg
				aria-hidden="true"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 20 20"
				fill="currentColor"
				class="h-4 w-4"
			>
				<path
					fill-rule="evenodd"
					d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
					clip-rule="evenodd"
				/>
			</svg>
		</span>
	</button>

	<ul
		id="language-dropdown"
		role="list"
		class="invisible absolute -right-[4px] top-[calc(100%-4px)] z-20 w-40 origin-top-right scale-[.97] rounded-md bg-surface p-2 opacity-0 shadow-lg transition group-focus-within:visible group-focus-within:scale-100 group-focus-within:opacity-100 group-hover:visible group-hover:scale-100 group-hover:opacity-100"
	>
		{#each supportedLanguages as supportedLanguage}
			{@const href = localizePath($pathname, supportedLanguage)}

			<li>
				<a
					{href}
					aria-current={supportedLanguage === currentLanguage}
					class="{supportedLanguage === currentLanguage
						? 'pointer-events-none text-muted'
						: 'text-text hover:bg-muted/10'} flex h-8 items-center rounded-md px-2 text-[15px] font-medium transition focus:outline-none focus:ring"
					>{languageNames[supportedLanguage] ?? "Unnamed"}</a
				>
			</li>
		{/each}
	</ul>
</span>
