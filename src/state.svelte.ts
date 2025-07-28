type Preferences = {
	colorsAreStyled: boolean;
};

export const preferences = $state<Preferences>({
	colorsAreStyled: true,
});
