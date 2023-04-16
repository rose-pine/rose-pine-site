import { defineCollection, z } from "astro:content";

const guide = z.object({
	title: z.string(),
	description: z.string(),
	priority: z.number(),
});

export const collections = {
	guides: defineCollection({ schema: guide }),
};
