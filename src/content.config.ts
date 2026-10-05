import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const slugify = (text: string) =>
	text
		.normalize('NFKD')
		.replace(/[\u0300-\u036f]/g, '')
		.toLowerCase()
		.replace(/['’]/g, '')
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '');

const pies = defineCollection({
	loader: glob({
		pattern: '**/*.md',
		base: './src/content/pies',
		// Derive the entry id (used as the URL slug) from the shop (if set) and title, not the filename.
		generateId: ({ entry, data }) =>
			slugify([data.shop, data.title ?? entry].filter(Boolean).join(' ')),
	}),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			score: z.number().optional(),
			image: image().optional(),
			shop: z.string().optional(),
		}),
});

export const collections = { pies };
