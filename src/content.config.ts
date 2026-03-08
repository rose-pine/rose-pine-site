import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { defineCollection, reference } from "astro:content";

export const collections = {
	guides: defineCollection({
		loader: glob({
			base: "./src/content/guides",
			pattern: "**/*.md",
		}),
		schema: z.object({
			title: z.string(),
			description: z.string(),
			author: reference("authors"),
			publishedAt: z.date(),
			updatedAt: z.date(),
			draft: z.boolean().optional(),
		}),
	}),

	showcase: defineCollection({
		loader: glob({
			base: "./src/content/showcase",
			pattern: "**/*.yml",
		}),
		schema: ({ image }) =>
			z.object({
				name: z.string(),
				image: image(),
				url: z.string().url(),
			}),
	}),

	authors: defineCollection({
		loader: glob({
			base: "./src/content/authors",
			pattern: "*.yml",
		}),
		schema: z.object({
			name: z.string(),
			image: z.url(),
			url: z.url(),
		}),
	}),
};
