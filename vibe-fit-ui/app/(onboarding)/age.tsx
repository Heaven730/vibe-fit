import { RelativePathString, useRouter } from 'expo-router'

import { OnboardingLayout } from '@/components/common/OnboardingLayout'
import { AgePicker } from '@/components/onboarding/AgePicker'
import { useOnboardingStore } from '@/store/onboardingStore'

export default function AgeScreen() {
  const router = useRouter()
  const { age, setAge } = useOnboardingStore()

  return (
    <OnboardingLayout
      step={2}
      totalSteps={7}
      title="How old are you"
      onBack={() => router.back()}
      onContinue={() => router.push('/weight' as RelativePathString)}
    >
      <AgePicker value={age} onChange={setAge} />
    </OnboardingLayout>
  )
}
