/** SoftPop 主题色板 */
export const sp = {
  bg: '#FCF8F8',
  surface: '#FFFFFF',
  'surface-muted': '#FFF9F7',
  text: '#101010',
  'text-secondary': '#606060',
  'text-placeholder': '#9C8888',
  'text-muted': '#6E6C6E',
  border: '#DED5F8',
  'border-muted': '#D7D0E8',
  accent: '#8B6DF7',
  purple: '#A890FF',
  'purple-dark': '#8B6DF7',
  'selected-line': '#7456EA',
}

/** 渐变背景色 */
export const gradient = {
  start: '#FFFFFF',
  end: '#8B6DF7',
}

/** Expo 模板遗留兼容字段（供 Themed.tsx / EditScreenInfo.tsx 使用） */
const tintColorLight = '#8B6DF7'
const tintColorDark = '#A890FF'

export const light = {
  text: '#101010',
  background: '#FCF8F8',
  tint: tintColorLight,
  tabIconDefault: '#ccc',
  tabIconSelected: tintColorLight,
}

export const dark = {
  text: '#FFFFFF',
  background: '#0E0E14',
  tint: tintColorDark,
  tabIconDefault: '#ccc',
  tabIconSelected: tintColorDark,
}

const Colors = {
  sp,
  gradient,
  light,
  dark,
}

export default Colors
