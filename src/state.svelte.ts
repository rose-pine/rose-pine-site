type Preferences = {
	colorsAreStyled: boolean;
};

export const preferences = $state<Preferences>({
	colorsAreStyled: true,
});

export const themeSearch = $state({
	query: "",
	category: "",
});
