import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { defineCollection, reference } from "astro:content";

const guides = defineCollection({
	loader: glob({ pattern: "**/[^_]*.md", base: "./src/content/guides" }),
	schema: () =>
		z.object({
			title: z.string(),
			description: z.string(),
			author: reference("authors"),
			publishedAt: z.date(),
			updatedAt: z.date(),
			draft: z.boolean().optional(),
		}),
});

const authors = defineCollection({
	loader: glob({ pattern: "**/[^_]*.json", base: "./src/content/authors" }),
	schema: z.object({
		name: z.string(),
		url: z.url(),
		avatarUrl: z.url(),
	}),
});

export const collections = { guides, authors };
