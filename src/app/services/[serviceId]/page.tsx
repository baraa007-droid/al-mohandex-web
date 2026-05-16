'use client';

import { use } from 'react';
import ServiceDetailPage from '@/views/ServiceDetailPage';

export default function Page({ params }: { params: Promise<{ serviceId: string }> }) {
  const { serviceId } = use(params);
  return <ServiceDetailPage serviceId={serviceId} />;
}
