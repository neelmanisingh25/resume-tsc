import { Skill } from '@/store/SkillsSlice.ts'
import ContentEditable from '@/helper/contentEditable.tsx'
import { contentEditableClasses } from '@/constants/constants.ts'
import React, { useCallback, useRef } from 'react'
import useSkillActions from '@/hooks/useSkillActions.ts'
import useClickOutside from '@/hooks/useClickOutside.ts'

interface Props {
  skill: Skill
  index: number
  activeSkillGroup: string | null
  setActiveSkillGroup: (id: string | null) => void
}

export type SkillDataRef = {
  [key: string]: HTMLDivElement | null
}

export type SkillValueRef = {
  [key: string]: HTMLDivElement | null
}

function SkillsData(props: Props) {
  const { skill, activeSkillGroup, setActiveSkillGroup } = props
  const { handleSkillGroupChange, handleUpdateSkill, handleAddNewSkill } =
    useSkillActions()

  const skillDataRef = useRef<SkillDataRef>({})
  const skillValueRef = useRef<SkillValueRef>({})

  useClickOutside(activeSkillGroup, setActiveSkillGroup, skillDataRef)

  const isActive = activeSkillGroup === skill.id

  const setRef = useCallback(
    (
      element: HTMLDivElement | null,
      id: string,
      refData: React.RefObject<SkillDataRef | SkillValueRef>
    ) => {
      if (element && refData.current) {
        refData.current[id] = element
      } else {
        delete refData.current[id]
      }
    },
    []
  )

  return (
    <div
      ref={(element) => setRef(element, skill.id, skillDataRef)}
      className={`flex group ${isActive ? 'active' : ''}`}
    >
      <ContentEditable
        className={`w-40 text-left mr-2 ${contentEditableClasses} font-semibold`}
        defaultValue='Skill Group'
        placeholder='Skill Group'
        isActive={isActive}
        onChange={handleSkillGroupChange(skill.id)}
      >{`${skill.name}`}</ContentEditable>
      <div className={`flex flex-wrap gap-2`}>
        {skill.value.map((v, index) => (
          <div
            ref={(element) => setRef(element, v.id, skillValueRef)}
            key={v.id}
          >
            <ContentEditable
              className={`${contentEditableClasses} skill`}
              addNewSkill={true}
              isActive={isActive}
              defaultValue='Skill'
              placeholder='Skill'
              onEnterKey={handleAddNewSkill(skill.id, index + 1, skillValueRef)}
              onChange={handleUpdateSkill(skill.id, index)}
            >
              {v.data}
            </ContentEditable>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SkillsData
