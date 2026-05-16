'use client';

import { use } from 'react';
import BlogPostPage from '@/views/BlogPostPage';

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  return <BlogPostPage id={id} />;
}
