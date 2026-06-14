import { defineCollection, reference, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    index: z.string(),
    type: z.enum(['SEARCH', 'OSS', 'LLM', 'SYSTEMS', 'TOOLS']),
    summary: z.string(),
    stack: z.array(z.string()),
    tags: z.array(z.string()),
    demoVideo: z.string().url().optional(),
    repo: z.string().url().optional(),
    liveDemo: z.string().url().optional(),
    featured: z.boolean(),
    lang: z.enum(['en', 'tr']),
  }),
});

const posts = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()),
    excerpt: z.string(),
    project: reference('projects').optional(),
    lang: z.enum(['en', 'tr']),
  }),
});

export const collections = { projects, posts };
