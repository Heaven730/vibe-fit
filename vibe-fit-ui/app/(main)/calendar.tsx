import { useMemo, useState } from 'react'
import { ScrollView } from 'react-native'

import { CalendarStrip, DayItem } from './components/CalendarStrip'
import { WeightBarChart } from './components/weightBarChart'
import { ActivitiesItem } from './components/activitiesItem'
import { MOCK_ACTIVITIES } from './index'

const DAY_LABELS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

function buildMonthDays(year: number, month: number): DayItem[] {
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  return Array.from({ length: daysInMonth }, (_, i) => {
    const d = new Date(year, month, i + 1)
    return { date: d.getDate(), day: DAY_LABELS[d.getDay()] }
  })
}

export default function CalendarScreen() {
  const now = useMemo(() => new Date(), [])

  const [displayYear, setDisplayYear] = useState(now.getFullYear())
  const [displayMonth, setDisplayMonth] = useState(now.getMonth())
  const [selectedDate, setSelectedDate] = useState(now.getDate())

  const monthDays = useMemo<DayItem[]>(
    () => buildMonthDays(displayYear, displayMonth),
    [displayYear, displayMonth]
  )

  const isCurrentMonth =
    displayYear === now.getFullYear() && displayMonth === now.getMonth()
  const todayBoundary = isCurrentMonth ? now.getDate() : 32

  function handleMonthChange(year: number, month: number) {
    setDisplayYear(year)
    setDisplayMonth(month)
    setSelectedDate(1)
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 100 }}
    >
      <CalendarStrip
        days={monthDays}
        selectedDate={selectedDate}
        today={todayBoundary}
        onSelectDate={setSelectedDate}
        monthSelectable
        displayYear={displayYear}
        displayMonth={displayMonth}
        onMonthChange={handleMonthChange}
      />

      <WeightBarChart
        year={displayYear}
        month={displayMonth}
        selectedDate={selectedDate}
      />

      <ActivitiesItem activities={MOCK_ACTIVITIES} />
    </ScrollView>
  )
}
