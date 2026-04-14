import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'

import { sp } from '@/constants/Colors'
import { FontFamily } from '@/constants/fonts'
import { spacing } from '@/constants/spacing'
import { fontSize } from '@/constants/typography'
import { Gender } from '@/store/onboardingStore'

export interface GenderPickerProps {
  value: Gender | null
  onChange: (gender: Gender) => void
}

const OPTIONS: { value: Gender; symbol: string; label: string }[] = [
  { value: 'male', symbol: '♂', label: 'Male' },
  { value: 'female', symbol: '♀', label: 'Female' },
]

const CIRCLE_SIZE = 200

/**
 * GenderPicker — 性别选择器
 *
 * 显示男/女两个圆形按钮，点击选中，选中项变为紫色。
 *
 * Props:
 * - value: 当前选中的性别，null 表示未选
 * - onChange: 点击后回调
 */
export function GenderPicker({ value, onChange }: GenderPickerProps) {
  return (
    <View style={styles.container}>
      {OPTIONS.map((opt) => {
        const selected = opt.value === value
        return (
          <Pressable
            key={opt.value}
            style={styles.item}
            onPress={() => onChange(opt.value)}
          >
            <View
              style={[
                styles.circle,
                selected ? styles.circleSelected : styles.circleDefault,
              ]}
            >
              <Text
                style={[
                  styles.symbol,
                  selected ? styles.symbolSelected : styles.symbolDefault,
                ]}
              >
                {opt.symbol}
              </Text>
            </View>
            <Text style={[styles.label, selected && styles.labelSelected]}>
              {opt.label}
            </Text>
          </Pressable>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: spacing.xl,
  },
  item: {
    alignItems: 'center',
    gap: spacing.sm,
  },
  circle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: spacing.xs },
    shadowOpacity: 0.1,
    shadowRadius: spacing.md,
    elevation: 4,
  },
  circleDefault: {
    backgroundColor: '#F0EFF5',
  },
  circleSelected: {
    backgroundColor: sp.purple,
  },
  symbol: {
    fontSize: fontSize.hero,
    lineHeight: 80,
  },
  symbolDefault: {
    color: sp.accent,
  },
  symbolSelected: {
    color: sp.surface,
  },
  label: {
    fontSize: fontSize.xl,
    fontFamily: FontFamily.InterRegular,
    color: sp['text-secondary'],
  },
  labelSelected: {
    color: sp.accent,
    fontFamily: FontFamily.InterBold,
  },
})
