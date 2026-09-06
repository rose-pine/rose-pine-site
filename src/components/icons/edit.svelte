<script lang="ts">
	import type { IconProps } from "../../types/icon";

	let { size = 24, ...restProps }: IconProps = $props();
</script>

<svg
	aria-hidden="true"
	width={size}
	height={size}
	viewBox="0 0 24 24"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
	{...restProps}
>
	<path
		d="M1 13L1 13.8333C1 17.7426 1 19.6973 2.23988 21.0438C2.55908 21.3905 2.93144 21.7008 3.34743 21.9668C4.96328 23 7.30885 23 12 23C16.6912 23 19.0367 23 20.6526 21.9668C21.0686 21.7008 21.4409 21.3905 21.7601 21.0438C23 19.6973 23 17.7426 23 13.8333L23 10M12 3C7.30885 3 4.96328 3 3.34743 4.03323C2.93144 4.29923 2.55908 4.60953 2.23988 4.95619C1.73391 5.50569 1.43441 6.15646 1.25714 7"
		stroke="currentColor"
		stroke-width="2"
		stroke-linecap="round"
		stroke-linejoin="round"
	/>
	<path
		d="M19.3232 1.63184C20.1643 0.789127 21.5271 0.789127 22.3682 1.63184C23.2105 2.4761 23.2104 3.84612 22.3682 4.69043L13.376 13.7021C11.7966 15.1434 10.7242 15.7107 9.96387 15.9072C9.49384 16.0286 8.95745 15.8657 8.5459 15.4629C8.13466 15.0603 7.96571 14.5334 8.08008 14.0674C8.26571 13.3115 8.83117 12.2405 10.3242 10.6504L19.3232 1.63184Z"
		stroke="currentColor"
		stroke-width="2"
		stroke-linecap="round"
		stroke-linejoin="round"
	/>
</svg>
