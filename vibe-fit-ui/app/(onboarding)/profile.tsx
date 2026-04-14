import { useRouter } from 'expo-router'
import { useEffect } from 'react'

import { OnboardingLayout } from '@/components/common/OnboardingLayout'
import { ProfileForm } from '@/components/form/ProfileForm'
import { useAuthStore } from '@/store/authStore'
import { useOnboardingStore } from '@/store/onboardingStore'

export default function ProfileScreen() {
  const router = useRouter()
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn)

  const checkLoggedIn = () => {
    console.log(isLoggedIn)
    if (isLoggedIn) {
      router.replace('/')
    } else {
      router.replace('/login')
    }
  }

  const {
    fullname,
    nickname,
    aboutme,
    profilepicture,
    setFullName,
    setNickName,
    setAboutMe,
    setProfilePicture,
  } = useOnboardingStore()

  return (
    <OnboardingLayout
      step={7}
      totalSteps={7}
      title="Fill your Profile"
      onBack={() => router.back()}
      onContinue={checkLoggedIn}
    >
      <ProfileForm
        fullname={fullname}
        nickname={nickname}
        aboutme={aboutme}
        profilepicture={profilepicture}
        onChangeFullName={setFullName}
        onChangeNickName={setNickName}
        onChangeAboutMe={setAboutMe}
        onChangeProfilePicture={setProfilePicture}
      />
    </OnboardingLayout>
  )
}
