import * as Haptics from 'expo-haptics'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native'
import { Path, Svg } from 'react-native-svg'

import { sp } from '@/constants/Colors'
import { FontFamily } from '@/constants/fonts'
import { spacing } from '@/constants/spacing'
import { fontSize } from '@/constants/typography'
import { WeightUnit } from '@/store/onboardingStore'

const ITEM_W = 30
const KG_MIN = 30
const KG_MAX = 200
const LB_MIN = 66
const LB_MAX = 440

export interface WeightPickerProps {
  value: number
  unit: WeightUnit
  onChange: (weight: number) => void
  onUnitChange: (unit: WeightUnit) => void
}

/**
 * WeightPicker — 体重横向标尺选择器
 *
 * 顶部 KG/LB 切换，中央大号显示当前值，下方为带刻度的滑动标尺。
 *
 * Props:
 * - value: 当前体重（整数，单位由 unit 决定）
 * - unit: 'kg' | 'lb'
 * - onChange: 体重变化回调
 * - onUnitChange: 单位切换回调
 */
export function WeightPicker({
  value,
  unit,
  onChange,
  onUnitChange,
}: WeightPickerProps) {
  const { width: screenW } = useWindowDimensions()
  const padding = (screenW - ITEM_W) / 2

  const weights = useMemo(() => {
    const min = unit === 'kg' ? KG_MIN : LB_MIN
    const max = unit === 'kg' ? KG_MAX : LB_MAX
    return Array.from({ length: max - min + 1 }, (_, i) => min + i)
  }, [unit])

  const listRef = useRef<FlatList>(null)
  const [display, setDisplay] = useState(value)

  useEffect(() => {
    const min = unit === 'kg' ? KG_MIN : LB_MIN
    const idx = value - min
    const timer = setTimeout(() => {
      listRef.current?.scrollToOffset({ offset: idx * ITEM_W, animated: false })
    }, 80)
    return () => clearTimeout(timer)
  }, [unit])

  const handleScroll = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      const idx = Math.round(e.nativeEvent.contentOffset.x / ITEM_W)
      const clamped = Math.max(0, Math.min(idx, weights.length - 1))
      const next = weights[clamped]
      if (next !== display) {
        setDisplay(next)
        onChange(next)
        if (Platform.OS === 'ios') {
          Haptics.selectionAsync()
        }
      }
    },
    [display, onChange, weights]
  )

  const switchUnit = (u: WeightUnit) => {
    if (u === unit) return
    const converted =
      u === 'lb' ? Math.round(display * 2.20462) : Math.round(display / 2.20462)
    onUnitChange(u)
    onChange(converted)
    setDisplay(converted)
  }

  return (
    <View style={styles.container}>
      <View style={styles.toggle}>
        {(['kg', 'lb'] as WeightUnit[]).map((u) => (
          <Pressable
            key={u}
            style={[styles.toggleBtn, unit === u && styles.toggleBtnActive]}
            onPress={() => switchUnit(u)}
          >
            <Text style={[styles.toggleText, unit === u && styles.toggleTextActive]}>
              {u.toUpperCase()}
            </Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.wrapper}>
        <Text style={styles.displayNum}>{display}</Text>

        <View style={styles.rulerBg}>
          <FlatList
            ref={listRef}
            data={weights}
            horizontal
            showsHorizontalScrollIndicator={false}
            snapToInterval={ITEM_W}
            snapToAlignment="start"
            decelerationRate="fast"
            scrollEventThrottle={16}
            onScroll={handleScroll}
            contentContainerStyle={{ paddingHorizontal: padding }}
            getItemLayout={(_, index) => ({
              length: ITEM_W,
              offset: index * ITEM_W,
              index,
            })}
            keyExtractor={(item) => String(item)}
            renderItem={({ item }) => {
              const isSelected = item === display
              const isMajor = item % 5 === 0
              return (
                <View style={styles.rulerItem}>
                  <Text style={[styles.rulerNum, isSelected && styles.rulerNumSelected]}>
                    {isMajor || isSelected ? item : ''}
                  </Text>
                  <View
                    style={[
                      styles.tick,
                      isMajor ? styles.tickMajor : styles.tickMinor,
                      isSelected && styles.tickSelected,
                    ]}
                  />
                </View>
              )
            }}
          />
        </View>

        <View style={styles.indicator}>
          <Svg width={26} height={26} viewBox="0 0 1024 1024">
            <Path
              d="M599.04 148.48l409.6 624.64c40.96 66.56-10.24 153.6-87.04 153.6L102.4 926.72c-76.80000001 0-128-87.04-87.04-153.6l409.6-624.64c35.84-66.56 138.24000001-66.56 174.08 0z"
              fill={sp.text}
            />
          </Svg>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  wrapper: {
    alignItems: 'center',
    marginTop: spacing['7xl'],
  },
  toggle: {
    flexDirection: 'row',
    backgroundColor: sp.purple,
    borderRadius: 24,
    padding: 3,
    marginTop: spacing.xl,
    width: 180,
  },
  toggleBtn: {
    flex: 1,
    paddingVertical: spacing.sm,
    borderRadius: 22,
    alignItems: 'center',
  },
  toggleBtnActive: {
    backgroundColor: sp.surface,
  },
  toggleText: {
    fontSize: fontSize.base,
    fontFamily: FontFamily.PoppinsMedium,
    color: 'rgba(255,255,255,0.7)',
  },
  toggleTextActive: {
    color: sp.accent,
  },
  displayNum: {
    fontSize: fontSize.hero,
    fontFamily: FontFamily.PoppinsBold,
    color: sp.accent,
    marginBottom: spacing.sm,
    lineHeight: 80,
  },
  rulerBg: {
    width: '100%',
    backgroundColor: sp.purple,
    borderRadius: spacing.md,
    overflow: 'hidden',
    paddingVertical: spacing['2xl'],
  },
  rulerItem: {
    width: ITEM_W,
    alignItems: 'center',
    paddingBottom: spacing.xs,
  },
  rulerNum: {
    fontSize: fontSize.md,
    fontFamily: FontFamily.InterRegular,
    color: 'rgba(255,255,255,0.6)',
    marginBottom: spacing.xs,
    height: 18,
  },
  rulerNumSelected: {
    color: sp.surface,
    fontFamily: FontFamily.InterBold,
    fontSize: fontSize.xl,
  },
  tick: {
    width: 2,
    borderRadius: 1,
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  tickMajor: {
    height: 34,
    backgroundColor: 'rgba(255,255,255,0.85)',
  },
  tickMinor: {
    height: 24,
  },
  tickSelected: {
    backgroundColor: sp.surface,
    width: 3,
    height: 42,
  },
  indicator: {
    marginTop: spacing.sm,
  },
})
