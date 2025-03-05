import { useEffect, useState } from 'react'
import { availableResumeFields } from '@/constants/availableResumeFields.ts'

export function useResumeSection(
  storageKey: null | string = null,
  initialFields = availableResumeFields
) {
  const [resumeData, setResumeData] = useState(() => {
    if (storageKey) {
      const savedData = localStorage.getItem(`${storageKey}-sections`)
      return savedData ? JSON.parse(savedData) : initialFields
    } else {
      return initialFields
    }
  })
  const [deletedSections, setDeletedSections] = useState(() => {
    if (storageKey) {
      const savedDeletedSections = localStorage.getItem(
        `${storageKey}-deleted-sections`
      )

      if (savedDeletedSections) {
        return JSON.parse(savedDeletedSections)
      } else {
        // Calculate initial deleted sections
        const activeSectionKeys = initialFields.map((item) => item.sectionKey)
        const allSectionKeys = availableResumeFields.map(
          (field) => field.sectionKey
        )

        const missingSectionKeys = allSectionKeys.filter(
          (key) => !activeSectionKeys.includes(key)
        )

        return availableResumeFields.filter((field) =>
          missingSectionKeys.includes(field.sectionKey)
        )
      }
    }
    return []
  })

  useEffect(() => {
    if (!storageKey) return
    localStorage.setItem(`${storageKey}-sections`, JSON.stringify(resumeData))
    localStorage.setItem(
      `${storageKey}-deleted-sections`,
      JSON.stringify(deletedSections)
    )
  }, [resumeData, deletedSections, storageKey])

  const deleteSection = (sectionKey: string) => {
    // Find the section being deleted
    const sectionToDelete = resumeData.find(
      (item: any) => item.sectionKey === sectionKey
    )

    // Add to deleted sections
    if (sectionToDelete) {
      setDeletedSections((prev: any) => [...prev, sectionToDelete])
    }

    // Remove from active sections
    setResumeData((prevData: any) =>
      prevData.filter((item: any) => item.sectionKey !== sectionKey)
    )
  }

  const addSection = (sectionKey: string) => {
    // Find the section in deleted sections
    const sectionToAdd = deletedSections.find(
      (item: any) => item.sectionKey === sectionKey
    )

    if (sectionToAdd) {
      // Add to active sections
      setResumeData((prev: any) => [...prev, sectionToAdd])

      // Remove from deleted sections
      setDeletedSections((prev: any) =>
        prev.filter((item: any) => item.sectionKey !== sectionKey)
      )
    }
  }

  const reorderSections = (oldIndex: any, newIndex: any) => {
    setResumeData((prev: any) => {
      const result = Array.from(prev)
      const [removed] = result.splice(oldIndex, 1)
      result.splice(newIndex, 0, removed)
      return result
    })
  }

  return {
    resumeData,
    deletedSections,
    deleteSection,
    addSection,
    reorderSections
  }
}

export default useResumeSection
