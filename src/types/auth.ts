export interface AuthUser {
  id: string
  name: string
  email: string
  role: string
  avatar_url?: string
}

export interface AuthContextType {
  user: AuthUser | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => Promise<void>
}
