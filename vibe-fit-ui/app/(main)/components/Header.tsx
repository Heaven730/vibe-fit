import { Text, View } from 'react-native'

import { WeightUnit } from '@/store/onboardingStore'

export interface HeaderProps {
  /** 问候语，如 Good Morning */
  greeting: string
  /** 显示名称 */
  displayName: string
  /** 体重整数部分 */
  weightInt: number
  /** 体重小数部分，如 ".5" */
  weightDec: string
  /** 体重单位 */
  weightUnit: WeightUnit
}

/**
 * 主页顶部 Header
 * 左侧展示问候语 + 用户名，右侧展示醒目的体重大数值。
 */
export function Header({
  greeting,
  displayName,
  weightInt,
  weightDec,
  weightUnit,
}: HeaderProps) {
  return (
    <View className="flex-row items-center justify-between px-6 pt-6 pb-2">
      {/* 问候语 */}
      <View className="flex-1 pr-4">
        <Text
          className="text-sp-text font-inika-bold"
          style={{ fontSize: 28, lineHeight: 36 }}
        >
          {greeting}
        </Text>
        <Text
          className="text-sp-accent font-inika-bold"
          style={{ fontSize: 28, lineHeight: 36 }}
        >
          {displayName}
        </Text>
      </View>

      {/* 体重大数值 */}
      <View className="items-end">
        <View className="flex-row items-end">
          <Text
            className="text-sp-accent font-league-bold"
            style={{ fontSize: 72, lineHeight: 80, letterSpacing: -2 }}
          >
            {weightInt}
          </Text>
          <Text
            className="text-sp-purple font-league-medium"
            style={{ fontSize: 32, lineHeight: 48, marginBottom: 8 }}
          >
            {weightDec}
          </Text>
        </View>
        <Text
          className="text-sp-text-secondary font-poppins-medium"
          style={{ fontSize: 13, marginTop: -8 }}
        >
          {weightUnit}
        </Text>
      </View>
    </View>
  )
}
