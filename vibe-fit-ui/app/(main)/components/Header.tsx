import { Text, View } from 'react-native'

import { Avatar } from '@/components/common/avatar'
import { useTheme } from '@/hooks/useTheme'
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
  /** Profile tab 聚焦时展示头像 */
  showAvatar?: boolean
  /** 头像 URI */
  avatarUri?: string
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
  showAvatar = false,
  avatarUri = '',
}: HeaderProps) {
  const { theme } = useTheme()

  return (
    <View className="flex-row items-center justify-between px-6 pt-6 pb-2">
      {/* 问候语 */}
      <View className="flex-1 pr-4">
        <Text
          className="font-inika-bold"
          style={{ fontSize: 28, lineHeight: 36, color: theme.textPrimary }}
        >
          {greeting}
        </Text>
        <Text
          className="font-inika-bold"
          style={{ fontSize: 28, lineHeight: 36, color: theme.accent }}
        >
          {displayName}
        </Text>
      </View>

      {showAvatar ? (
        <Avatar editable uri={avatarUri} size={92} />
      ) : (
        <View className="items-end">
          <View className="flex-row items-end">
            <Text
              className="font-league-bold"
              style={{
                fontSize: 72,
                lineHeight: 80,
                letterSpacing: -2,
                color: theme.accent,
              }}
            >
              {weightInt}
            </Text>
            <Text
              className="font-league-medium"
              style={{
                fontSize: 32,
                lineHeight: 48,
                marginBottom: 8,
                color: theme.accentSoft,
              }}
            >
              {weightDec}
            </Text>
          </View>
          <Text
            className="font-poppins-medium"
            style={{ fontSize: 13, marginTop: -8, color: theme.textSecondary }}
          >
            {weightUnit}
          </Text>
        </View>
      )}
    </View>
  )
}
