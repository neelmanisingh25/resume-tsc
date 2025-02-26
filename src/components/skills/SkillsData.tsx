import { Skill } from '@/store/SkillsSlice.ts'
import ContentEditable from '@/helper/contentEditable.tsx'
import { contentEditableClasses } from '@/constants/constants.ts'
import React, { useCallback, useContext, useRef } from 'react'
import useSkillActions from '@/hooks/useSkillActions.ts'
import useClickOutside from '@/hooks/useClickOutside.ts'
import { MdDeleteOutline } from 'react-icons/md'
import { EditModeContext } from '@/contexts/context.ts'

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
  const {
    handleSkillGroupChange,
    handleUpdateSkill,
    handleAddNewSkillValue,
    handleDeleteSkill
  } = useSkillActions()

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

  // @ts-ignore
  const { isEditMode } = useContext(EditModeContext)

  return (
    <div
      ref={(element) => setRef(element, skill.id, skillDataRef)}
      className={`flex group ${isActive ? 'active' : ''} items-center`}
    >
      <ContentEditable
        className={`text-left mr-2 ${contentEditableClasses} font-semibold`}
        placeholder='Untitled'
        isActive={isActive}
        onChange={handleSkillGroupChange(skill.id)}
      >{`${skill.name}`}</ContentEditable>
      <div className='font-bold'>:</div>
      <div className={`flex flex-wrap gap-2 ml-2`}>
        {skill.value.map((v, index) => (
          <div
            ref={(element) => setRef(element, v.id, skillValueRef)}
            key={v.id}
          >
            <ContentEditable
              className={`${contentEditableClasses} skill`}
              addNewSkill={true}
              isActive={isActive}
              placeholder='Skill'
              onEnterKey={handleAddNewSkillValue(
                skill.id,
                index + 1,
                skillValueRef
              )}
              onChange={handleUpdateSkill(skill.id, index)}
            >
              {v.data}
            </ContentEditable>
          </div>
        ))}
      </div>
      <div
        className={
          isEditMode
            ? 'opacity-0 group-hover:opacity-100 cursor-pointer'
            : 'hidden'
        }
        onClick={handleDeleteSkill(skill.id)}
      >
        <MdDeleteOutline className='text-red-500' size={18} />
      </div>
    </div>
  )
}

export default SkillsData
