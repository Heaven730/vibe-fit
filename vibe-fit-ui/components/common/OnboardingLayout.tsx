import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useTheme } from '@/hooks/useTheme';

const PURPLE = '#9D8FFF';
const PROGRESS_TRACK = '#E0DCF8';

export interface OnboardingLayoutProps {
  /** 当前步骤（1 起） */
  step: number;
  /** 总步骤数 */
  totalSteps: number;
  /** 主标题 */
  title: string;
  /** 副标题 */
  subtitle?: string;
  /** 点击返回按钮 */
  onBack?: () => void;
  /** 点击继续按钮 */
  onContinue: () => void;
  /** 继续按钮是否禁用 */
  continueDisabled?: boolean;
  /** 中间内容（picker 区域） */
  children: React.ReactNode;
}

/**
 * OnboardingLayout — Onboarding 页面公共壳
 *
 * 包含：顶部返回 + 进度条、标题区、底部 continue 按钮。
 * 中间内容通过 children 注入。
 *
 * Props:
 * - step / totalSteps: 控制进度条进度
 * - title / subtitle: 标题区文字
 * - onBack: 返回按钮回调
 * - onContinue: continue 按钮回调
 * - continueDisabled: true 时按钮变灰不可点击
 * - children: 中间交互区内容
 */
export function OnboardingLayout({
  step,
  totalSteps,
  title,
  subtitle = 'Personalized health tracking starts with a few basic details.',
  onBack,
  onContinue,
  continueDisabled = false,
  children,
}: OnboardingLayoutProps) {
  const { theme } = useTheme();
  const progress = step / totalSteps;

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        colors={[theme.background, theme.background, theme.backgroundGradientEnd]}
        locations={[0, 0.5, 1]}
        style={StyleSheet.absoluteFillObject}
      />

      <SafeAreaView style={{ flex: 1 }}>
        {/* 顶部：返回按钮 + 进度条 */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={onBack}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            style={styles.backBtn}
          >
            <Text style={[styles.backIcon, { color: theme.textPrimary }]}>‹</Text>
          </TouchableOpacity>

          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
          </View>
        </View>

        {/* 标题区 */}
        <View style={styles.titleSection}>
          <Text style={[styles.title, { color: theme.textPrimary }]}>{title}</Text>
          <Text style={[styles.subtitle, { color: theme.textSecondary }]}>{subtitle}</Text>
        </View>

        {/* 中间 picker 内容 */}
        <View style={styles.content}>{children}</View>

        {/* 底部：continue 按钮 */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={[styles.btn, continueDisabled ? styles.btnDisabled : styles.btnActive]}
            onPress={onContinue}
            disabled={continueDisabled}
            activeOpacity={continueDisabled ? 1 : 0.75}
          >
            <Text style={[styles.btnText, continueDisabled ? styles.btnTextDisabled : styles.btnTextActive]}>
              continue
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 8,
    gap: 12,
  },
  backBtn: {
    width: 32,
    height: 32,
    justifyContent: 'center',
  },
  backIcon: {
    fontSize: 32,
    lineHeight: 36,
    fontFamily: 'Inter-Thin',
  },
  progressTrack: {
    flex: 1,
    height: 8,
    borderRadius: 4,
    backgroundColor: PROGRESS_TRACK,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
    backgroundColor: PURPLE,
  },
  titleSection: {
    paddingHorizontal: 20,
    marginTop: 24,
  },
  title: {
    fontSize: 32,
    lineHeight: 38,
    letterSpacing: -0.8,
    fontFamily: 'Inika-Bold',
  },
  subtitle: {
    marginTop: 8,
    fontSize: 15,
    lineHeight: 22,
    fontFamily: 'Inter-Regular',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  footer: {
    paddingHorizontal: 20,
    paddingBottom: 12,
  },
  btn: {
    height: 49,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnActive: {
    backgroundColor: '#1C1C1E',
  },
  btnDisabled: {
    backgroundColor: '#D0C9C7',
  },
  btnText: {
    fontSize: 24,
    letterSpacing: -0.41,
    fontFamily: 'Poppins-Medium',
  },
  btnTextActive: {
    color: '#FFFFFF',
  },
  btnTextDisabled: {
    color: '#6E6C6E',
  },
});
