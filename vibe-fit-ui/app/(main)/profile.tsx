import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import Svg, { Circle, ClipPath, Defs, G, Path } from 'react-native-svg'

import { FontFamily } from '@/constants/fonts'
import { spacing } from '@/constants/spacing'
import { Theme } from '@/constants/themes'
import { fontSize } from '@/constants/typography'
import { useLanguage } from '@/hooks/useLanguage'
import { useTheme } from '@/hooks/useTheme'
import { useOnboardingStore } from '@/store/onboardingStore'

const WELLNESS_STATS = [
  { label: 'Calories', value: '510.43', unit: 'Kcol' },
  { label: 'Sleep', value: '08:00', unit: 'hours' },
]

const WATER_PROGRESS = 0.25
const WATER_INTAKE = 500
const WATER_TARGET = 2000
const WATER_BALL_SIZE = 260
const WATER_BALL_CENTER = WATER_BALL_SIZE / 2
const WATER_BALL_RADIUS = 108
const WATER_BALL_OUTER_RADIUS = 118

function CupIcon({ color }: { color: string }) {
  return (
    <Svg width={15} height={15} viewBox="0 0 24 24" fill="none">
      <Path
        d="M6 7h11l-1.2 12.2A2 2 0 0 1 13.8 21H9.2a2 2 0 0 1-2-1.8L6 7Z"
        fill={color}
        opacity={0.9}
      />
      <Path
        d="M5 4h13M8 3v3M12 3v3M16 3v3"
        stroke={color}
        strokeLinecap="round"
        strokeWidth={1.8}
      />
    </Svg>
  )
}

function WellnessStatCard({
  label,
  theme,
  unit,
  value,
}: {
  label: string
  theme: Theme
  unit: string
  value: string
}) {
  return (
    <View
      style={[
        styles.statCard,
        {
          backgroundColor: theme.surface,
          borderColor: theme.accentSoft,
          shadowColor: theme.shadow,
        },
      ]}
    >
      <Text style={[styles.statLabel, { color: theme.textPrimary }]}>
        {label}
      </Text>
      <View>
        <Text style={[styles.statValue, { color: theme.accent }]}>
          {value}
        </Text>
        <Text style={[styles.statUnit, { color: theme.textPrimary }]}>
          {unit}
        </Text>
      </View>
    </View>
  )
}

function WaterBallChart({
  progress,
  theme,
  value,
}: {
  progress: number
  theme: Theme
  value: number
}) {
  const fillLevel =
    WATER_BALL_SIZE -
    38 -
    Math.max(0, Math.min(progress, 1)) * WATER_BALL_RADIUS * 1.62

  return (
    <View style={styles.waterBall}>
      <Svg
        width={WATER_BALL_SIZE}
        height={WATER_BALL_SIZE}
        viewBox={`0 0 ${WATER_BALL_SIZE} ${WATER_BALL_SIZE}`}
      >
        <Defs>
          <ClipPath id="water-ball-mask">
            <Circle
              cx={WATER_BALL_CENTER}
              cy={WATER_BALL_CENTER}
              r={WATER_BALL_RADIUS}
            />
          </ClipPath>
        </Defs>

        <Circle
          cx={WATER_BALL_CENTER}
          cy={WATER_BALL_CENTER}
          r={WATER_BALL_OUTER_RADIUS}
          fill={theme.surface}
          stroke={theme.accent}
          strokeOpacity={0.28}
          strokeWidth={6}
        />

        <G clipPath="url(#water-ball-mask)">
          <Circle
            cx={WATER_BALL_CENTER}
            cy={WATER_BALL_CENTER}
            r={WATER_BALL_RADIUS}
            fill={theme.accentSubtle}
          />
          <Path
            d={`M0 ${fillLevel - 7} C38 ${fillLevel - 32} 76 ${
              fillLevel + 29
            } 130 ${fillLevel} C184 ${fillLevel - 26} 219 ${
              fillLevel - 7
            } ${WATER_BALL_SIZE} ${fillLevel - 20} V${WATER_BALL_SIZE} H0 Z`}
            fill={theme.accentMuted}
            opacity={0.82}
          />
          <Path
            d={`M0 ${fillLevel + 26} C45 ${fillLevel + 3} 83 ${
              fillLevel + 39
            } 130 ${fillLevel + 18} C177 ${fillLevel - 2} 216 ${
              fillLevel + 13
            } ${WATER_BALL_SIZE} ${fillLevel} V${WATER_BALL_SIZE} H0 Z`}
            fill={theme.accent}
            opacity={0.72}
          />
          <Path
            d={`M22 ${fillLevel - 24} C55 ${fillLevel - 48} 80 ${
              fillLevel + 18
            } 126 ${fillLevel - 8} C170 ${fillLevel - 34} 201 ${
              fillLevel - 17
            } 239 ${fillLevel - 28}`}
            fill="none"
            opacity={0.32}
            stroke={theme.surface}
            strokeLinecap="round"
            strokeWidth={7}
          />
        </G>

        <Circle
          cx={WATER_BALL_CENTER}
          cy={WATER_BALL_CENTER}
          r={WATER_BALL_RADIUS + 2}
          fill="none"
          stroke={theme.accent}
          strokeWidth={10}
        />
      </Svg>

      <Text style={[styles.waterValue, { color: theme.textPrimary }]}>
        {value}ml
      </Text>
    </View>
  )
}

