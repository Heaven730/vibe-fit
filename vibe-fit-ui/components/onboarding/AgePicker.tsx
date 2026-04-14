import * as Haptics from 'expo-haptics'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Platform,
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

const ITEM_W = 64
const MIN_AGE = 10
const MAX_AGE = 100
const ages = Array.from({ length: MAX_AGE - MIN_AGE + 1 }, (_, i) => MIN_AGE + i)

export interface AgePickerProps {
  value: number
  onChange: (age: number) => void
}

/**
 * AgePicker — 年龄横向滚动选择器
 *
 * 中央显示当前选中年龄（大号紫色），下方为可滑动的数字标尺。
 *
 * Props:
 * - value: 当前年龄
 * - onChange: 年龄变化时回调
 */
export function AgePicker({ value, onChange }: AgePickerProps) {
  const { width: screenW } = useWindowDimensions()
  const padding = (screenW - ITEM_W) / 2
  const listRef = useRef<FlatList>(null)
  const [display, setDisplay] = useState(value)

  useEffect(() => {
    const idx = value - MIN_AGE
    const timer = setTimeout(() => {
      listRef.current?.scrollToOffset({ offset: idx * ITEM_W, animated: false })
    }, 80)
    return () => clearTimeout(timer)
  }, [])

  const handleScroll = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      const idx = Math.round(e.nativeEvent.contentOffset.x / ITEM_W)
      const clamped = Math.max(0, Math.min(idx, ages.length - 1))
      const next = ages[clamped]
      if (next !== display) {
        setDisplay(next)
        onChange(next)
        if (Platform.OS === 'ios') {
          Haptics.selectionAsync()
        }
      }
    },
    [display, onChange]
  )

  return (
    <View style={styles.wrapper}>
      <Text style={styles.displayNum}>{display}</Text>
      <View style={styles.indicator}>
        <Svg width={24} height={24} viewBox="0 0 1024 1024">
          <Path
            d="M599.04 148.48l409.6 624.64c40.96 66.56-10.24 153.6-87.04 153.6L102.4 926.72c-76.80000001 0-128-87.04-87.04-153.6l409.6-624.64c35.84-66.56 138.24000001-66.56 174.08 0z"
            fill={sp.text}
          />
        </Svg>
      </View>

      <View style={styles.rulerBg}>
        <FlatList
          ref={listRef}
          data={ages}
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
            return (
              <View style={styles.ageItem}>
                <Text style={[styles.ageNum, isSelected && styles.ageNumSelected]}>
                  {item}
                </Text>
              </View>
            )
          }}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    marginBottom: 150,
  },
  displayNum: {
    fontSize: fontSize.hero,
    fontFamily: FontFamily.PoppinsBold,
    color: sp.accent,
    lineHeight: 80,
  },
  indicator: {
    marginBottom: spacing.xs,
  },
  rulerBg: {
    width: '100%',
    backgroundColor: sp.purple,
    borderRadius: spacing.md,
    overflow: 'hidden',
    paddingVertical: 38,
  },
  ageItem: {
    width: ITEM_W,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ageNum: {
    fontSize: fontSize['6xl'],
    fontFamily: FontFamily.PoppinsMedium,
    color: 'rgba(255,255,255,0.6)',
  },
  ageNumSelected: {
    fontSize: fontSize['8xl'],
    color: sp.surface,
    fontFamily: FontFamily.PoppinsBold,
  },
})
