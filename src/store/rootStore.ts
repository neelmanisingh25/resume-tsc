import { create } from 'zustand'
import { createHeaderSlice } from './HeaderSlice.ts'
import { HeaderSlice } from './HeaderSlice.ts'
import { immer } from 'zustand/middleware/immer'
import { devtools } from 'zustand/middleware'
import {
  createWorkExperienceSlice,
  WorkExperienceSlice
} from '@/store/WorkExperienceSlice.ts'
import { createSkillsSlice, SkillsSlice } from '@/store/SkillsSlice.ts'
export const useResumeStore = create<HeaderSlice & WorkExperienceSlice & SkillsSlice>()(
  devtools(
    immer((...arg) => ({
      ...createHeaderSlice(...arg),
      ...createWorkExperienceSlice(...arg),
      ...createSkillsSlice(...arg)
    }))
  )
)
