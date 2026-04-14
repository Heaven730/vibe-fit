/**
 * 语义化主题系统
 *
 * 包含三套主题：softPop（Figma 设计稿提取）、midnight（深色）、mint（清新绿）
 * 用法：import { themes } from '@/constants/themes'
 *       const t = themes.softPop
 */

export interface Theme {
  // ---------- 背景 ----------
  /** 页面底层背景色 */
  background: string;
  /** 页面背景渐变：起始色（顶部） */
  backgroundGradientStart: string;
  /** 页面背景渐变：结束色（底部，带透明度的品牌色） */
  backgroundGradientEnd: string;
  /** 卡片 / Sheet 表面色 */
  surface: string;
  /** 次级表面色（输入框、按钮等静默状态） */
  surfaceMuted: string;

  // ---------- 文字 ----------
  /** 主文字（标题、正文） */
  textPrimary: string;
  /** 次级文字（说明、辅助信息） */
  textSecondary: string;
  /** 占位符文字 */
  textPlaceholder: string;
  /** 静默文字（禁用按钮等） */
  textMuted: string;

  // ---------- 边框 ----------
  /** 常规边框（输入框、卡片边缘） */
  border: string;
  /** 静默边框（禁用状态、分割线） */
  borderMuted: string;

  // ---------- 品牌 / 强调色 ----------
  /** 主品牌色 */
  accent: string;
  /** 品牌色（低透明度，用于渐变/背景叠加） */
  accentSubtle: string;

  // ---------- 阴影 ----------
  /** 卡片 / 浮层阴影色 */
  shadow: string;

  // ---------- 状态色 ----------
  /** 成功 */
  success: string;
  /** 警告 */
  warning: string;
  /** 错误 */
  error: string;
}

// ─────────────────────────────────────────────
// 1. softPop — 来自 Figma 设计稿（node 7:2）
//    暖白底 + 柔紫品牌色，圆润轻盈
// ─────────────────────────────────────────────
const softPop: Theme = {
  background: '#FCF8F8',
  backgroundGradientStart: 'rgba(255, 255, 255, 0.20)',
  backgroundGradientEnd: 'rgba(80, 40, 252, 0.20)',
  surface: '#FFFFFF',
  surfaceMuted: '#FFF9F7',

  textPrimary: '#101010',
  textSecondary: '#606060',
  textPlaceholder: '#9C8888',
  textMuted: '#6E6C6E',

  border: '#D9D0E3',
  borderMuted: '#D0C9C7',

  accent: '#5028FC',
  accentSubtle: 'rgba(80, 40, 252, 0.12)',

  shadow: 'rgba(0, 0, 0, 0.10)',

  success: '#4CAF82',
  warning: '#F5A623',
  error: '#E05252',
};

// ─────────────────────────────────────────────
// 2. midnight — 深色主题
//    深灰底 + 亮紫品牌色，沉稳专注
// ─────────────────────────────────────────────
const midnight: Theme = {
  background: '#0E0E14',
  backgroundGradientStart: 'rgba(14, 14, 20, 0.20)',
  backgroundGradientEnd: 'rgba(100, 60, 255, 0.25)',
  surface: '#1C1C26',
  surfaceMuted: '#252530',

  textPrimary: '#F5F4FF',
  textSecondary: '#A09DB8',
  textPlaceholder: '#5E5B72',
  textMuted: '#7A778F',

  border: '#2E2B40',
  borderMuted: '#232030',

  accent: '#7C5CFC',
  accentSubtle: 'rgba(124, 92, 252, 0.18)',

  shadow: 'rgba(0, 0, 0, 0.40)',

  success: '#3DB87A',
  warning: '#F5A623',
  error: '#E05252',
};

// ─────────────────────────────────────────────
// 3. mint — 清新绿主题
//    米白底 + 薄荷绿品牌色，健康活力
// ─────────────────────────────────────────────
const mint: Theme = {
  background: '#F5FAF7',
  backgroundGradientStart: 'rgba(255, 255, 255, 0.20)',
  backgroundGradientEnd: 'rgba(32, 178, 120, 0.18)',
  surface: '#FFFFFF',
  surfaceMuted: '#F0F8F4',

  textPrimary: '#0D1F18',
  textSecondary: '#4D6B5C',
  textPlaceholder: '#8FB09D',
  textMuted: '#6B8C7A',

  border: '#C8E5D6',
  borderMuted: '#B8D8C6',

  accent: '#20B278',
  accentSubtle: 'rgba(32, 178, 120, 0.12)',

  shadow: 'rgba(0, 0, 0, 0.08)',

  success: '#20B278',
  warning: '#F5A623',
  error: '#E05252',
};

// ─────────────────────────────────────────────
// 导出
// ─────────────────────────────────────────────
export const themes = {
  softPop,
  midnight,
  mint,
} as const;

export type ThemeName = keyof typeof themes;
