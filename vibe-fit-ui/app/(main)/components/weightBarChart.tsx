import { useMemo } from 'react'
import { Text, View } from 'react-native'

import { useLanguage } from '@/hooks/useLanguage'
import { useTheme } from '@/hooks/useTheme'

// ─── Mock 数据（key: "YYYY-MM-DD"） ────────────────────────────────────────────

const MOCK_WEIGHT: Record<string, number> = {
  // 上周 (Apr 6–12)
  '2026-04-06': 73.2,
  '2026-04-07': 73.5,
  '2026-04-08': 72.9,
  '2026-04-09': 73.1,
  '2026-04-10': 72.7,
  '2026-04-11': 72.4,
  '2026-04-12': 72.8,
  // 本周 (Apr 13–19)
  '2026-04-13': 72.6,
  '2026-04-14': 72.3,
  '2026-04-15': 72.2,
  '2026-04-16': 72.1,
  '2026-04-17': null as unknown as number,
  '2026-04-18': null as unknown as number,
  '2026-04-19': null as unknown as number,
}

const CHART_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const CHART_HEIGHT = 140 // 柱区域总高度（不含标签）
const BAR_MIN_H = 12 // 有数据时最小柱高

// ─── 辅助函数 ────────────────────────────────────────────────────────────────

function toKey(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
    2,
    '0'
  )}-${String(d.getDate()).padStart(2, '0')}`
}

function getWeekDates(year: number, month: number, date: number): Date[] {
  const anchor = new Date(year, month, date)
  const dow = anchor.getDay()
  const diffMon = dow === 0 ? -6 : 1 - dow
  const monday = new Date(anchor)
  monday.setDate(anchor.getDate() + diffMon)
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday)
    d.setDate(monday.getDate() + i)
    return d
  })
}

function shiftWeek(dates: Date[], days: number): Date[] {
  return dates.map((d) => {
    const nd = new Date(d)
    nd.setDate(d.getDate() + days)
    return nd
  })
}

// ─── Props ───────────────────────────────────────────────────────────────────

export interface WeightBarChartProps {
  /** 当前展示的年份 */
  year: number
  /** 当前展示的月份，0-indexed */
  month: number
  /** 当前选中的日期数字 */
  selectedDate: number
}

/**
 * WeightBarChart — 周体重层叠对比柱状图
 *
 * 三层结构（底部对齐，重叠显示）：
 * - 背景层：全高浅紫透明圆角矩形
 * - 中间层：上周数据（淡紫色柱，顶部圆角）
 * - 顶层：本周数据（暖黄色柱，顶部圆角，覆盖在紫色之上）
 */
export function WeightBarChart({
  year,
  month,
  selectedDate,
}: WeightBarChartProps) {
  const { t } = useLanguage()
  const { theme } = useTheme()
  const thisWeekDates = useMemo(
    () => getWeekDates(year, month, selectedDate),
    [year, month, selectedDate]
  )
  const lastWeekDates = useMemo(
    () => shiftWeek(thisWeekDates, -7),
    [thisWeekDates]
  )

  const thisWeekData = useMemo(
    () => thisWeekDates.map((d) => MOCK_WEIGHT[toKey(d)] ?? null),
    [thisWeekDates]
  )
  const lastWeekData = useMemo(
    () => lastWeekDates.map((d) => MOCK_WEIGHT[toKey(d)] ?? null),
    [lastWeekDates]
  )

  // 所有有效值合并，统一计算 range
  const allValues = useMemo(
    () =>
      [...thisWeekData, ...lastWeekData].filter(
        (v): v is number => v !== null
      ),
    [lastWeekData, thisWeekData]
  )
  const minW = allValues.length ? Math.min(...allValues) : 70
  const maxW = allValues.length ? Math.max(...allValues) : 75
  const range = maxW - minW || 1

  function calcH(w: number | null): number {
    if (w === null) return 0
    return BAR_MIN_H + ((w - minW) / range) * (CHART_HEIGHT - BAR_MIN_H - 24)
  }

  // 周标注
  const weekStart = thisWeekDates[0]
  const weekEnd = thisWeekDates[6]
  const monthNames = useMemo(
    () => [
      t('monthJanuary'),
      t('monthFebruary'),
      t('monthMarch'),
      t('monthApril'),
      t('monthMay'),
      t('monthJune'),
      t('monthJuly'),
      t('monthAugust'),
      t('monthSeptember'),
      t('monthOctober'),
      t('monthNovember'),
      t('monthDecember'),
    ],
    [t]
  )
  const fmt = (d: Date) => `${d.getDate()} ${monthNames[d.getMonth()]}`

  const todayKey = toKey(new Date())
  const selectedKey = toKey(new Date(year, month, selectedDate))

  // 本周平均
  const thisValid = useMemo(
    () => thisWeekData.filter((v): v is number => v !== null),
    [thisWeekData]
  )
  const lastValid = useMemo(
    () => lastWeekData.filter((v): v is number => v !== null),
    [lastWeekData]
  )
  const avg = (arr: number[]) =>
    arr.length ? (arr.reduce((a, b) => a + b, 0) / arr.length).toFixed(1) : null

  return (
    <View
      className="mx-4 mb-5 rounded-3xl px-5 py-5"
      style={{
        backgroundColor: theme.surface,
        shadowColor: theme.shadow,
        shadowOpacity: 0.08,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 4 },
        elevation: 3,
      }}
    >
      {/* ── 标题行 */}
      <View className="flex-row items-center justify-between mb-1">
        <Text
          className="font-poppins-bold"
          style={{ fontSize: 15, color: theme.textPrimary }}
        >
          {t('weeklyWeight')}
        </Text>
        <Text
          className="font-poppins"
          style={{ fontSize: 11, color: theme.textSecondary }}
        >
          {fmt(weekStart)} – {fmt(weekEnd)}
        </Text>
      </View>

      {/* ── 均值对比 */}
      <View className="flex-row items-center gap-3 mb-5">
        {avg(thisValid) && (
          <View className="flex-row items-center gap-1">
            <View
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: theme.accent }}
            />
            <Text
              className="font-poppins-medium"
              style={{ fontSize: 11, color: theme.accent }}
            >
              {t('thisLabel')} {avg(thisValid)} kg
            </Text>
          </View>
        )}
        {avg(lastValid) && (
          <View className="flex-row items-center gap-1">
            <View
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: theme.accentMuted }}
            />
            <Text
              className="font-poppins-medium"
              style={{ fontSize: 11, color: theme.textSecondary }}
            >
              {t('lastLabel')} {avg(lastValid)} kg
            </Text>
          </View>
        )}
      </View>

      {/* ── 柱状图区域 */}
      <View className="flex-row items-end justify-between">
        {CHART_LABELS.map((label, i) => {
          const key = toKey(thisWeekDates[i])
          const isToday = key === todayKey
          const isSelected = key === selectedKey

          const thisH = calcH(thisWeekData[i])
          const lastH = calcH(lastWeekData[i])

          const hasThis = thisWeekData[i] !== null
          const hasLast = lastWeekData[i] !== null

          return (
            <View key={i} className="items-center flex-1">
              {/* 数值标签（本周） */}
              <Text
                className="font-poppins-medium mb-1"
                style={{
                  fontSize: 9,
                  minHeight: 12,
                  color: hasThis
                    ? isSelected || isToday
                      ? theme.accent
                      : theme.textSecondary
                    : 'transparent',
                }}
              >
                {hasThis ? thisWeekData[i]!.toFixed(1) : '·'}
              </Text>

              {/* 三层柱体容器 */}
              <View
                style={{
                  height: CHART_HEIGHT,
                  width: 28,
                  position: 'relative',
                  overflow: 'hidden',
                  borderRadius: 10,
                }}
              >
                {/* 层 1：背景（全高浅紫透明圆角矩形） */}
                <View
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: CHART_HEIGHT,
                    borderRadius: 10,
                    backgroundColor: theme.accentSubtle,
                  }}
                />

                {/* 层 2：上周柱（淡紫，全圆角，底部对齐） */}
                {hasLast && (
                  <View
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: lastH,
                      backgroundColor: theme.accentMuted,
                      borderRadius: 10,
                    }}
                  />
                )}

                {/* 层 3：本周柱（暖黄，全圆角，底部对齐，覆盖在紫色之上） */}
                {hasThis && (
                  <View
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: thisH,
                      backgroundColor: theme.accent,
                      opacity: isSelected || isToday ? 1 : 0.75,
                      borderRadius: 10,
                    }}
                  />
                )}
              </View>

              {/* X 轴标签 */}
              <Text
                className="font-poppins-medium mt-2"
                style={{
                  fontSize: 10,
                  color: isSelected || isToday ? theme.accent : theme.textMuted,
                  fontWeight: isSelected || isToday ? '700' : '400',
                }}
              >
                {label}
              </Text>
            </View>
          )
        })}
      </View>

      {/* ── 图例 */}
      <View className="flex-row items-center mt-4 gap-4">
        <View className="flex-row items-center gap-1">
          <View
            className="w-2.5 h-2.5 rounded-sm"
            style={{ backgroundColor: theme.accent }}
          />
          <Text
            className="font-poppins"
            style={{ fontSize: 10, color: theme.textSecondary }}
          >
            {t('thisWeek')}
          </Text>
        </View>
        <View className="flex-row items-center gap-1">
          <View
            className="w-2.5 h-2.5 rounded-sm"
            style={{ backgroundColor: theme.accentMuted }}
          />
          <Text
            className="font-poppins"
            style={{ fontSize: 10, color: theme.textSecondary }}
          >
            {t('lastWeek')}
          </Text>
        </View>
        <View className="flex-row items-center gap-1">
          <View
            className="w-2.5 h-2.5 rounded-sm"
            style={{
              backgroundColor: theme.accentSubtle,
              borderWidth: 1,
              borderColor: theme.accentMuted,
            }}
          />
          <Text
            className="font-poppins"
            style={{ fontSize: 10, color: theme.textSecondary }}
          >
            {t('noData')}
          </Text>
        </View>
      </View>
    </View>
  )
}
