
import { create } from "zustand"

type IntroState = {
  introOut: boolean
  setIntroOut: (val: boolean) => void
}

export const useIntroStore = create<IntroState>((set) => ({
  introOut: false,
  setIntroOut: (introOut) => set({ introOut }),
}))
