import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { defineCollection, reference } from "astro:content";

const contributorSchema = z.object({
	name: z.string(),
	url: z.url(),
	image: z.url().optional(),
});

const userstyleSchema = z.object({
	name: z.string(),
	url: z.string(),
});

export const collections = {
	repos: defineCollection({
		loader: glob({
			pattern: "**/*.yaml",
			base: "./src/content/repos",
		}),
		schema: z.object({
			type: z.enum(["official", "community"]),
			name: z.string(),
			url: z.string(),
			category: z.string(),
			updatedAt: z.date().optional(),
			tags: z.array(z.string()).optional(),
			contributors: z.array(contributorSchema),
			userstyles: z.array(userstyleSchema).optional(),
			related: z.array(z.string()).optional(),
		}),
	}),

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

	palette: defineCollection({
		loader: glob({
			base: "./src/content/palette",
			pattern: "**/*.md",
		}),
		schema: z.object({
			description: z.string(),
			name: z.string(),
		}),
	}),

	madeWith: defineCollection({
		loader: glob({
			base: "./src/content/made-with",
			pattern: "**/*.yaml",
		}),
		schema: ({ image }) =>
			z.object({
				url: z.url(),
				image: image(),
				title: z.string(),
				description: z.string(),
			}),
	}),

	authors: defineCollection({
		loader: glob({
			base: "./src/content/authors",
			pattern: "*.yaml",
		}),
		schema: z.object({
			name: z.string(),
			image: z.url(),
			url: z.url(),
		}),
	}),
};
