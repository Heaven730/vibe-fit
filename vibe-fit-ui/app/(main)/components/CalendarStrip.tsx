import { useEffect, useMemo, useRef, useState } from 'react'
import { Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native'

import { useLanguage } from '@/hooks/useLanguage'
import { useTheme } from '@/hooks/useTheme'

export interface DayItem {
  date: number
  day: string
}

export interface CalendarStripProps {
  /** 整月日期列表（月初到月末） */
  days: DayItem[]
  /** 当前选中日期（date 数字，即日） */
  selectedDate: number
  /** 该月中不可选的边界日期（大于此值禁用），当前月传今天，历史月传 32 */
  today: number
  /** 切换选中日期的回调 */
  onSelectDate: (date: number) => void
  /** 是否允许长按月份标签切换月份，仅 calendar 页开启 */
  monthSelectable?: boolean
  /** 当前展示的年份（monthSelectable=true 时必传） */
  displayYear?: number
  /** 当前展示的月份，0-indexed（monthSelectable=true 时必传） */
  displayMonth?: number
  /** 切换月份回调，返回新的 year 和 month（0-indexed） */
  onMonthChange?: (year: number, month: number) => void
}

const ITEM_WIDTH = 52
const H_PADDING = 8

const MONTH_SHORT = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]
const WEEK_LABELS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

/**
 * 横向可滑动日历条
 *
 * - 展示整月日期，today 之后的日期不可选
 * - monthSelectable=true 时，顶部月份标签长按唤起两步选择器：
 *   Step 1 选月份 → Step 2 在弹框内选日期 → 关闭并定位到选中日期
 */
