/**
 * 字体大小 token
 * 用法: import { fontSize } from '@/constants/typography'
 *       fontSize: fontSize.lg
 */
export const fontSize = {
  xs: 10,
  sm: 12,
  md: 13,
  base: 14,
  lg: 15,
  xl: 16,
  '2xl': 18,
  '3xl': 20,
  '4xl': 22,
  '5xl': 24,
  '6xl': 30,
  '7xl': 34,
  '8xl': 42,
  display: 52,
  hero: 72,
} as const

export type FontSizeKey = keyof typeof fontSize
