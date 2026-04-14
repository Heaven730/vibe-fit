/**
 * 通用类型与移动端工具 Hook
 * 仅支持 iOS / Android，不含任何 Web 兼容逻辑。
 */

import { useColorScheme as useColorSchemeCore } from 'react-native';

// ─────────────────────────────────────────────
// useColorScheme
// ─────────────────────────────────────────────

export type ColorScheme = 'light' | 'dark';

/**
 * 获取当前系统配色方案。
 * RN 返回 `null` 或 `'unspecified'` 时降级为 `'light'`。
 */
export function useColorScheme(): ColorScheme {
  const scheme = useColorSchemeCore();
  return scheme === 'dark' ? 'dark' : 'light';
}
