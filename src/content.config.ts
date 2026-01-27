import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { defineCollection, reference } from "astro:content";
import { locales } from "./i18n/ui";

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
			locale: z.enum(locales).default("en"),
			draft: z.boolean().optional(),
		}),
});

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
		url: z.string().url(),
		avatarUrl: z.string().url(),
	}),
});

export const collections = { garden, guides, authors };
