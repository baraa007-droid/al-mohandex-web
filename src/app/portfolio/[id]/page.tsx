'use client';

import { use } from 'react';
import CaseStudyPage from '@/views/CaseStudyPage';

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  return <CaseStudyPage id={id} />;
}
