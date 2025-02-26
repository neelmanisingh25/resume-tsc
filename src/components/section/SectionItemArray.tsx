import { memo, useCallback, useRef } from 'react'
import ContentEditable from '@/helper/contentEditable.tsx'
import { contentEditableClasses } from '@/constants/constants.ts'
import { useResumeStore } from '@/store/rootStore.ts'

interface Props {
  workExperienceId: string
  value: string[] | undefined
  isActive?: boolean
  placeholder: string
  sectionKey: string
  fieldName: string
  positionId?: string
  item?: any
}

interface Positions {
  id: string
  [key: string]: any
}

function SectionItemArray(props: Props) {
  const {
    workExperienceId,
    value,
    isActive,
    placeholder,
    sectionKey,
    fieldName,
    positionId,
    item
  } = props

  const updateData = useResumeStore((state) => state[`update${sectionKey}Data`])
  const ulRef = useRef<HTMLUListElement>(null)

  const onAchievementChange = useCallback(
    (index: number) => (data: string) => {
      const newAchievements = [...(value || [])]
      newAchievements[index] = data

      if (positionId) {
        // Update achievements for a specific position
        updateData(workExperienceId, {
          positions: item.positions.map((pos: Positions) =>
            pos.id === positionId
              ? { ...pos, [fieldName]: newAchievements }
              : pos
          )
        })
      } else {
        // Update achievements directly on the company
        updateData(workExperienceId, {
          [fieldName]: newAchievements
        })
      }
    },
    [value, updateData, workExperienceId, fieldName, positionId, item]
  )

  const addAchievement = useCallback(
    (index: number) => {
      const newAchievements = [...(value || [])]
      newAchievements.splice(index + 1, 0, '')
      if (positionId) {
        // Update achievements for a specific position
        updateData(workExperienceId, {
          positions: item.positions.map((pos: Positions) =>
            pos.id === positionId
              ? { ...pos, [fieldName]: newAchievements }
              : pos
          )
        })
      } else {
        // Update achievements directly on the company
        updateData(workExperienceId, {
          [fieldName]: newAchievements
        })
      }
      focusNewAchievement(index + 1)
    },
    [value, updateData, workExperienceId, fieldName, item, positionId]
  )

  const focusNewAchievement = (index: number) => {
    setTimeout(() => {
      const liElements = ulRef.current?.children[index]
      if (!liElements) return
      const contentEditable = liElements?.querySelector(
        '[contenteditable="true"]'
      ) as HTMLElement
      if (contentEditable) contentEditable.focus()
    }, 4)
  }

  const deleteAchievementField = useCallback(
    (index: number) => {
      if (value && value?.length <= 1) return
      // TODO: fix this
      // const newAchievements = value?.filter((_, i) => i !== index)
      // updateData(workExperienceId, {
      //   [fieldName]: newAchievements
      // })

      focusNewAchievement(index - 1)
    },
    [value, workExperienceId, updateData, fieldName]
  )

  return (
    <div>
      <ul className={`pl-0 `} ref={ulRef}>
        {value?.map((achievement, index) => (
          <li key={index} className='text-left list-disc list-outside ml-4'>
            <ContentEditable
              className={`${contentEditableClasses} text-left`}
              placeholder={placeholder}
              onChange={onAchievementChange(index)}
              isActive={isActive || false}
              onEnterKey={() => addAchievement(index)}
              onDeleteField={() => deleteAchievementField(index)}
              addNewAchievement={true}
              deleteAchievement={true}
              // useHtml
            >
              {achievement}
            </ContentEditable>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default memo(SectionItemArray)