export function CalendarStrip({
  days,
  selectedDate,
  today,
  onSelectDate,
  monthSelectable = false,
  displayYear,
  displayMonth,
  onMonthChange,
}: CalendarStripProps) {
  const { language, t } = useLanguage()
  const { theme } = useTheme()
  const scrollRef = useRef<ScrollView>(null)
  const viewWidthRef = useRef(0)

  // Modal 状态
  const [pickerVisible, setPickerVisible] = useState(false)
  const [pickerStep, setPickerStep] = useState<'month' | 'day'>('month')
  const [pendingMonth, setPendingMonth] = useState<number>(0)

  const now = new Date()
  const nowYear = now.getFullYear()
  const nowMonth = now.getMonth()
  const nowDay = now.getDate()

  // 可选月份：今年 1 月(0) → 当前月
  const availableMonths = useMemo(
    () => Array.from({ length: nowMonth + 1 }, (_, i) => i),
    [nowMonth]
  )

  // 弹框内日期网格数据
  const pendingDaysInMonth = new Date(nowYear, pendingMonth + 1, 0).getDate()
  const pendingFirstWeekday = new Date(nowYear, pendingMonth, 1).getDay()
  const isPendingCurrentMonth = pendingMonth === nowMonth

  // 选中日期或月份变化后，滚动日历条到对应位置
  useEffect(() => {
    if (!monthSelectable) return
    const index = Math.min(selectedDate - 1, days.length - 1)
    const offset =
      H_PADDING + index * ITEM_WIDTH + ITEM_WIDTH / 2 - viewWidthRef.current / 2
    scrollRef.current?.scrollTo({ x: Math.max(0, offset), animated: true })
  }, [selectedDate, days, monthSelectable])

  function scrollToInitial() {
    const index = Math.min(today - 1, days.length - 1)
    const offset =
      H_PADDING + index * ITEM_WIDTH + ITEM_WIDTH / 2 - viewWidthRef.current / 2
    scrollRef.current?.scrollTo({ x: Math.max(0, offset), animated: false })
  }

  function openPicker() {
    setPendingMonth(displayMonth ?? nowMonth)
    setPickerStep('month')
    setPickerVisible(true)
  }

  function selectMonth(m: number) {
    setPendingMonth(m)
    setPickerStep('day')
  }

  function selectDay(date: number) {
    onMonthChange?.(nowYear, pendingMonth)
    onSelectDate(date)
    setPickerVisible(false)
  }

  const showMonthLabel =
    monthSelectable && displayYear !== undefined && displayMonth !== undefined
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
  const monthShort = useMemo(
    () =>
      language === 'zh'
        ? Array.from({ length: 12 }, (_, i) => `${i + 1}月`)
        : MONTH_SHORT,
    [language]
  )

  return (
    <>
      {/* ── 日历条 ──────────────────────────────────────── */}
      <View
        className="mx-4 mt-2 mb-4 rounded-2xl bg-white px-3"
        style={{
          backgroundColor: theme.surface,
          shadowColor: theme.shadow,
          shadowOpacity: 0.08,
          shadowRadius: 12,
          shadowOffset: { width: 0, height: 4 },
          elevation: 3,
        }}
        onLayout={(e) => {
          viewWidthRef.current = e.nativeEvent.layout.width
          scrollToInitial()
        }}
      >
        {showMonthLabel ? (
          <TouchableOpacity
            onLongPress={openPicker}
            delayLongPress={350}
            activeOpacity={0.6}
            className="flex-row items-center px-4 pt-3 pb-1"
          >
            <Text
              className="font-poppins-bold"
              style={{ fontSize: 13, color: theme.accent }}
            >
              {monthNames[displayMonth!]} {displayYear}
            </Text>
          </TouchableOpacity>
        ) : (
          <View className="pt-3" />
        )}

        <ScrollView
          ref={scrollRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: H_PADDING,
            paddingBottom: 12,
          }}
        >
          {days.map((item) => {
            const isSelected = item.date === selectedDate
            const isDisabled = item.date > today
            return (
              <TouchableOpacity
                key={item.date}
                onPress={() => !isDisabled && onSelectDate(item.date)}
                activeOpacity={isDisabled ? 1 : 0.7}
                style={{ width: ITEM_WIDTH }}
                className="items-center py-1"
              >
                <Text
                  className="font-poppins-medium mb-1"
                  style={{
                    fontSize: 11,
                    opacity: isDisabled ? 0.3 : 1,
                    color:
                      isSelected && !isDisabled
                        ? theme.accent
                        : theme.textMuted,
                  }}
                >
                  {item.day}
                </Text>
                <View
                  className="w-9 h-9 rounded-full items-center justify-center"
                  style={{
                    backgroundColor:
                      isSelected && !isDisabled
                        ? theme.accent
                        : 'transparent',
                  }}
                >
                  <Text
                    className="font-poppins-bold"
                    style={{
                      fontSize: 15,
                      opacity: isDisabled ? 0.3 : 1,
                      color:
                        isSelected && !isDisabled
                          ? theme.onAccent
                          : theme.textPrimary,
                    }}
                  >
                    {item.date}
                  </Text>
                </View>
                {isSelected && !isDisabled && (
                  <View
                    className="w-1 h-1 rounded-full mt-1"
                    style={{ backgroundColor: theme.accent }}
                  />
                )}
              </TouchableOpacity>
            )
          })}
        </ScrollView>
      </View>

      {/* ── 两步选择 Modal ───────────────────────────────── */}
      {monthSelectable && (
        <Modal
          visible={pickerVisible}
          transparent
          animationType="fade"
          onRequestClose={() => setPickerVisible(false)}
        >
          <TouchableOpacity
            style={{
              flex: 1,
              backgroundColor: 'rgba(0,0,0,0.35)',
              justifyContent: 'center',
              alignItems: 'center',
              paddingHorizontal: 24,
            }}
            activeOpacity={1}
            onPress={() => setPickerVisible(false)}
          >
            <TouchableOpacity activeOpacity={1}>
              <View
                className="rounded-3xl px-5 py-5"
                style={{
                  width: 320,
                  backgroundColor: theme.surface,
                  shadowColor: theme.shadow,
                  shadowOpacity: 0.15,
                  shadowRadius: 20,
                  shadowOffset: { width: 0, height: 8 },
                  elevation: 10,
                }}
              >
                {/* ─ Step 1: 选月份 ─ */}
                {pickerStep === 'month' && (
                  <>
                    <Text
                      className="font-poppins-bold text-center mb-4"
                      style={{ fontSize: 16, color: theme.textPrimary }}
                    >
                      {nowYear}
                    </Text>
                    <View className="flex-row flex-wrap gap-2 justify-center">
                      {availableMonths.map((m) => {
                        const isActive = m === displayMonth
                        return (
                          <TouchableOpacity
                            key={m}
                            onPress={() => selectMonth(m)}
                            className="rounded-2xl px-4 py-2"
                            style={{
                              backgroundColor: isActive
                                ? theme.accent
                                : theme.accentSubtle,
                              minWidth: 72,
                              alignItems: 'center',
                            }}
                          >
                            <Text
                              className="font-poppins-medium"
                              style={{
                                fontSize: 13,
                                color: isActive ? theme.onAccent : theme.accent,
                              }}
                            >
                              {monthShort[m]}
                            </Text>
                          </TouchableOpacity>
                        )
                      })}
                    </View>
                  </>
                )}

                {/* ─ Step 2: 选日期 ─ */}
                {pickerStep === 'day' && (
                  <>
                    {/* 标题 + 返回 */}
                    <View className="flex-row items-center mb-4">
                      <TouchableOpacity
                        onPress={() => setPickerStep('month')}
                        className="pr-3"
                        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                      >
                        <Text
                          className="font-poppins-bold"
                          style={{ fontSize: 18, color: theme.accent }}
                        >
                          ‹
                        </Text>
                      </TouchableOpacity>
                      <Text
                        className="font-poppins-bold flex-1 text-center"
                        style={{ fontSize: 15, color: theme.textPrimary }}
                      >
                        {monthNames[pendingMonth]} {nowYear}
                      </Text>
                      {/* 占位保持标题居中 */}
                      <View style={{ width: 24 }} />
                    </View>

                    {/* 星期标题行 */}
                    <View className="flex-row mb-1">
                      {WEEK_LABELS.map((w) => (
                        <Text
                          key={w}
                          className="font-poppins-medium text-center"
                          style={{
                            width: `${100 / 7}%`,
                            fontSize: 11,
                            color: theme.textSecondary,
                          }}
                        >
                          {w}
                        </Text>
                      ))}
                    </View>

                    {/* 日期网格 */}
                    <View className="flex-row flex-wrap">
                      {/* 首日偏移空格 */}
                      {Array.from({ length: pendingFirstWeekday }).map(
                        (_, i) => (
                          <View
                            key={`empty-${i}`}
                            style={{ width: `${100 / 7}%` }}
                          />
                        )
                      )}

                      {Array.from(
                        { length: pendingDaysInMonth },
                        (_, i) => i + 1
                      ).map((d) => {
                        const isDisabled = isPendingCurrentMonth && d > nowDay
                        return (
                          <TouchableOpacity
                            key={d}
                            onPress={() => !isDisabled && selectDay(d)}
                            activeOpacity={isDisabled ? 1 : 0.7}
                            style={{ width: `${100 / 7}%` }}
                            className="items-center py-1"
                          >
                            <View
                              className="w-8 h-8 rounded-full items-center justify-center"
                              style={{
                                backgroundColor:
                                  d === selectedDate &&
                                  pendingMonth === displayMonth
                                    ? theme.accent
                                    : 'transparent',
                              }}
                            >
                              <Text
                                className="font-poppins-medium"
                                style={{
                                  fontSize: 13,
                                  opacity: isDisabled ? 0.3 : 1,
                                  color:
                                    d === selectedDate &&
                                    pendingMonth === displayMonth
                                      ? theme.onAccent
                                      : theme.textPrimary,
                                }}
                              >
                                {d}
                              </Text>
                            </View>
                          </TouchableOpacity>
                        )
                      })}
                    </View>
                  </>
                )}
              </View>
            </TouchableOpacity>
          </TouchableOpacity>
        </Modal>
      )}
    </>
  )
}
