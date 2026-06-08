import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'

import { themes, ThemeName } from '@/constants/themes'
import { FontFamily } from '@/constants/fonts'
import { spacing } from '@/constants/spacing'
import { fontSize } from '@/constants/typography'
import { TranslationKey, useLanguage } from '@/hooks/useLanguage'
import { useTheme } from '@/hooks/useTheme'
import { Language } from '@/store/languageStore'

const LANGUAGE_OPTIONS: { labelKey: TranslationKey; value: Language }[] = [
  { labelKey: 'english', value: 'en' },
  { labelKey: 'chinese', value: 'zh' },
]

const THEME_OPTIONS: { labelKey: TranslationKey; value: ThemeName }[] = [
  { labelKey: 'softPop', value: 'softPop' },
  { labelKey: 'pink', value: 'pink' },
  { labelKey: 'mint', value: 'mint' },
]

export default function SettingScreen() {
  const { language, setLanguage, t } = useLanguage()
  const { theme, themeName, setTheme } = useTheme()

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.content}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.textPrimary }]}>
          {t('setting')}
        </Text>
      </View>

      <View
        style={[
          styles.table,
          {
            backgroundColor: theme.surface,
            borderColor: theme.border,
            shadowColor: theme.shadow,
          },
        ]}
      >
        <View
          style={[styles.row, styles.divider, { borderColor: theme.border }]}
        >
          <Text style={[styles.label, { color: theme.textPrimary }]}>
            {t('language')}
          </Text>
          <View style={styles.options}>
            {LANGUAGE_OPTIONS.map((option) => {
              const active = option.value === language

              return (
                <Pressable
                  key={option.value}
                  onPress={() => setLanguage(option.value)}
                  style={[
                    styles.option,
                    {
                      backgroundColor: active
                        ? theme.accent
                        : theme.surfaceMuted,
                      borderColor: active ? theme.accent : theme.border,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.optionText,
                      { color: active ? theme.onAccent : theme.textSecondary },
                    ]}
                  >
                    {t(option.labelKey)}
                  </Text>
                </Pressable>
              )
            })}
          </View>
        </View>

        <View style={styles.row}>
          <Text style={[styles.label, { color: theme.textPrimary }]}>
            {t('themeColor')}
          </Text>
          <View style={styles.options}>
            {THEME_OPTIONS.map((option) => {
              const active = option.value === themeName
              const optionTheme = themes[option.value]

              return (
                <Pressable
                  key={option.value}
                  onPress={() => setTheme(option.value)}
                  style={[
                    styles.swatchOption,
                    {
                      backgroundColor: active
                        ? theme.accentSubtle
                        : theme.surfaceMuted,
                      borderColor: active ? theme.accent : theme.border,
                    },
                  ]}
                >
                  <View
                    style={[
                      styles.swatch,
                      { backgroundColor: optionTheme.accent },
                    ]}
                  />
                  <Text
                    style={[
                      styles.optionText,
                      { color: active ? theme.accent : theme.textSecondary },
                    ]}
                  >
                    {t(option.labelKey)}
                  </Text>
                </Pressable>
              )
            })}
          </View>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  content: {
    padding: spacing.xl,
    paddingBottom: 100,
  },
  header: {
    marginBottom: spacing.lg,
  },
  title: {
    fontSize: fontSize['3xl'],
    fontFamily: FontFamily.PoppinsBold,
  },
  subtitle: {
    marginTop: spacing.xs,
    fontSize: fontSize.md,
    fontFamily: FontFamily.PoppinsMedium,
  },
  table: {
    width: '100%',
    borderWidth: 1,
    borderRadius: spacing.lg,
    overflow: 'hidden',
    shadowOffset: { width: 0, height: spacing.xs },
    shadowOpacity: 0.12,
    shadowRadius: spacing.md,
    elevation: 3,
  },
  row: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
    gap: spacing.md,
  },
  divider: {
    borderBottomWidth: 1,
  },
  label: {
    fontSize: fontSize.lg,
    fontFamily: FontFamily.PoppinsBold,
  },
  options: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  option: {
    height: 36,
    minWidth: 88,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: spacing.md,
  },
  swatchOption: {
    height: 36,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: spacing.md,
    gap: spacing.xs,
  },
  swatch: {
    width: 14,
    height: 14,
    borderRadius: 7,
  },
  optionText: {
    fontSize: fontSize.sm,
    fontFamily: FontFamily.PoppinsMedium,
  },
})
