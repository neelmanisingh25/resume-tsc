import React, { useCallback } from 'react'
import { useResumeStore } from '@/store/rootStore.ts'
import { SectionConfig } from '@/types/section.ts'

interface FocusNewItemProps {
  sectionKey: string
  setActiveItem: (id: string) => void
  itemRef: React.RefObject<Record<string, HTMLDivElement | null>>
  config: SectionConfig
}

export default function useFocusNewItem({
  sectionKey,
  setActiveItem,
  itemRef,
  config
}: FocusNewItemProps) {
  const focusItem = useCallback(
    (id: string, fieldName: string) => {
      setActiveItem(id)

      if (itemRef.current && itemRef.current[id]) {
        const divElement = itemRef.current[id]
        const fieldDiv = divElement.querySelector(
          `[data-name="${fieldName}"]`
        ) as HTMLDivElement

        if (fieldDiv) {
        }
        fieldDiv.focus()
      }
    },
    [itemRef, setActiveItem]
  )

  // No direct focusNewItem function - instead we'll return a function
  // that integrates with the state update

  return {
    focusItem,
    // This function integrates with the addNewData store action
    getFocusAction: (index: number) => () => {
      const sectionData = useResumeStore.getState()[sectionKey].data
      if (index < sectionData.length) {
        const id = sectionData[index].id
        setActiveItem(id)

        // We need to wait for React to process the next render
        // queueMicrotask is more reliable than setTimeout(0)
        queueMicrotask(() => {
          const firstField = config.fields[0].name
          focusItem(id, firstField)
        })
      }
    }
  }
}
