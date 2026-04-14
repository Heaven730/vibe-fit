/** SoftPop 主题色板 */
export const sp = {
  bg: '#FCF8F8',
  surface: '#FFFFFF',
  'surface-muted': '#FFF9F7',
  text: '#101010',
  'text-secondary': '#606060',
  'text-placeholder': '#9C8888',
  'text-muted': '#6E6C6E',
  border: '#D9D0E3',
  'border-muted': '#D0C9C7',
  accent: '#5028FC',
  purple: '#9D8FFF',
  'purple-dark': '#5028FC',
  'selected-line': '#2A1FD0',
}

/** 渐变背景色 */
export const gradient = {
  start: '#FFFFFF',
  end: '#5028FC',
}

/** Expo 模板遗留兼容字段（供 Themed.tsx / EditScreenInfo.tsx 使用） */
const tintColorLight = '#5028FC'
const tintColorDark = '#9D8FFF'

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
