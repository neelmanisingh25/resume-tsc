import { StateCreator } from 'zustand/vanilla'
import { StoreState } from '@/store/rootStore.ts'
import { availableResumeFields } from '@/constants/availableResumeFields.ts'

export interface ResumeSectionSlice {
  resumeData: any[]
  deletedSections: any[]
  deleteSection: (sectionKey: string) => void
  addSection: (sectionKey: string) => void
  reorderSections: (oldIndex: number, newIndex: number) => void
}

const createResumeSectionSlice: StateCreator<
  StoreState,
  [['zustand/immer', never], ['zustand/devtools', never]],
  [],
  ResumeSectionSlice
> = (set) => ({
  resumeData: availableResumeFields,
  deletedSections: [],
  deleteSection: (sectionKey: string) =>
    set((state) => {
      const sectionToDelete = state.resumeData.find(
        (section: any) => section.sectionKey === sectionKey
      )
      if (!sectionToDelete) return state
      return {
        resumeData: state.resumeData.filter(
          (section: any) => section.sectionKey !== sectionKey
        ),
        deletedSections: [...state.deletedSections, sectionToDelete]
      }
    }),
  addSection: (sectionKey: string) =>
    set((state) => {
      const sectionToAdd = state.deletedSections.find(
        (section: any) => section.sectionKey === sectionKey
      )
      if (!sectionToAdd) return state
      return {
        resumeData: [...state.resumeData, sectionToAdd],
        deletedSections: state.deletedSections.filter(
          (section: any) => section.sectionKey !== sectionKey
        )
      }
    }),
  reorderSections: (oldIndex: number, newIndex: number) =>
    set((state) => {
      const newResumeData = [...state.resumeData]
      const [removed] = newResumeData.splice(oldIndex, 1)
      newResumeData.splice(newIndex, 0, removed)
      return {
        resumeData: newResumeData
      }
    })
})

export default createResumeSectionSlice
