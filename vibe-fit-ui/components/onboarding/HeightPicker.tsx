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

const ITEM_H = 25
const RULER_H = 480
const RULER_W = 120
const MIN_H = 100
const MAX_H = 250
const PADDING = (RULER_H - ITEM_H) / 2
const H_PADDING = spacing.xl
const INDICATOR_W = 60

/** 降序：index 0 = MAX_H */
const heights = Array.from({ length: MAX_H - MIN_H + 1 }, (_, i) => MAX_H - i)

function getLabelStyle(h: number, selected: number) {
  const dist = Math.abs(h - selected)
  if (dist === 0)
    return { fontSize: fontSize['7xl'], color: sp.accent, fontFamily: FontFamily.PoppinsBold }
  if (dist <= 5)
    return { fontSize: fontSize['5xl'], color: '#B8A7FF', fontFamily: FontFamily.PoppinsMedium }
  if (dist <= 10)
    return { fontSize: fontSize['4xl'], color: '#D4C9FF', fontFamily: FontFamily.PoppinsRegular }
  return { fontSize: fontSize['3xl'], color: '#E2DAFF', fontFamily: FontFamily.PoppinsRegular }
}

export interface HeightPickerProps {
  value: number
  onChange: (height: number) => void
}

/**
 * HeightPicker — 身高纵向标尺选择器
 *
 * 左侧数字浮动缩放，右侧紫色标尺可拖动，
 * 中心固定深蓝选中线和 ◄ 指示箭头。
 *
 * Props:
 * - value: 当前身高（cm）
 * - onChange: 身高变化回调
 */
export function HeightPicker({ value, onChange }: HeightPickerProps) {
  const { width: screenW } = useWindowDimensions()
  const listRef = useRef<FlatList>(null)
  const [display, setDisplay] = useState(value)

  const innerW = screenW - H_PADDING * 2
  const NUMBERS_W = innerW - RULER_W - INDICATOR_W

  useEffect(() => {
    const idx = MAX_H - value
    const timer = setTimeout(() => {
      listRef.current?.scrollToOffset({ offset: idx * ITEM_H, animated: false })
    }, 80)
    return () => clearTimeout(timer)
  }, [])

  const handleScroll = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      const idx = Math.round(e.nativeEvent.contentOffset.y / ITEM_H)
      const clamped = Math.max(0, Math.min(idx, heights.length - 1))
      const next = heights[clamped]
      if (next !== display) {
        setDisplay(next)
        onChange(next)
        if (Platform.OS === 'ios') Haptics.selectionAsync()
      }
    },
    [display, onChange]
  )

  return (
    <View style={[styles.container, { paddingHorizontal: H_PADDING }]}>
      <View style={[styles.inner, { height: RULER_H }]}>
        {/* ① 紫色标尺背景 */}
        <View
          style={[styles.rulerBg, { right: INDICATOR_W, width: RULER_W }]}
          pointerEvents="none"
        />

        {/* ② FlatList — 全幅接受触摸，渲染刻度线 */}
        <FlatList
          ref={listRef}
          data={heights}
          style={StyleSheet.absoluteFillObject}
          showsVerticalScrollIndicator={false}
          snapToInterval={ITEM_H}
          snapToAlignment="start"
          decelerationRate="fast"
          scrollEventThrottle={16}
          onScroll={handleScroll}
          contentContainerStyle={{ paddingVertical: PADDING }}
          getItemLayout={(_, index) => ({
            length: ITEM_H,
            offset: index * ITEM_H,
            index,
          })}
          keyExtractor={(item) => String(item)}
          renderItem={({ item }) => {
            const isSelected = item === display
            const isMajor10 = item % 10 === 0
            const isMajor5 = item % 5 === 0
            const tickW = isSelected
              ? RULER_W - 20
              : isMajor10
              ? RULER_W * 0.7
              : isMajor5
              ? RULER_W * 0.54
              : RULER_W * 0.34
            const tickColor = isSelected
              ? sp['selected-line']
              : isMajor5
              ? 'rgba(255,255,255,0.85)'
              : 'rgba(255,255,255,0.5)'
            const tickH = isSelected ? 3 : 2
            const s = getLabelStyle(item, display)

            return (
              <View style={[styles.row, { height: ITEM_H, width: innerW }]}>
                {/* 左侧数字：5的倍数显示（选中时隐藏，由浮层接管） */}
                <View style={[styles.numberArea, { width: NUMBERS_W }]}>
                  {isMajor5 && !isSelected && (
                    <Text
                      style={{
                        fontSize: s.fontSize,
                        color: s.color,
                        fontFamily: s.fontFamily,
                      }}
                    >
                      {item}
                    </Text>
                  )}
                </View>
                {/* 刻度区 */}
                <View style={[styles.tickArea, { width: RULER_W }]}>
                  <View
                    style={[
                      styles.tick,
                      {
                        width: tickW,
                        height: tickH,
                        backgroundColor: tickColor,
                      },
                    ]}
                  />
                </View>
                {/* ◄ 占位 */}
                <View style={{ width: INDICATOR_W }} />
              </View>
            )
          }}
        />

        {/* ③ 选中数字浮层 — 不受行高裁剪 */}
        <View
          style={[styles.selectedOverlay, { width: NUMBERS_W, top: RULER_H / 2 - 21 }]}
          pointerEvents="none"
        >
          <Text style={styles.selectedText}>{display} cm</Text>
        </View>

        {/* ④ ◄ 指示箭头 */}
        <View
          style={[styles.indicatorWrapper, { top: RULER_H / 2 - 13, right: 15, width: INDICATOR_W }]}
          pointerEvents="none"
        >
          <Svg width={20} height={20} viewBox="0 0 1024 1024">
            <Path
              d="M151.23999999 602.88c-54.78-31.04-71.67-96.82-37.71999999-146.91 9.49-14.01 22.4-25.81 37.72-34.49L747.92 80.01c54.65-31.23 126.65-16.04 160.81 33.93 11.68 17.08 17.83 36.84 17.74 56.98L926.47 853.85c-0.27000001 58.93-52.72 106.52-117.17 106.28-21.71-0.08-42.97-5.7-61.38-16.22l-596.68000001-341.03z"
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
    alignItems: 'center',
  },
  inner: {
    width: '100%',
    position: 'relative',
  },
  rulerBg: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    backgroundColor: sp.purple,
    borderRadius: 30,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  numberArea: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingRight: spacing.md,
    overflow: 'visible',
  },
  tickArea: {
    paddingLeft: spacing.sm,
    justifyContent: 'center',
  },
  tick: {
    borderRadius: 1,
  },
  selectedOverlay: {
    position: 'absolute',
    alignItems: 'flex-end',
    paddingRight: spacing.md,
  },
  selectedText: {
    fontSize: fontSize['7xl'],
    color: sp.accent,
    fontFamily: FontFamily.PoppinsBold,
  },
  indicatorWrapper: {
    position: 'absolute',
    alignItems: 'center',
  },
})
