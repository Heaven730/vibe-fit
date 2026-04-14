import { RelativePathString, useRouter } from 'expo-router'

import { OnboardingLayout } from '@/components/common/OnboardingLayout'
import { WeightPicker } from '@/components/onboarding/WeightPicker'
import { useOnboardingStore } from '@/store/onboardingStore'

export default function WeightScreen() {
  const router = useRouter()
  const { weight, weightUnit, setWeight, setWeightUnit } = useOnboardingStore()

  return (
    <OnboardingLayout
      step={3}
      totalSteps={7}
      title="What's your weight"
      onBack={() => router.back()}
      onContinue={() => router.push('/height' as RelativePathString)}
    >
      <WeightPicker
        value={weight}
        unit={weightUnit}
        onChange={setWeight}
        onUnitChange={setWeightUnit}
      />
    </OnboardingLayout>
  )
}
