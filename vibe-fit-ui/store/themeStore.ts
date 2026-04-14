import { create } from 'zustand';

import { ThemeName } from '@/constants/themes';

interface ThemeState {
  /** 当前激活的主题名 */
  themeName: ThemeName;
  /** 切换主题 */
  setTheme: (name: ThemeName) => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  themeName: 'softPop',
  setTheme: (name) => set({ themeName: name }),
}));
