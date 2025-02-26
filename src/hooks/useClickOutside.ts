import { SkillDataRef } from '@/components/skills/SkillsData.tsx'
import React, { useCallback, useEffect } from 'react'

const useClickOutside = (
  activeSkillGroup: string | null,
  setActiveSkillGroup: (id: string | null) => void,
  skillDataRef: React.RefObject<SkillDataRef>
) => {
  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (!activeSkillGroup) return

      const activeElement = skillDataRef.current?.[activeSkillGroup]
      if (activeElement && !activeElement.contains(event.target as Node)) {
        setActiveSkillGroup(null)
        if (document.activeElement instanceof HTMLElement) {
          document.activeElement.blur()
        }
      }
    },
    [activeSkillGroup, setActiveSkillGroup, skillDataRef]
  )

  useEffect(() => {
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [handleClickOutside])
}

export default useClickOutside
