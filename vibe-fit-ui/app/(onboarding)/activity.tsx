import { RelativePathString, useRouter } from 'expo-router'

import { OnboardingLayout } from '@/components/common/OnboardingLayout'
import { ActivityPicker } from '@/components/onboarding/ActivityPicker'
import { useOnboardingStore } from '@/store/onboardingStore'

export default function ActivityScreen() {
  const router = useRouter()
  const { activity, setActivity } = useOnboardingStore()

  return (
    <OnboardingLayout
      step={6}
      totalSteps={7}
      title="Physical Activity Level"
      onBack={() => router.back()}
      onContinue={() => router.push('/profile' as RelativePathString)}
    >
      <ActivityPicker value={activity} onChange={setActivity} />
    </OnboardingLayout>
  )
}
