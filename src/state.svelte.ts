type Preferences = {
	colorStyle: ColorStyle;
};

export const preferences = $state<Preferences>({
	colorStyle: "styled",
});
