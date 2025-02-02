import { useResumeStore } from '@/store/rootStore.ts'
import { SkillValueRef } from '@/components/skills/SkillsData.tsx'
import React from 'react'

const useSkillActions = () => {
  const checkForEmptySkill = (id: string) => {
    const skillData = useResumeStore.getState().skills.data
    const data = skillData.find((sd) => sd.id === id)
    return data?.value.find((d) => d.data === 'Skill' || d.data === '')
  }

  const updateSkillGroupName = useResumeStore(
    (state) => state.updateSkillGroupName
  )
  const addNewSkill = useResumeStore((state) => state.addNewSkill)
  const updateSkillValue = useResumeStore((state) => state.updateSkillValue)

  const focusSkillElement = (
    id: string,
    skillValueRef: React.RefObject<SkillValueRef>
  ) => {
    setTimeout(() => {
      // const skill = findSkill(skillData, id)
      const emptySkill = checkForEmptySkill(id)
      let divElement
      if (skillValueRef && 'current' in skillValueRef && emptySkill) {
        divElement = skillValueRef?.current?.[emptySkill.id]
      }
      if (!divElement) return
      const skillDiv = divElement?.querySelector(`.skill`) as HTMLDivElement
      if (skillDiv) {
        skillDiv.focus()
      }
    }, 1)
  }

  return {
    handleSkillGroupChange: (id: string) => (value: string) =>
      updateSkillGroupName(id, value),
    handleAddNewSkill:
      (
        id: string,
        index: number,
        skillValueRef: React.RefObject<SkillValueRef>
      ) =>
      () => {
        console.log('handleNewskillclicked')
        const emptySkill = checkForEmptySkill(id)
        console.log('emptySkill', emptySkill)
        if (!emptySkill) {
          addNewSkill(id, index)
          focusSkillElement(id, skillValueRef)
        } else {
          // TODO: this needs work, it's nor working
          focusSkillElement(emptySkill.id, skillValueRef)
        }
      },
    handleUpdateSkill: (id: string, index: number) => (value: string) =>
      updateSkillValue(id, index, value)
  }
}

export default useSkillActions
