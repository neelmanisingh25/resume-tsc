import { SkillDataRef } from '@/components/skills/SkillsData.tsx'
import React, { useCallback, useEffect } from 'react'

const useClickOutside = (
  activeGroup: string | null,
  setActiveGroup: (id: string | null) => void,
  dataRef: React.RefObject<SkillDataRef>
) => {
  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (!activeGroup) return

      const activeElement = dataRef.current?.[activeGroup]
      if (activeElement && !activeElement.contains(event.target as Node)) {
        setActiveGroup(null)
        if (document.activeElement instanceof HTMLElement) {
          document.activeElement.blur()
        }
      }
    },
    [activeGroup, setActiveGroup, dataRef]
  )

  useEffect(() => {
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [handleClickOutside])
}

export default useClickOutside
