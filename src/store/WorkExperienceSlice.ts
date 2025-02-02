import { StateCreator } from 'zustand/vanilla'
import { HeaderSlice } from '@/store/HeaderSlice.ts'
import { v4 as uuid } from 'uuid'
import { SkillsSlice } from '@/store/SkillsSlice.ts'
type ReferenceContact = {
  name: string
  mobile: string
}

export interface WorkExperienceData {
  id: string
  companyName?: string
  position?: string
  beginMonthYear?: string
  endMonthYear?: string
  location?: string
  achievements?: string[]
  referenceContact?: ReferenceContact
}

export interface WorkExperience {
  title: string
  data: WorkExperienceData[]
}

export interface WorkExperienceState {
  workExperience: WorkExperience
}

export interface WorkExperienceSlice extends WorkExperienceState {
  addWorkExperienceTitle: (title: string) => void
  updateWorkExperienceData: (
    id: string,
    value: Partial<WorkExperienceData>
  ) => void
  addNewWorkExperience: (index: number) => void
}

const initialState: WorkExperienceState = {
  workExperience: {
    title: 'Work Experience',
    data: [
      {
        id: uuid(),
        companyName: 'Upland Software',
        position: 'Software Engineer II',
        beginMonthYear: 'July 2021',
        endMonthYear: 'Present',
        location: 'Bengaluru, India',
        achievements: [
          'this is where i took a real jump man in career',
          'i did some significant work here'
        ]
      },
      {
        id: uuid(),
        companyName: 'Upland Software',
        position: 'Software Engineer II',
        beginMonthYear: 'July 2021',
        endMonthYear: 'Present',
        location: 'Bengaluru, India',
        achievements: [
          'this is where i took a real jump man in career',
          'i did some significant work here'
        ]
      }
    ]
  }
}

export const createWorkExperienceSlice: StateCreator<
  WorkExperienceSlice & HeaderSlice & SkillsSlice,
  [['zustand/immer', never], ['zustand/devtools', never]],
  [],
  WorkExperienceSlice
> = (set) => ({
  ...initialState,
  addWorkExperienceTitle: (title: string) =>
    set(
      (state) => {
        state.workExperience.title = title
      },
      undefined,
      'resume:WorkExperience/addWorkExperienceTitle'
    ),
  updateWorkExperienceData: (id: string, value: Partial<WorkExperienceData>) =>
    set(
      (state) => {
        const findIndex = state.workExperience.data?.findIndex(
          (item) => item.id === id
        )
        if (findIndex !== -1) {
          Object.assign(state?.workExperience.data[findIndex], value)

          // For nested updates (like achievements):
          // state.workExperience.data[index].achievements = newValue
        }
      },
      undefined,
      'resume:WorkExperience/updateWorkExperienceData'
    ),
  addNewWorkExperience: (index: number) =>
    set((state) => {
      state.workExperience.data.splice(index, 0, {
        id: uuid(),
        companyName: 'Company Name',
        position: 'Title/Position',
        beginMonthYear: '',
        endMonthYear: '',
        achievements: ['']
      })
    })
})
