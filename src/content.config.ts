import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { defineCollection, reference } from "astro:content";

export const collections = {
	officialRepos: defineCollection({
		loader: glob({
			pattern: "**/*.yaml",
			base: "./src/content/official-repos",
		}),
		schema: z.object({
			featured: z.boolean().optional(),
			stargazersCount: z.number(),
			updatedAt: z.date().optional(),
			tags: z.array(z.string()).optional(),
			name: z.string().optional(),
			category: z.string(),
			contributors: z.array(
				z.object({ name: z.string(), image: z.url().optional(), url: z.url() }),
			),
			subthemes: z
				.array(
					z.object({ name: z.string(), author: z.string(), url: z.string() }),
				)
				.optional(),
			related: z.array(z.string()).optional(),
		}),
	}),

	communityRepos: defineCollection({
		loader: glob({
			pattern: "**/*.yaml",
			base: "./src/content/community-repos",
		}),
		schema: z.object({
			name: z.string(),
			url: z.url(),
			tags: z.array(z.string()).optional(),
			contributors: z.array(
				z.object({ name: z.string(), image: z.url().optional(), url: z.url() }),
			),
			category: z.string(),
			subthemes: z
				.array(
					z.object({ name: z.string(), author: z.string(), url: z.string() }),
				)
				.optional(),
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
		}),
	}),

	showcase: defineCollection({
		loader: glob({
			base: "./src/content/showcase",
			pattern: "**/*.yaml",
		}),
		schema: ({ image }) =>
			z.object({
				name: z.string(),
				image: image(),
				url: z.url(),
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
