import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { themes, ThemeName } from '@/constants/themes';
import { useTheme } from '@/hooks/useTheme';

export interface ThemeSwitcherProps {
  /** 切换成功后的回调（可选） */
  onThemeChange?: (name: ThemeName) => void;
}

/** 主题名 → 中文展示标签 */
const THEME_LABELS: Record<ThemeName, string> = {
  softPop: 'Soft Pop',
  pink: 'Pink',
  mint: 'Mint',
};

/**
 * ThemeSwitcher — 全局主题切换器
 *
 * 展示三张主题预览卡片，点击后通过 Zustand 切换全局主题。
 * 适合放置在设置页面或调试面板中。
 *
 * Props:
 * - onThemeChange: 切换完成后触发的可选回调，接收新主题名作为参数
 */
export function ThemeSwitcher({ onThemeChange }: ThemeSwitcherProps) {
  const { themeName: activeName, setTheme } = useTheme();

  const handleSelect = (name: ThemeName) => {
    setTheme(name);
    onThemeChange?.(name);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>主题</Text>
      <View style={styles.row}>
        {(Object.keys(themes) as ThemeName[]).map((name) => {
          const t = themes[name];
          const isActive = name === activeName;

          return (
            <TouchableOpacity
              key={name}
              onPress={() => handleSelect(name)}
              style={[
                styles.card,
                { backgroundColor: t.surface, borderColor: isActive ? t.accent : t.border },
                isActive && styles.cardActive,
              ]}
              activeOpacity={0.75}
            >
              {/* 渐变色块预览 */}
              <View style={[styles.preview, { backgroundColor: t.background }]}>
                <View style={[styles.accentDot, { backgroundColor: t.accent }]} />
                <View style={[styles.textBar, { backgroundColor: t.textPrimary }]} />
                <View style={[styles.textBarSecondary, { backgroundColor: t.textSecondary }]} />
              </View>

              {/* 主题名称 */}
              <Text
                style={[
                  styles.themeName,
                  { color: isActive ? t.accent : t.textSecondary },
                ]}
              >
                {THEME_LABELS[name]}
              </Text>

              {/* 激活指示点 */}
              {isActive && (
                <View style={[styles.activeBadge, { backgroundColor: t.accent }]} />
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#606060',
    marginBottom: 10,
    letterSpacing: 0.4,
    textTransform: 'uppercase',
  },
  row: {
    flexDirection: 'row',
    gap: 10,
  },
  card: {
    flex: 1,
    borderRadius: 14,
    borderWidth: 2,
    padding: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  cardActive: {
    shadowOpacity: 0.18,
    shadowRadius: 10,
    elevation: 6,
  },
  preview: {
    width: '100%',
    height: 56,
    borderRadius: 8,
    marginBottom: 8,
    padding: 8,
    justifyContent: 'flex-end',
    gap: 4,
  },
  accentDot: {
    width: 18,
    height: 18,
    borderRadius: 9,
    alignSelf: 'flex-end',
    marginBottom: 2,
  },
  textBar: {
    height: 4,
    borderRadius: 2,
    width: '70%',
    opacity: 0.85,
  },
  textBarSecondary: {
    height: 3,
    borderRadius: 2,
    width: '45%',
    opacity: 0.45,
  },
  themeName: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  activeBadge: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginTop: 5,
  },
});
