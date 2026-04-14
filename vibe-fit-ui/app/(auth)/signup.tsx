import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { SignupForm } from '@/components/form/SignupForm';
import { useTheme } from '@/hooks/useTheme';

export default function SignupScreen() {
  const router = useRouter();
  const { theme } = useTheme();

  const handleSubmit = (_name: string, _email: string, _password: string) => {
    // 接入接口层后替换此处逻辑，成功后跳转 onboarding
    router.push('/gender');
  };

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        colors={[theme.background, theme.background, theme.backgroundGradientEnd]}
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
            {/* 返回按钮 */}
            <TouchableOpacity
              style={styles.backBtn}
              onPress={() => router.back()}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Text style={[styles.backIcon, { color: theme.textPrimary }]}>‹</Text>
            </TouchableOpacity>

            {/* 标题区 */}
            <Text style={[styles.title, { color: theme.textPrimary }]}>Sign up with email</Text>
            <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
              Sign up to start your planning journey and to keep data safe
            </Text>

            <SignupForm
              theme={theme}
              onSubmit={handleSubmit}
              onSignIn={() => router.replace('/login')}
            />
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  scroll: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  backBtn: {
    marginTop: 8,
    marginLeft: -6,
    width: 32,
    height: 32,
    justifyContent: 'center',
  },
  backIcon: {
    fontSize: 32,
    lineHeight: 36,
    fontFamily: 'Inter-Thin',
  },
  title: {
    marginTop: 32,
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
});
