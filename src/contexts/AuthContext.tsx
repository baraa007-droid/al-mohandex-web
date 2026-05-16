'use client'

import { createContext, useContext, useState, useEffect, useCallback, useMemo, type ReactNode } from 'react'
import { signIn, signUp, signOut, onAuthStateChange, getCurrentUser } from '@/lib/auth'
import { getUserById } from '@/services/users.service'
import type { AuthUser, AuthContextType } from '@/types'

const AuthContext = createContext<AuthContextType | null>(null)

function mapToAuthUser(user: { id: string; email?: string | null; user_metadata?: { full_name?: string } }, dbUser?: { role?: string | null; full_name?: string | null; avatar_url?: string | null }): AuthUser {
  return {
    id: user.id,
    name: dbUser?.full_name || user.user_metadata?.full_name || user.email?.split('@')[0] || 'User',
    email: user.email || '',
    role: dbUser?.role || 'user',
    avatar_url: dbUser?.avatar_url || undefined,
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    const initAuth = async () => {
      try {
        const supabaseUser = await getCurrentUser()
        if (supabaseUser && !cancelled) {
          try {
            const dbUser = await getUserById(supabaseUser.id)
            if (!cancelled) setUser(mapToAuthUser(supabaseUser, dbUser))
          } catch {
            if (!cancelled) setUser(mapToAuthUser(supabaseUser))
          }
        }
      } catch {
        if (!cancelled) setUser(null)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    initAuth()

    const { data: { subscription } } = onAuthStateChange(async (event, session) => {
      if (cancelled) return
      if (event === 'SIGNED_IN' && session?.user) {
        try {
          const dbUser = await getUserById(session.user.id)
          if (!cancelled) setUser(mapToAuthUser(session.user, dbUser))
        } catch {
          if (!cancelled) setUser(mapToAuthUser(session.user))
        }
      } else if (event === 'SIGNED_OUT') {
        if (!cancelled) setUser(null)
      }
    })

    return () => {
      cancelled = true
      subscription.unsubscribe()
    }
  }, [])

  const login = useCallback(async (email: string, password: string): Promise<void> => {
    const { user: supabaseUser } = await signIn(email, password)
    if (!supabaseUser) throw new Error('Login failed')
    try {
      const dbUser = await getUserById(supabaseUser.id)
      setUser(mapToAuthUser(supabaseUser, dbUser))
    } catch {
      setUser(mapToAuthUser(supabaseUser))
    }
  }, [])

  const register = useCallback(async (name: string, email: string, password: string): Promise<void> => {
    const { user: supabaseUser } = await signUp(email, password, name)
    if (!supabaseUser) throw new Error('Registration failed')
    setUser(mapToAuthUser(supabaseUser, { role: 'user', full_name: name, avatar_url: null }))
  }, [])

  const logout = useCallback(async (): Promise<void> => {
    await signOut()
    setUser(null)
  }, [])

  const value = useMemo<AuthContextType>(() => ({
    user,
    loading,
    login,
    register,
    logout,
  }), [user, loading, login, register, logout])

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
