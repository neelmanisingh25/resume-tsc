import { create } from 'zustand'
import { createHeaderSlice } from './HeaderSlice.ts'
import { HeaderSlice } from './HeaderSlice.ts'
import { immer } from 'zustand/middleware/immer'
import { devtools } from 'zustand/middleware'
import { WorkExperienceSlice } from '@/store/WorkExperienceSlice.ts'
import { createSkillsSlice, SkillsSlice } from '@/store/SkillsSlice.ts'
import { createSectionSlice } from '@/store/createSectionSlice.ts'
import { Section, SECTION_CONFIGS } from '@/types/section.ts'

export interface StoreState
  extends HeaderSlice,
    WorkExperienceSlice,
    SkillsSlice {
  projects: Section
  education: Section
  volunteerExperience: Section
  certificates: Section
  workExperience: Section
  [key: string]: any
}

export const useResumeStore = create<StoreState>()(
  devtools(
    immer((...arg) => ({
      ...createHeaderSlice(...arg),
      ...createSectionSlice(
        'workExperience',
        SECTION_CONFIGS.workExperience
      )(...arg),
      ...createSectionSlice('projects', SECTION_CONFIGS.projects)(...arg),
      ...createSectionSlice('education', SECTION_CONFIGS.education)(...arg),
      ...createSectionSlice(
        'volunteerExperience',
        SECTION_CONFIGS.volunteerExperience
      )(...arg),
      ...createSectionSlice(
        'certificates',
        SECTION_CONFIGS.certificates
      )(...arg),
      ...createSkillsSlice(...arg)
    }))
  )
)
