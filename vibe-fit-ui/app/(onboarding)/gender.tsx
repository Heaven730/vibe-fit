import { RelativePathString, useRouter } from 'expo-router'

import { OnboardingLayout } from '@/components/common/OnboardingLayout'
import { GenderPicker } from '@/components/onboarding/GenderPicker'
import { useOnboardingStore } from '@/store/onboardingStore'

export default function GenderScreen() {
  const router = useRouter()
  const { gender, setGender } = useOnboardingStore()

  return (
    <OnboardingLayout
      step={1}
      totalSteps={7}
      title="Let's get to know you"
      onBack={() => router.back()}
      onContinue={() => router.push('/age' as RelativePathString)}
      continueDisabled={gender === null}
    >
      <GenderPicker value={gender} onChange={setGender} />
    </OnboardingLayout>
  )
}
