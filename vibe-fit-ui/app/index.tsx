import { useAuthStore } from '@/store/authStore'
import { Redirect } from 'expo-router'

export default function Index() {
  const { isLoggedIn } = useAuthStore()

  if (isLoggedIn) {
    return <Redirect href="/(main)" />
  }

  // return <Redirect href="/login" />
  return <Redirect href="/(main)" />
}
