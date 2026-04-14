import { RelativePathString, useRouter } from 'expo-router'

import { OnboardingLayout } from '@/components/common/OnboardingLayout'
import { HeightPicker } from '@/components/onboarding/HeightPicker'
import { useOnboardingStore } from '@/store/onboardingStore'

export default function HeightScreen() {
  const router = useRouter()
  const { height, setHeight } = useOnboardingStore()

  return (
    <OnboardingLayout
      step={4}
      totalSteps={7}
      title="What's your Height"
      onBack={() => router.back()}
      onContinue={() => router.push('/goal' as RelativePathString)}
    >
      <HeightPicker value={height} onChange={setHeight} />
    </OnboardingLayout>
  )
}
