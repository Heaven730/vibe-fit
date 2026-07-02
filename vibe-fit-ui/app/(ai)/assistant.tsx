import { LinearGradient } from 'expo-linear-gradient'
import { router } from 'expo-router'
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Svg, { Path } from 'react-native-svg'

import { useTheme } from '@/hooks/useTheme'

function HeartPulseIcon({ color }: { color: string }) {
  return (
    <Svg width={142} height={118} viewBox="0 0 142 118" fill="none">
      <Path
        d="M71 104.5 25.6 62.7C.9 39.8 18.1 2.5 49.5 7.2 58.7 8.6 66.1 13.9 71 21.1 75.9 13.9 83.3 8.6 92.5 7.2c31.4-4.7 48.6 32.6 23.9 55.5L71 104.5Z"
        stroke={color}
        strokeWidth={6}
        strokeLinejoin="round"
      />
      <Path
        d="M2 58.8h43.4l12.3-18.3 21 40.3 12.2-23.4 6.8 9.8H140"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={0.46}
      />
    </Svg>
  )
}

function ChevronDownIcon({ color }: { color: string }) {
  return (
    <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
      <Path
        d="m7 10 5 5 5-5"
        stroke={color}
        strokeWidth={2.4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

function PlusIcon({ color }: { color: string }) {
  return (
    <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 5v14M5 12h14"
        stroke={color}
        strokeWidth={2.6}
        strokeLinecap="round"
      />
    </Svg>
  )
}

function BottleIcon({ color }: { color: string }) {
  return (
    <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
      <Path
        d="M9 2h6M10 2v3.6L8.6 7.1A5 5 0 0 0 7 10.8V19a3 3 0 0 0 3 3h4a3 3 0 0 0 3-3v-8.2a5 5 0 0 0-1.6-3.7L14 5.6V2M8 13h8M9 17h6"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

function WaveIcon({ color }: { color: string }) {
  return (
    <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
      <Path
        d="M4 9v6M8 5v14M12 7v10M16 4v16M20 9v6"
        stroke={color}
        strokeWidth={2.4}
        strokeLinecap="round"
      />
    </Svg>
  )
}

function dismissAssistant() {
  if (router.canGoBack()) {
    router.back()
    return
  }

  router.replace('/(main)')
}

export default function AssistantScreen() {
  const { theme } = useTheme()

  return (
    <View style={styles.overlay}>
      <Pressable
        accessibilityLabel="Dismiss assistant"
        style={StyleSheet.absoluteFill}
        onPress={dismissAssistant}
      />

      <SafeAreaView pointerEvents="box-none" style={styles.safeArea}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.keyboardAvoider}
        >
          <LinearGradient
            colors={[theme.surface, theme.surfaceMuted, theme.accentMuted]}
            locations={[0, 0.52, 1]}
            style={[
              styles.sheet,
              {
                shadowColor: theme.shadow,
                borderColor: theme.borderMuted,
              },
            ]}
          >
          <Pressable
            accessibilityLabel="Collapse assistant"
            accessibilityRole="button"
            onPress={dismissAssistant}
            style={[
              styles.collapseButton,
              {
                backgroundColor: theme.surface,
                shadowColor: theme.shadow,
              },
            ]}
          >
            <ChevronDownIcon color={theme.textPrimary} />
          </Pressable>

          <View style={styles.hero}>
            <HeartPulseIcon color={theme.accentSoft} />
            <Text style={[styles.title, { color: theme.textPlaceholder }]}>
              I'm here to assist
            </Text>
          </View>

          <View style={styles.quickActions}>
            <Pressable
              accessibilityRole="button"
              style={[styles.actionButton, { backgroundColor: theme.surface }]}
            >
              <View style={[styles.actionIcon, { borderColor: theme.accent }]}>
                <PlusIcon color={theme.accent} />
              </View>
              <Text
                numberOfLines={1}
                style={[styles.actionText, { color: theme.textPlaceholder }]}
              >
                Add A Task
              </Text>
            </Pressable>

            <Pressable
              accessibilityRole="button"
              style={[styles.actionButton, { backgroundColor: theme.surface }]}
            >
              <BottleIcon color={theme.accent} />
              <Text
                numberOfLines={1}
                style={[styles.actionText, { color: theme.textPlaceholder }]}
              >
                Add Daily Water
              </Text>
            </Pressable>
          </View>

            <View style={[styles.promptBox, { backgroundColor: theme.surface }]}>
              <TextInput
                multiline
                placeholder="ASK Anything ..."
                placeholderTextColor={theme.accent}
                selectionColor={theme.accent}
                style={[styles.promptInput, { color: theme.textPrimary }]}
                textAlignVertical="top"
              />

              <Pressable
                accessibilityRole="button"
                style={[
                  styles.speakButton,
                  { backgroundColor: theme.textPrimary },
                ]}
              >
                <WaveIcon color={theme.onAccent} />
                <Text style={[styles.speakText, { color: theme.onAccent }]}>
                  speak
                </Text>
              </Pressable>
            </View>
          </LinearGradient>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(16, 16, 16, 0.18)',
  },
  safeArea: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  keyboardAvoider: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  sheet: {
    alignSelf: 'center',
    width: '100%',
    maxWidth: 390,
    minHeight: '82%',
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingTop: 18,
    paddingBottom: 18,
    shadowOpacity: 0.18,
    shadowRadius: 28,
    shadowOffset: { width: 0, height: -10 },
    elevation: 16,
  },
  collapseButton: {
    position: 'absolute',
    top: 12,
    right: 18,
    zIndex: 2,
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 24,
    shadowOpacity: 0.18,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 5 },
    elevation: 8,
  },
  hero: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    paddingTop: 36,
  },
  title: {
    fontSize: 28,
    fontFamily: 'serif',
    lineHeight: 35,
  },
  quickActions: {
    flexDirection: 'row',
    gap: 14,
    marginBottom: 12,
  },
  actionButton: {
    flex: 1,
    minHeight: 34,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderRadius: 18,
    paddingHorizontal: 11,
    shadowColor: '#000',
    shadowOpacity: 0.16,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },
  actionIcon: {
    width: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 9,
    borderWidth: 2,
  },
  actionText: {
    flexShrink: 1,
    fontSize: 14,
    lineHeight: 18,
  },
  promptBox: {
    minHeight: 148,
    borderRadius: 26,
    paddingHorizontal: 18,
    paddingTop: 24,
    paddingBottom: 18,
  },
  promptInput: {
    minHeight: 82,
    padding: 0,
    paddingRight: 118,
    fontSize: 18,
    lineHeight: 24,
  },
  speakButton: {
    position: 'absolute',
    right: 18,
    bottom: 18,
    minWidth: 102,
    height: 38,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    borderRadius: 19,
    paddingHorizontal: 12,
    shadowColor: '#000',
    shadowOpacity: 0.22,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
    elevation: 6,
  },
  speakText: {
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 24,
  },
})
