<script lang="ts">
	import { Tabs } from "bits-ui";
	import { preferences } from "../state.svelte";
</script>

<Tabs.Root bind:value={preferences.colorStyle}>
	<Tabs.List
		class="flex h-(--badge-size) items-center justify-center gap-0.5 rounded-(--card-inner-radius) bg-muted/10 p-0.5 text-sm font-medium"
	>
		<Tabs.Trigger
			value="styled"
			class="flex h-full min-w-24 items-center justify-center rounded-md px-3.5 text-center text-sm font-medium transition  data-[state=active]:bg-surface data-[state=active]:shadow-sm data-[state=active]:dark:bg-muted/30"
		>
			Styled
		</Tabs.Trigger>

		<Tabs.Trigger
			value="plain"
			class="flex h-full min-w-24 items-center justify-center rounded-md px-3.5 text-center text-sm font-medium transition  data-[state=active]:bg-surface data-[state=active]:shadow-sm data-[state=active]:dark:bg-muted/30"
		>
			Plain
		</Tabs.Trigger>
	</Tabs.List>
</Tabs.Root>
