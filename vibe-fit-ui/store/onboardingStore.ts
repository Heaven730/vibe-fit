import { create } from 'zustand'

export type Gender = 'male' | 'female'
export type WeightUnit = 'kg' | 'lb'

interface OnboardingState {
  gender: Gender | null
  age: number
  weight: number
  weightUnit: WeightUnit
  height: number
  goal: string
  activity: number
  fullname: string
  nickname: string
  aboutme: string
  profilepicture: string

  setGender: (gender: Gender) => void
  setAge: (age: number) => void
  setWeight: (weight: number) => void
  setWeightUnit: (unit: WeightUnit) => void
  setHeight: (height: number) => void
  setGoal: (goal: string) => void
  setActivity: (activity: number) => void
  setFullName: (fullname: string) => void
  setNickName: (nickname: string) => void
  setAboutMe: (aboutme: string) => void
  setProfilePicture: (profilepicture: string) => void
}

export const useOnboardingStore = create<OnboardingState>((set) => ({
  gender: null,
  age: 28,
  weight: 75,
  weightUnit: 'kg',
  height: 165,
  goal: '',
  activity: 1,
  fullname: '',
  nickname: '',
  aboutme: '',
  profilepicture: '',

  setGender: (gender) => set({ gender }),
  setAge: (age) => set({ age }),
  setWeight: (weight) => set({ weight }),
  setWeightUnit: (weightUnit) => set({ weightUnit }),
  setHeight: (height) => set({ height }),
  setGoal: (goal: string) => set({ goal }),
  setActivity: (activity: number) => set({ activity }),
  setFullName: (fullname: string) => set({ fullname }),
  setNickName: (nickname: string) => set({ nickname }),
  setAboutMe: (aboutme: string) => set({ aboutme }),
  setProfilePicture: (profilepicture: string) => set({ profilepicture }),
}))
