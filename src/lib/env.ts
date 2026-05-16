import { z } from 'zod';

const envSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1).optional(),
  OPENAI_API_KEY: z.string().min(1).optional(),
  GMAIL_APP_PASSWORD: z.string().min(1).optional(),
  GMAIL_USER: z.string().email().optional(),
  RESEND_API_KEY: z.string().min(1).optional(),
  NEXT_PUBLIC_SITE_URL: z.string().url().default('http://localhost:3000'),
});

export const env = envSchema.parse(process.env);

export type Env = z.infer<typeof envSchema>;
