import { create } from 'zustand'
import { createHeaderSlice } from './HeaderSlice.ts'
import { HeaderSlice } from './HeaderSlice.ts'
import { immer } from 'zustand/middleware/immer'
import { devtools, persist } from 'zustand/middleware'
import { WorkExperienceSlice } from '@/store/WorkExperienceSlice.ts'
import { createSkillsSlice, SkillsSlice } from '@/store/SkillsSlice.ts'
import { createSectionSlice } from '@/store/createSectionSlice.ts'
import { Section, SECTION_CONFIGS } from '@/types/section.ts'
import createResumeSectionSlice from '@/store/ResumeSectionSlice.ts'
import _ from 'lodash'

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
    persist(
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
        ...createSkillsSlice(...arg),
        ...createResumeSectionSlice(...arg),
        resetState: (data: any) =>
          arg[0]((state) => {
            return _.merge(state, data)
          })
      })),
      {
        name: 'resume-storage'
      }
    )
  )
)
