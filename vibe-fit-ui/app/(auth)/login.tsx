import { LinearGradient } from 'expo-linear-gradient'
import { useRouter } from 'expo-router'
import React from 'react'
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { LoginForm } from '@/components/form/LoginForm'
import { useTheme } from '@/hooks/useTheme'
import { useAuthStore } from '@/store/authStore'

export default function LoginScreen() {
  const router = useRouter()
  const { theme } = useTheme()
  const { setToken } = useAuthStore()

  const handleSubmit = (_email: string, _password: string) => {
    // 接入接口层后替换此处逻辑，成功后跳转 onboarding
    console.log(111)
    setToken('111')
    router.push('/gender')
  }

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        colors={[
          theme.background,
          theme.background,
          theme.backgroundGradientEnd,
        ]}
        locations={[0, 0.57, 1]}
        style={StyleSheet.absoluteFillObject}
      />

      <SafeAreaView className="flex-1">
        <KeyboardAvoidingView
          className="flex-1"
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <ScrollView
            contentContainerStyle={styles.scroll}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            {/* 标题区 */}
            <View style={styles.header}>
              <Text style={[styles.title, { color: theme.textPrimary }]}>
                Welcome back
              </Text>
              <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
                Sign in to continue your fitness journey
              </Text>
            </View>

            <LoginForm
              theme={theme}
              onSubmit={handleSubmit}
              onSignUp={() => router.push('/signup')}
            />
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
  scroll: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  header: {
    marginTop: 64,
  },
  title: {
    fontSize: 32,
    lineHeight: 38,
    letterSpacing: -0.8,
    fontFamily: 'Inika-Bold',
  },
  subtitle: {
    marginTop: 8,
    fontSize: 16,
    lineHeight: 24,
    fontFamily: 'Inter-Regular',
  },
})
