import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'

import { sp } from '@/constants/Colors'
import { FontFamily } from '@/constants/fonts'
import { spacing } from '@/constants/spacing'
import { fontSize } from '@/constants/typography'

const GOALS = [
  'Lose Weight',
  'Gain Weight',
  'Muscle Mass Gain',
  'Shape Body',
  'Others',
]

export interface GoalPickerProps {
  value: string
  onChange: (goal: string) => void
}

/**
 * GoalPicker — 健身目标单选列表
 *
 * Props:
 * - value: 当前选中的目标字符串
 * - onChange: 选项变化回调
 */
export function GoalPicker({ value, onChange }: GoalPickerProps) {
  return (
    <View style={styles.container}>
      {GOALS.map((goal) => {
        const isSelected = goal === value
        return (
          <Pressable
            key={goal}
            style={styles.card}
            onPress={() => onChange(goal)}
          >
            <Text style={styles.label}>{goal}</Text>
            <View style={[styles.radio, isSelected && styles.radioSelected]}>
              {isSelected && <View style={styles.radioDot} />}
            </View>
          </Pressable>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 34,
    paddingHorizontal: spacing.xl,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: sp.surface,
    borderRadius: 50,
    paddingVertical: 18,
    paddingHorizontal: spacing['2xl'],
    shadowColor: sp['border-muted'],
    shadowOffset: { width: 0, height: spacing.xs },
    shadowOpacity: 0.25,
    shadowRadius: spacing.sm,
    elevation: 3,
  },
  label: {
    fontSize: fontSize.xl,
    fontFamily: FontFamily.PoppinsRegular,
    color: sp.text,
  },
  radio: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: sp.text,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioSelected: {
    borderColor: sp.accent,
  },
  radioDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: sp.accent,
  },
})
