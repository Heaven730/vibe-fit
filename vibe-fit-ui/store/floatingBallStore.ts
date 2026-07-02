import { create } from 'zustand'

export interface FloatingBallPosition {
  x: number
  y: number
}

interface FloatingBallState {
  position: FloatingBallPosition | null
  setPosition: (x: number, y: number) => void
  resetPosition: () => void
}

export const useFloatingBallStore = create<FloatingBallState>((set) => ({
  position: null,
  setPosition: (x, y) => set({ position: { x, y } }),
  resetPosition: () => set({ position: null }),
}))
