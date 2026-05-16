import { z } from 'zod';

export const ContactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional().nullable(),
  subject: z.string().min(5, 'Subject must be at least 5 characters').optional().nullable(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  status: z.enum(['new', 'in-progress', 'resolved', 'closed']).default('new'),
});

export type ContactInput = z.infer<typeof ContactSchema>;
