import { LinearGradient } from 'expo-linear-gradient'
import { Tabs } from 'expo-router'
import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import { useMemo } from 'react'
import { StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { useTheme } from '@/hooks/useTheme'
import { useOnboardingStore } from '@/store/onboardingStore'

import { BottomNav, TabKey } from './components/BottomNav'
import { Header } from './components/Header'

const ROUTE_TO_TAB: Record<string, TabKey> = {
  index: 'workout',
  calendar: 'calendar',
  profile: 'profile',
}

const TAB_TO_ROUTE: Record<TabKey, string> = {
  workout: 'index',
  calendar: 'calendar',
  profile: 'profile',
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
  const { nickname, weight, weightUnit } = useOnboardingStore()
  const { theme } = useTheme()

  const today = useMemo(() => new Date(), [])

  const greetingHour = today.getHours()
  const greeting =
    greetingHour < 12
      ? 'Good Morning'
      : greetingHour < 18
      ? 'Good Afternoon'
      : 'Good Evening'

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
        <Header
          greeting={greeting}
          displayName={nickname || '---'}
          weightInt={weightInt}
          weightDec={weightDec}
          weightUnit={weightUnit}
        />

        <Tabs
          screenOptions={{
            headerShown: false,
            sceneStyle: { backgroundColor: 'transparent' },
          }}
          tabBar={(props) => <TabBar {...props} />}
        />
      </SafeAreaView>
    </View>
  )
}
