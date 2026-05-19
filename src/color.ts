import type { Color, ColorFormat } from "./types/palette";

export function formatColor(
	{ hex, hsl: [h, s, l], rgb: [r, g, b] }: Color,
	format: ColorFormat,
	styled: boolean,
) {
	return {
		hex: styled ? `#${hex}` : hex,
		hsl: styled ? `hsl(${h}deg ${s}% ${l}%)` : `${h}, ${s}, ${l}`,
		rgb: styled ? `rgb(${r}, ${g}, ${b})` : `${r}, ${g}, ${b}`,
	}[format];
}
