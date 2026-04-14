import { create } from 'zustand'

interface AuthState {
  isLoggedIn: boolean
  token: string | null
  setToken: (token: string) => void
  clearAuth: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  token: null,
  setToken: (token) => set({ token, isLoggedIn: true }),
  clearAuth: () => set({ token: null, isLoggedIn: false }),
}))
