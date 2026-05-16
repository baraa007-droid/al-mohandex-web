import { z } from 'zod';

export const ProjectSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  slug: z.string().min(3, 'Slug must be at least 3 characters').regex(/^[a-z0-9-]+$/, 'Slug must be URL-friendly'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  category: z.string().min(2).optional().nullable(),
  image_url: z.string().url().optional().nullable(),
  technologies: z.array(z.string()).optional().nullable(),
  featured: z.boolean().default(false),
});

export type ProjectInput = z.infer<typeof ProjectSchema>;
