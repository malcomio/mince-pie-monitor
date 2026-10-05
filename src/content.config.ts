import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const pies = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/pies' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			score: z.number().optional(),
			image: image().optional(),
			shop: z.string().optional(),
		}),
});

export const collections = { pies };
