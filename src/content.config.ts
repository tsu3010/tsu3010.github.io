import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

export const TAGS = [
  'data-engineering',
  'analytics-engineering',
  'nlp',
  'forecasting',
  'machine-learning',
] as const;

const projects = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/projects' }),
  schema: ({ image }) =>
    z
      .object({
        title: z.string(),
        summary: z.string().max(200),
        date: z.string().regex(/^\d{4}-(0[1-9]|1[0-2])$/, 'Use YYYY-MM'),
        role: z.string(),
        stack: z.array(z.string()).min(1),
        tags: z.array(z.enum(TAGS)).min(1),
        featured: z.boolean().default(false),
        status: z.enum(['original', 'reproduction', 'refresh']),
        links: z
          .object({
            code: z.url().optional(),
            demo: z.url().optional(),
          })
          .default({}),
        // True for write-ups carried over from the earlier site with the analysis unchanged.
        migrated: z.boolean().default(false),
        cover: image().optional(),
        coverAlt: z.string().optional(),
        draft: z.boolean().default(false),
      })
      .refine((p) => !p.cover || p.coverAlt, { message: 'coverAlt is required when cover is set', path: ['coverAlt'] })
      .refine((p) => p.status === 'original' || p.links.code, {
        message: 'reproduction and refresh projects must link to their code (links.code)',
        path: ['links', 'code'],
      }),
});

const writing = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/writing' }),
  schema: z.object({
    title: z.string(),
    description: z.string().max(200),
    date: z.coerce.date(),
    tags: z.array(z.enum(TAGS)).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { projects, writing };
