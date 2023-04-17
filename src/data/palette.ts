import {
	roles,
	roleKeys,
	type RoleColors,
	type Color,
} from "@rose-pine/palette";

function getColorsFromRole({ main, moon, dawn }: RoleColors) {
	return [`#${main.hex}`, `#${moon.hex}`, `#${dawn.hex}`];
}

const roleDetails = {
	base: {
		description: "Primary background",
		scenarios: [
			"General background, e.g. windows, tabs",
			"Extended panels, e.g. sidebars",
		],
	},
	surface: {
		description: "Secondary background atop base",
		scenarios: [
			"Accessory panels, e.g. popups, floats, editor terminals",
			"Inputs, e.g. text search, checkboxes",
		],
	},
	overlay: {
		description: "Tertiary background atop surface",
		scenarios: [
			"Active backgrounds, e.g. tabs, list items",
			"High contrast inputs, e.g. text search, checkboxes",
			"Hover selections",
			"Terminal black",
		],
	},
	muted: {
		description: "Low contrast foreground",
		scenarios: [
			"Ignored content, e.g. ignored Git files",
			"Terminal bright black",
		],
		tags: ["comments"],
	},
	subtle: {
		description: "Medium contrast foreground",
		scenarios: ["Inactive foregrounds, e.g. tabs, list items"],
		tags: ["operators", "punctuation"],
	},
	text: {
		description: "High contrast foreground",
		scenarios: [
			"Active foregrounds, e.g. tabs, list items",
			"Cursor foreground paired with highlight high background",
			"Selection foreground paired with highlight med background",
			"Terminal white, bright white",
		],
		tags: ["variables"],
	},
	love: {
		description: "Per favore ama tutti",
		scenarios: [
			"Diagnostic errors",
			"Deleted Git files",
			"Terminal red, bright red",
		],
		tags: ["builtins"],
	},
	gold: {
		description: "Lemon tea on a summer morning",
		scenarios: ["Diagnostic warnings", "Terminal yellow, bright yellow"],
		tags: ["strings"],
	},
	rose: {
		description: "A beautiful yet cautious blossom",
		scenarios: [
			"Matching search background paired with base foreground",
			"Modified Git files",
			"Terminal cyan, bright cyan",
		],
		tags: ["booleans", "functions"],
	},
	pine: {
		description: "Fresh winter greenery",
		scenarios: ["Renamed Git files", "Terminal green, bright green"],
		tags: ["conditionals", "keywords"],
	},
	foam: {
		description: "Saltwater tidepools",
		scenarios: [
			"Diagnostic information",
			"Git additions",
			"Terminal blue, bright blue",
		],
		tags: ["keys", "tags", "types"],
	},
	iris: {
		description: "Smells of groundedness",
		scenarios: [
			"Diagnostic hints",
			"Inline links",
			"Merged and staged Git modifications",
			"Terminal magenta, bright magenta",
		],
		tags: ["methods", "parameters"],
	},
	highlightLow: {
		description: "Low contrast highlight",
		scenarios: ["Cursorline background"],
	},
	highlightMed: {
		description: "Medium contrast highlight",
		scenarios: ["Selection background paired with text foreground"],
	},
	highlightHigh: {
		description: "High contrast highlight",
		scenarios: [
			"Borders / visual dividers",
			"Cursor background paired with text foreground",
		],
	},
};

const specification = roleKeys.map((key) => {
	const role = roles[key];
	const roleDetail = roleDetails[key];

	return {
		id: role.id,
		name: role.name,
		colors: getColorsFromRole(role.colors),
		description: roleDetails[key].description,
		scenarios: roleDetails[key].scenarios,
		tags: "tags" in roleDetail ? roleDetail.tags : [],
	};
});

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

export { specification, formatColor };
