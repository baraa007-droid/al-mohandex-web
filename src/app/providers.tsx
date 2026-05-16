'use client'

import { AuthProvider } from '@/contexts/AuthContext'
import ErrorBoundary from '@/components/effects/ErrorBoundary'
import '@/i18n'

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary>
      <AuthProvider>
        {children}
      </AuthProvider>
    </ErrorBoundary>
  )
}
