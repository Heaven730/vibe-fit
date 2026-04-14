import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'

import { sp } from '@/constants/Colors'
import { FontFamily } from '@/constants/fonts'
import { spacing } from '@/constants/spacing'
import { fontSize } from '@/constants/typography'

const LEVELS = [
  { value: 1, label: 'Beginner' },
  { value: 2, label: 'Intermediate' },
  { value: 3, label: 'Advance' },
]

export interface ActivityPickerProps {
  value: number
  onChange: (level: number) => void
}

/**
 * ActivityPicker — 运动等级单选卡片列表
 *
 * Props:
 * - value: 当前选中等级（1 Beginner / 2 Intermediate / 3 Advance）
 * - onChange: 选项变化回调
 */
export function ActivityPicker({ value, onChange }: ActivityPickerProps) {
  return (
    <View style={styles.wrapple}>
      <View style={styles.container}>
        {LEVELS.map((level) => {
          const isSelected = level.value === value
          return (
            <Pressable
              key={level.value}
              style={[styles.card, isSelected && styles.cardSelected]}
              onPress={() => onChange(level.value)}
            >
              <Text style={[styles.label, isSelected && styles.labelSelected]}>
                {level.label}
              </Text>
            </Pressable>
          )
        })}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapple: {
    flex: 1,
  },
  container: {
    gap: spacing['4xl'],
    top: spacing['6xl'],
    paddingHorizontal: spacing.xl,
  },
  card: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: sp.surface,
    borderRadius: 50,
    paddingVertical: spacing.xl,
    shadowColor: sp['border-muted'],
    shadowOffset: { width: 0, height: spacing.xs },
    shadowOpacity: 0.25,
    shadowRadius: spacing.sm,
    elevation: 3,
  },
  cardSelected: {
    backgroundColor: sp.purple,
  },
  label: {
    fontSize: fontSize['2xl'],
    fontFamily: FontFamily.PoppinsMedium,
    color: sp.accent,
  },
  labelSelected: {
    color: sp.text,
    fontFamily: FontFamily.PoppinsBold,
  },
})
