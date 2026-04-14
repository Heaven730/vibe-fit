import { themes, Theme, ThemeName } from '@/constants/themes';
import { useThemeStore } from '@/store/themeStore';

export interface UseThemeReturn {
  /** 当前主题的所有颜色 token */
  theme: Theme;
  /** 当前主题名 */
  themeName: ThemeName;
  /** 切换主题 */
  setTheme: (name: ThemeName) => void;
}

/**
 * 读取当前全局主题 token，并提供切换方法。
 * 在任意组件内调用即可获得响应式主题颜色。
 */
export function useTheme(): UseThemeReturn {
  const { themeName, setTheme } = useThemeStore();
  return { theme: themes[themeName], themeName, setTheme };
}
