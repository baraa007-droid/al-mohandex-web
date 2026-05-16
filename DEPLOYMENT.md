# Al-Mohandex Production Deployment Guide

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Supabase Setup](#supabase-setup)
3. [Vercel Deployment](#vercel-deployment)
4. [Environment Variables](#environment-variables)
5. [Post-Deployment Verification](#post-deployment-verification)
6. [Troubleshooting](#troubleshooting)

---

## Prerequisites

- Node.js 20+ installed locally
- Supabase account and project created
- Vercel account connected to your Git repository
- Gmail account with App Password enabled (for contact form)
- OpenAI API key (for chat widget)

---

## Supabase Setup

### 1. Create Supabase Project

1. Go to https://supabase.com and create a new project
2. Note your project URL and keys from **Settings > API**

### 2. Run Database Migration

1. Go to **SQL Editor** in your Supabase dashboard
2. Copy the contents of `supabase/migrations/001_initial_schema.sql`
3. Paste and execute the SQL script
4. This creates all tables, indexes, RLS policies, and triggers

### 3. Verify Tables Created

Ensure the following tables exist:
- `users` - User profiles linked to auth.users
- `projects` - Portfolio projects
- `contacts` - Contact form submissions
- `blog_posts` - Blog articles
- `chat_messages` - Chat widget messages
- `admin_settings` - Site configuration

### 4. Verify Indexes

Each table should have appropriate indexes:
- `idx_users_role` on users(role)
- `idx_projects_slug`, `idx_projects_category`, `idx_projects_featured`
- `idx_contacts_status`
- `idx_blog_slug`, `idx_blog_published`
- `idx_chat_sender`

### 5. Verify RLS Policies

Row Level Security is enabled on all tables. Verify these policies exist:
- **users**: Users can view/update own profile, admins can view all
- **projects**: Public can view, admins have full access
- **contacts**: Anyone can insert, admins have full access
- **blog_posts**: Only published posts visible publicly, admins full access
- **chat_messages**: Users can view own messages, admins full access
- **admin_settings**: Admins only

### 6. Create Storage Buckets

Go to **Storage** and create these buckets:

| Bucket Name | Public | Purpose |
|-------------|--------|---------|
| `project-images` | Yes | Portfolio project images |
| `blog-images` | Yes | Blog post cover images |
| `uploads` | No | User file uploads |
| `avatars` | Yes | User profile avatars |

For each public bucket, add this storage policy:
```sql
create policy "Public Access"
  on storage.objects for select
  using (bucket_id = 'bucket-name');
```

For authenticated uploads:
```sql
create policy "Authenticated Upload"
  on storage.objects for insert
  with check (auth.role() = 'authenticated' and bucket_id = 'bucket-name');
```

### 7. Configure Auth Settings

Go to **Authentication > Settings**:

1. **Site URL**: Set to your production domain (e.g., `https://your-domain.com`)
2. **Redirect URLs**: Add:
   - `https://your-domain.com/**`
   - `http://localhost:3000/**` (for local development)
3. **Email Auth**: Enable
4. **Confirm email**: Optional (disable for easier testing)

### 8. Create First Admin User

After signing up the first user, update their role in the database:
```sql
update users set role = 'admin' where email = 'admin@your-domain.com';
```

---

## Vercel Deployment

### 1. Connect Repository

1. Go to https://vercel.com
2. Click **Add New > Project**
3. Import your Git repository
4. Vercel will auto-detect Next.js

### 2. Configure Environment Variables

Add the following in **Settings > Environment Variables**:

| Variable | Value | Environment |
|----------|-------|-------------|
| `NEXT_PUBLIC_SITE_URL` | `https://your-domain.com` | Production |
| `NEXT_PUBLIC_SUPABASE_URL` | `https://your-project-id.supabase.co` | Production |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your anon key | Production |
| `SUPABASE_SERVICE_ROLE_KEY` | Your service role key | Production |
| `GMAIL_APP_PASSWORD` | Your Gmail app password | Production |
| `GMAIL_USER` | `almohandex@gmail.com` | Production |
| `OPENAI_API_KEY` | Your OpenAI key | Production |

### 3. Build Settings

- **Framework Preset**: Next.js
- **Build Command**: `next build --webpack` (Windows compatibility)
- **Output Directory**: `.next`
- **Install Command**: `npm install`
- **Development Command**: `next dev`

### 4. Deploy

1. Click **Deploy**
2. Vercel will build and deploy automatically
3. After deployment, configure your custom domain in **Settings > Domains**

---

## Environment Variables

### Client-Safe Variables (exposed to browser)

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_SITE_URL` | Site base URL |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public Supabase key |

### Server-Only Variables (NEVER exposed client-side)

| Variable | Purpose |
|----------|---------|
| `SUPABASE_SERVICE_ROLE_KEY` | Admin Supabase access |
| `GMAIL_APP_PASSWORD` | Email sending |
| `GMAIL_USER` | Email sender address |
| `OPENAI_API_KEY` | AI chat responses |

---

## Post-Deployment Verification

### 1. Build Verification

- [ ] `npm run build -- --webpack` passes locally
- [ ] Zero TypeScript errors
- [ ] All pages generate correctly

### 2. Route Verification

Test each route:

| Route | Type | Status |
|-------|------|--------|
| `/` | Static | Should load instantly |
| `/about` | Static | Should load instantly |
| `/portfolio` | Static | Should load instantly |
| `/blog` | Static | Should load instantly |
| `/contact` | Static | Should load instantly |
| `/services` | Static | Should load instantly |
| `/pricing` | Static | Should load instantly |
| `/login` | Static | Should load instantly |
| `/start-project` | Static | Should load instantly |
| `/admin` | Protected | Should redirect to /login if not authenticated |
| `/api/*` | Dynamic | Should respond correctly |

### 3. API Verification

| Endpoint | Method | Expected |
|----------|--------|----------|
| `/api/projects` | GET | Returns project list |
| `/api/contacts` | POST | Creates contact submission |
| `/api/chat` | POST | Returns AI response |
| `/api/auth/login` | POST | Returns auth token |
| `/api/auth/register` | POST | Creates user |
| `/api/auth/me` | GET | Returns current user |
| `/api/send-email` | POST | Sends email via Gmail |

### 4. Auth Flow Verification

1. Register a new account
2. Verify login works
3. Verify admin dashboard is accessible only to admin users
4. Verify logout clears session
5. Verify middleware redirects unauthenticated users from `/admin`

### 5. SEO Verification

- [ ] Page titles render correctly
- [ ] Meta descriptions present
- [ ] OpenGraph tags present
- [ ] Twitter meta tags present
- [ ] Canonical URLs set
- [ ] robots.txt accessible at `/robots.txt`
- [ ] sitemap.xml accessible at `/sitemap.xml`

### 6. Console Verification

Open browser DevTools and verify:
- [ ] No console errors
- [ ] No hydration warnings
- [ ] No failed network requests
- [ ] No runtime crashes

---

## Troubleshooting

### Build Fails on Vercel

- Ensure `SUPABASE_URL` and `SUPABASE_ANON_KEY` are set in Vercel env vars
- Check build logs for specific errors

### Auth Redirects Fail

- Verify **Site URL** in Supabase Auth settings matches your domain
- Ensure redirect URLs include your production domain

### Contact Form Emails Not Sending

- Verify Gmail App Password is correct (not regular password)
- Ensure 2FA is enabled on Gmail account
- Check Vercel function logs for errors

### Admin Dashboard Shows Loading Forever

- Verify user has `role = 'admin'` in the `users` table
- Check Supabase RLS policies are applied correctly
- Verify `SUPABASE_SERVICE_ROLE_KEY` is set correctly

### Images Not Loading

- Verify storage buckets are created and set to public
- Check storage policies allow public read access
- Verify image URLs are correct in the database

---

## Local Development

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local

# Run development server
npm run dev

# Run production build locally
npm run build -- --webpack

# Run production server locally
npm run start
```

---

## Security Checklist

- [ ] `.env.local` is in `.gitignore`
- [ ] `SUPABASE_SERVICE_ROLE_KEY` is never used client-side
- [ ] RLS policies are enabled on all tables
- [ ] Storage buckets have appropriate access policies
- [ ] Admin routes are protected by middleware
- [ ] Rate limiting is active on public API endpoints
- [ ] CORS is configured appropriately
- [ ] No sensitive data is logged

---

## Production Notes

- Next.js 16 on Windows requires `--webpack` flag for builds
- Vercel uses Linux builders, so `next build` works without the flag
- Static pages are pre-rendered at build time
- Dynamic pages and API routes are server-rendered on demand
- Middleware runs on every request to protected routes
- Supabase client is lazy-initialized to prevent build-time errors

---

## Support

For issues:
1. Check Vercel deployment logs
2. Check Supabase logs
3. Review browser console for client errors
4. Verify all environment variables are set correctly
