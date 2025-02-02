import { memo, useCallback, useRef } from 'react'
import ContentEditable from '@/helper/contentEditable.tsx'
import { contentEditableClasses } from '@/constants/constants.ts'
import { useResumeStore } from '@/store/rootStore.ts'

interface Props {
  workExperienceId: string
  achievements: string[] | undefined
  isActive?: boolean
}

function WorkExperienceAchievements(props: Props) {
  const { workExperienceId, achievements, isActive } = props
  const updateWorkExperienceData = useResumeStore(
    (state) => state.updateWorkExperienceData
  )

  const ulRef = useRef<HTMLUListElement>(null)

  const onAchievementChange = useCallback(
    (index: number) => (value: string) => {
      const newAchievements = [...(achievements || [])]
      newAchievements[index] = value
      updateWorkExperienceData(workExperienceId, {
        achievements: newAchievements
      })
    },
    [achievements, updateWorkExperienceData, workExperienceId]
  )

  const addAchievement = useCallback(
    (index: number) => {
      const newAchievements = [...(achievements || [])]
      newAchievements.splice(index + 1, 0, '')
      updateWorkExperienceData(workExperienceId, {
        achievements: newAchievements
      })
      focusNewAchievement(index + 1)
    },
    [achievements, updateWorkExperienceData, workExperienceId]
  )

  const focusNewAchievement = (index: number) => {
    setTimeout(() => {
      const liElements = ulRef.current?.children[index]
      if (!liElements) return
      const contentEditable = liElements?.querySelector(
        '[contenteditable="true"]'
      ) as HTMLElement
      if (contentEditable) contentEditable.focus()
    }, 10)
  }

  const deleteAchievementField = useCallback(
    (index: number) => {
      if (achievements && achievements?.length <= 1) return
      const newAchievements = achievements?.filter((_, i) => i !== index)
      updateWorkExperienceData(workExperienceId, {
        achievements: newAchievements
      })

      focusNewAchievement(index - 1)
    },
    [achievements, workExperienceId, updateWorkExperienceData]
  )

  return (
    <div>
      <ul className='pl-0' ref={ulRef}>
        {achievements?.map((achievement, index) => (
          <li key={index} className='text-left list-disc list-outside ml-4'>
            <ContentEditable
              className={`${contentEditableClasses} text-left`}
              placeholder='Achievement'
              onChange={onAchievementChange(index)}
              isActive={isActive || false}
              onEnterKey={() => addAchievement(index)}
              onDeleteField={() => deleteAchievementField(index)}
              addNewAchievement={true}
              deleteAchievement={true}
            >
              {achievement}
            </ContentEditable>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default memo(WorkExperienceAchievements)
