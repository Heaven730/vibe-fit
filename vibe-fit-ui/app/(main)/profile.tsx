import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'

import { FontFamily } from '@/constants/fonts'
import { spacing } from '@/constants/spacing'
import { fontSize } from '@/constants/typography'
import { useLanguage } from '@/hooks/useLanguage'
import { useTheme } from '@/hooks/useTheme'
import { useOnboardingStore } from '@/store/onboardingStore'

export default function Profile() {
  const { age, fullname, height, nickname, weight, weightUnit } =
    useOnboardingStore()
  const { t } = useLanguage()
  const { theme } = useTheme()
  const displayName = fullname || nickname || '---'
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.content}
    >
      <View
        style={[
          styles.summaryCard,
          {
            backgroundColor: theme.accentMuted,
            shadowColor: theme.shadow,
          },
        ]}
      >
        <View style={styles.cardSection}>
          <Text style={[styles.nameText, { color: theme.textPrimary }]}>
            {displayName}
          </Text>
          <Text style={[styles.weightText, { color: theme.accent }]}>
            {weight} {weightUnit}
          </Text>
        </View>

        <View style={styles.cardSection}>
          <Text style={[styles.nameText, { color: theme.textPrimary }]}>
            {age} {t('years')}
          </Text>
          <Text style={[styles.weightText, { color: theme.accent }]}>
            {height} cm
          </Text>
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
  summaryCard: {
    width: '100%',
    height: 150,
    flexDirection: 'row',
    borderRadius: spacing.xl,
    padding: 20,
    shadowOffset: { width: 0, height: spacing.xs },
    shadowOpacity: 0.28,
    shadowRadius: spacing.md,
    elevation: 4,
  },
  cardSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nameText: {
    fontSize: fontSize['2xl'],
    fontFamily: FontFamily.PoppinsBold,
    marginBottom: 20,
  },
  weightText: {
    marginTop: spacing.sm,
    fontSize: fontSize.xl,
    fontFamily: FontFamily.PoppinsMedium,
  },
})
