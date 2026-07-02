import { LinearGradient } from 'expo-linear-gradient'
import { Tabs, usePathname } from 'expo-router'
import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import { useMemo } from 'react'
import { StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { useLanguage } from '@/hooks/useLanguage'
import { useTheme } from '@/hooks/useTheme'
import { useOnboardingStore } from '@/store/onboardingStore'

import { BottomNav, TabKey } from './components/BottomNav'
import { FloatingBall } from './components/FloatingBall'
import { Header } from './components/Header'

const ROUTE_TO_TAB: Record<string, TabKey> = {
  index: 'workout',
  calendar: 'calendar',
  profile: 'profile',
  setting: 'setting',
}

const TAB_TO_ROUTE: Record<TabKey, string> = {
  workout: 'index',
  calendar: 'calendar',
  profile: 'profile',
  setting: 'setting',
}

function TabBar({ state, navigation }: BottomTabBarProps) {
  const activeRoute = state.routes[state.index]?.name ?? 'index'
  const activeTab = ROUTE_TO_TAB[activeRoute] ?? 'workout'

  return (
    <BottomNav
      activeTab={activeTab}
      onTabChange={(tab) => navigation.navigate(TAB_TO_ROUTE[tab])}
    />
  )
}

export default function MainLayout() {
  const { nickname, profilepicture, weight, weightUnit } = useOnboardingStore()
  const { t } = useLanguage()
  const { theme } = useTheme()
  const pathname = usePathname()

  const today = useMemo(() => new Date(), [])
  const shouldShowHeader = pathname !== '/setting'
  const isProfileFocused = pathname === '/profile'

  const greetingHour = today.getHours()
  const greeting =
    greetingHour < 12
      ? t('goodMorning')
      : greetingHour < 18
      ? t('goodAfternoon')
      : t('goodEvening')

  const weightInt = Math.floor(weight)
  const weightDec = (weight % 1).toFixed(1).slice(1)

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        colors={[
          theme.background,
          theme.background,
          theme.backgroundGradientEnd,
        ]}
        locations={[0, 0.5, 1]}
        style={StyleSheet.absoluteFillObject}
      />

      <SafeAreaView className="flex-1 bg-transparent">
        {shouldShowHeader && (
          <Header
            greeting={greeting}
            displayName={nickname || '---'}
            weightInt={weightInt}
            weightDec={weightDec}
            weightUnit={weightUnit}
            showAvatar={isProfileFocused}
            avatarUri={profilepicture}
          />
        )}

        <Tabs
          screenOptions={{
            headerShown: false,
            sceneStyle: { backgroundColor: 'transparent' },
          }}
          tabBar={(props) => <TabBar {...props} />}
        />
      </SafeAreaView>

      <FloatingBall />
    </View>
  )
}
