import { RelativePathString, useRouter } from 'expo-router'

import { OnboardingLayout } from '@/components/common/OnboardingLayout'
import { GoalPicker } from '@/components/onboarding/GoalPicker'
import { useOnboardingStore } from '@/store/onboardingStore'

export default function GoalScreen() {
  const router = useRouter()
  const { goal, setGoal } = useOnboardingStore()

  return (
    <OnboardingLayout
      step={5}
      totalSteps={7}
      title="what's your Goal"
      onBack={() => router.back()}
      onContinue={() => router.push('/activity' as RelativePathString)}
    >
      <GoalPicker value={goal} onChange={setGoal} />
    </OnboardingLayout>
  )
}
