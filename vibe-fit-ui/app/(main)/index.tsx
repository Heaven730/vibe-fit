import { useMemo, useState } from 'react'
import { ScrollView } from 'react-native'

import { CalendarStrip, DayItem } from './components/CalendarStrip'
import { ActivitiesItem } from './components/activitiesItem'

// ─── 常量数据 ─────────────────────────────────────────────────────────────────

const DAY_LABELS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

function buildWeekDays(anchor: Date): DayItem[] {
  const weekStart = new Date(anchor)
  weekStart.setDate(anchor.getDate() - anchor.getDay()) // 本周日
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(weekStart)
    d.setDate(weekStart.getDate() + i)
    return { date: d.getDate(), day: DAY_LABELS[d.getDay()] }
  })
}

export const MOCK_ACTIVITIES = [
  { id: '1', title: 'Morning Run', time: '07.00 - 08.00', done: true },
  { id: '2', title: 'Full Body Strength', time: '10.00 - 11.30', done: false },
  { id: '3', title: 'Yoga & Stretch', time: '13.00 - 13.45', done: true },
  { id: '4', title: 'Evening Walk', time: '18.00 - 18.30', done: false },
  { id: '5', title: 'Core Training', time: '20.00 - 20.45', done: false },
]

// ─── 主页面 ───────────────────────────────────────────────────────────────────

export default function HomeScreen() {
  const today = useMemo(() => new Date(), [])
  const [selectedDate, setSelectedDate] = useState(today.getDate())

  const weekDays = useMemo<DayItem[]>(() => buildWeekDays(today), [today])

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 100 }}
    >
      <CalendarStrip
        days={weekDays}
        selectedDate={selectedDate}
        today={today.getDate()}
        onSelectDate={setSelectedDate}
      />

      <ActivitiesItem activities={MOCK_ACTIVITIES} />
    </ScrollView>
  )
}
