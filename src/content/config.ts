import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const garden = defineCollection({
	loader: glob({ pattern: "**/*.md", base: "./src/data/garden" }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			image: image(),
			imageAlt: z.string(),
			author: z.string(),
			publishedAt: z.date(),
			updatedAt: z.date(),
			draft: z.optional(z.boolean()),
		}),
});

export const collections = { garden };