function WaterReminderCard({ theme }: { theme: Theme }) {
  return (
    <View
      style={[
        styles.reminderCard,
        {
          backgroundColor: theme.surface,
          shadowColor: theme.shadow,
        },
      ]}
    >
      <View style={styles.reminderHeader}>
        <Text style={[styles.reminderTime, { color: theme.textSecondary }]}>
          9:30 AM
        </Text>
        <View
          style={[styles.reminderProgress, { backgroundColor: theme.accent }]}
        />
      </View>

      <View style={styles.reminderContent}>
        <View style={styles.reminderAmount}>
          <CupIcon color={theme.accent} />
          <Text
            style={[styles.reminderAmountText, { color: theme.textPrimary }]}
          >
            100ml
          </Text>
        </View>
        <Text style={[styles.reminderPercent, { color: theme.textSecondary }]}>
          10%
        </Text>
      </View>
    </View>
  )
}

function WaterTargetCard({ theme }: { theme: Theme }) {
  return (
    <View
      style={[
        styles.targetCard,
        {
          backgroundColor: theme.surface,
          shadowColor: theme.shadow,
        },
      ]}
    >
      <Text style={[styles.targetLabel, { color: theme.textSecondary }]}>
        Target
      </Text>
      <Text style={[styles.targetValue, { color: theme.textPrimary }]}>
        {WATER_TARGET}ml
      </Text>
    </View>
  )
}

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

      <View style={styles.statsGrid}>
        {WELLNESS_STATS.map((stat) => (
          <WellnessStatCard key={stat.label} {...stat} theme={theme} />
        ))}
      </View>

      <View style={styles.waterSection}>
        <WaterBallChart
          progress={WATER_PROGRESS}
          theme={theme}
          value={WATER_INTAKE}
        />
        <WaterReminderCard theme={theme} />
        <WaterTargetCard theme={theme} />
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
  statsGrid: {
    flexDirection: 'row',
    gap: spacing.xl,
    marginTop: spacing['2xl'],
  },
  statCard: {
    flex: 1,
    height: 146,
    justifyContent: 'space-between',
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xl,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 18,
    elevation: 2,
  },
  statLabel: {
    fontSize: fontSize.lg,
    fontFamily: FontFamily.PoppinsBold,
  },
  statValue: {
    fontSize: fontSize['4xl'],
    fontFamily: FontFamily.PoppinsBold,
  },
  statUnit: {
    marginTop: spacing.xs,
    fontSize: fontSize.sm,
    fontFamily: FontFamily.PoppinsBold,
  },
  waterSection: {
    minHeight: 318,
    marginTop: spacing['2xl'],
  },
  waterBall: {
    position: 'absolute',
    left: -18,
    top: 14,
    width: WATER_BALL_SIZE,
    height: WATER_BALL_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  waterValue: {
    position: 'absolute',
    fontSize: fontSize['6xl'],
    fontFamily: FontFamily.PoppinsBold,
  },
  reminderCard: {
    position: 'absolute',
    top: 18,
    right: 2,
    width: 166,
    height: 78,
    borderRadius: 14,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 18,
    elevation: 3,
  },
  reminderHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  reminderTime: {
    fontSize: fontSize.sm,
    fontFamily: FontFamily.PoppinsMedium,
  },
  reminderProgress: {
    width: 40,
    height: 4,
    borderRadius: 2,
  },
  reminderContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: spacing.sm,
  },
  reminderAmount: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  reminderAmountText: {
    fontSize: fontSize.base,
    fontFamily: FontFamily.PoppinsBold,
  },
  reminderPercent: {
    fontSize: fontSize.sm,
    fontFamily: FontFamily.PoppinsMedium,
  },
  targetCard: {
    position: 'absolute',
    right: 2,
    top: 116,
    width: 108,
    height: 70,
    justifyContent: 'center',
    borderRadius: 14,
    paddingHorizontal: spacing.md,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 18,
    elevation: 2,
  },
  targetLabel: {
    fontSize: fontSize.sm,
    fontFamily: FontFamily.PoppinsMedium,
  },
  targetValue: {
    marginTop: spacing.sm,
    fontSize: fontSize.lg,
    fontFamily: FontFamily.PoppinsBold,
  },
})
