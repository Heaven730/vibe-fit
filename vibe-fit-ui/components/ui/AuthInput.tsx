import React from 'react';
import { StyleSheet, TextInput, TextInputProps, View } from 'react-native';

import { Theme } from '@/constants/themes';

export interface AuthInputProps extends TextInputProps {
  /** 当前主题，由父组件通过 useTheme() 传入 */
  theme: Theme;
  /** 可选的右侧图标节点，用于密码显示/隐藏等交互 */
  rightIcon?: React.ReactNode;
}

/** 输入框阴影（平台差异值，无法用 Tailwind 表达） */
const inputShadow = {
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 6 },
  shadowOpacity: 0.08,
  shadowRadius: 10,
  elevation: 4,
} as const;

/**
 * AuthInput — 认证页面输入框
 *
 * 样式遵循 softPop 设计规范：白色底、圆角 8、细边框、柔和阴影。
 * 颜色全部由 theme prop 驱动，支持主题切换。
 *
 * Props:
 * - theme: 当前主题 token 对象，提供 surface / border / textPrimary / textPlaceholder
 * - rightIcon: 可选右侧节点，用于密码显示/隐藏按钮等场景
 * - 其余 props 透传给 TextInput
 */
export function AuthInput({ theme, style, rightIcon, ...props }: AuthInputProps) {
  return (
    <View
      style={[styles.container, { backgroundColor: theme.surface, borderColor: theme.border }, inputShadow]}
    >
      <TextInput
        style={[styles.input, { color: theme.textPrimary }, style]}
        placeholderTextColor={theme.textPlaceholder}
        {...props}
      />
      {rightIcon != null && (
        <View style={styles.iconSlot}>{rightIcon}</View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 48,
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    paddingHorizontal: 12,
    fontSize: 17,
    letterSpacing: -0.41,
    fontFamily: 'Inter-Regular',
  },
  iconSlot: {
    paddingRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
