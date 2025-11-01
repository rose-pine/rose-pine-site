import { glob } from "astro/loaders";
import { defineCollection, reference, z } from "astro:content";

const garden = defineCollection({
	loader: glob({ pattern: "**/[^_]*.md", base: "./src/content/garden" }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			image: image(),
			imageAlt: z.string(),
			author: reference("authors"),
			publishedAt: z.date(),
			updatedAt: z.date(),
			draft: z.optional(z.boolean()),
		}),
});

const authors = defineCollection({
	loader: glob({ pattern: "**/[^_]*.json", base: "./src/content/authors" }),
	schema: z.object({
		name: z.string(),
		url: z.string().url(),
		avatarUrl: z.string().url(),
	}),
});

export const collections = { garden, authors };
