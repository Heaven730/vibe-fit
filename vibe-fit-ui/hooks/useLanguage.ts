import { useCallback } from 'react'

import { Language, useLanguageStore } from '@/store/languageStore'

const translations = {
  en: {
    setting: 'Setting',
    settingZh: '设置',
    language: 'Language',
    themeColor: 'Theme Color',
    english: 'English',
    chinese: 'Chinese',
    softPop: 'Soft Pop',
    pink: 'Pink',
    mint: 'Mint',
    goodMorning: 'Good Morning',
    goodAfternoon: 'Good Afternoon',
    goodEvening: 'Good Evening',
    todayActivities: "Today's Activities",
    weeklyWeight: 'Weekly Weight',
    thisLabel: 'This',
    lastLabel: 'Last',
    thisWeek: 'This week',
    lastWeek: 'Last week',
    noData: 'No data',
    years: 'years',
    morningRun: 'Morning Run',
    fullBodyStrength: 'Full Body Strength',
    yogaStretch: 'Yoga & Stretch',
    eveningWalk: 'Evening Walk',
    coreTraining: 'Core Training',
    monthJanuary: 'January',
    monthFebruary: 'February',
    monthMarch: 'March',
    monthApril: 'April',
    monthMay: 'May',
    monthJune: 'June',
    monthJuly: 'July',
    monthAugust: 'August',
    monthSeptember: 'September',
    monthOctober: 'October',
    monthNovember: 'November',
    monthDecember: 'December',
  },
  zh: {
    setting: '设置',
    settingZh: 'Setting',
    language: '语言',
    themeColor: '主题颜色',
    english: '英文',
    chinese: '中文',
    softPop: '柔紫',
    pink: '粉色',
    mint: '薄荷绿',
    goodMorning: '早上好',
    goodAfternoon: '下午好',
    goodEvening: '晚上好',
    todayActivities: '今日活动',
    weeklyWeight: '每周体重',
    thisLabel: '本周',
    lastLabel: '上周',
    thisWeek: '本周',
    lastWeek: '上周',
    noData: '无数据',
    years: '岁',
    morningRun: '晨跑',
    fullBodyStrength: '全身力量训练',
    yogaStretch: '瑜伽拉伸',
    eveningWalk: '晚间散步',
    coreTraining: '核心训练',
    monthJanuary: '一月',
    monthFebruary: '二月',
    monthMarch: '三月',
    monthApril: '四月',
    monthMay: '五月',
    monthJune: '六月',
    monthJuly: '七月',
    monthAugust: '八月',
    monthSeptember: '九月',
    monthOctober: '十月',
    monthNovember: '十一月',
    monthDecember: '十二月',
  },
} as const

export type TranslationKey = keyof typeof translations.en

export function useLanguage() {
  const language = useLanguageStore((state) => state.language)
  const setLanguage = useLanguageStore((state) => state.setLanguage)
  const t = useCallback(
    (key: TranslationKey) => translations[language][key],
    [language]
  )

  return {
    language,
    setLanguage,
    t,
  }
}

export type { Language }
