import type { Color } from "@rose-pine/palette";

function formatColor(
	color: Color,
	showDecorations: boolean
): Record<keyof Color, string> {
	const { hex, rgb, hsl } = color;
	const [r, g, b] = rgb;
	const [h, s, l] = hsl;

	if (showDecorations) {
		return {
			hex: `#${hex}`,
			rgb: `rgb(${r}, ${g}, ${b})`,
			hsl: `hsl(${h}deg, ${s}%, ${l}%)`,
		};
	}

	return { hex, rgb: rgb.join(","), hsl: hsl.join(",") };
}

export { formatColor };
