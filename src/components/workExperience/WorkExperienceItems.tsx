import ContentEditable from '@/helper/contentEditable.tsx'
import {
  contentEditableClasses,
  showAddNewFieldClasses
} from '@/constants/constants.ts'
import { memo, Ref, useCallback, useMemo } from 'react'
import { WorkExperienceData } from '@/store/WorkExperienceSlice.ts'
import WorkExperienceAchievements from '@/components/workExperience/WorkExperienceAchievements.tsx'
import { useResumeStore } from '@/store/rootStore.ts'
import { WorkExperienceRefs } from '@/components/workExperience/WorkExperience.tsx'

interface Props {
  workExperience: WorkExperienceData
  activeWorkExperienceGroup: string | null
  index: number
  ref: Ref<WorkExperienceRefs>
  setActiveWorkExperienceGroup: (id: string) => void
}

function WorkExperienceItems(props: Props) {
  const {
    workExperience,
    activeWorkExperienceGroup,
    index,
    ref: workExperienceRef,
    setActiveWorkExperienceGroup
  } = props

  const updateWorkExperienceData = useResumeStore(
    (state) => state.updateWorkExperienceData
  )
  const addNewWorkExperience = useResumeStore(
    (state) => state.addNewWorkExperience
  )

  const isActive = useMemo(
    () => activeWorkExperienceGroup === workExperience.id,
    [activeWorkExperienceGroup, workExperience.id]
  )

  const createChangeHandler = useCallback(
    (field: string) => (value: string) =>
      updateWorkExperienceData(workExperience.id, { [field]: value }),
    [updateWorkExperienceData, workExperience.id]
  )

  function focusWorkExperienceElement(index: number) {
    setTimeout(() => {
      const workExperienceData = useResumeStore.getState().workExperience.data
      const id = workExperienceData[index].id
      setActiveWorkExperienceGroup(workExperienceData[index].id)
      let divElement
      if (workExperienceRef && 'current' in workExperienceRef) {
        divElement = workExperienceRef?.current?.[id]
      }
      if (!divElement) return
      const companyNameDiv = divElement?.querySelector(
        `.company-name`
      ) as HTMLDivElement
      if (companyNameDiv) {
        companyNameDiv.focus()
      }
    }, 1)
  }

  const checkForEmptyWorkExperience = () => {
    const workExperienceData = useResumeStore.getState().workExperience.data
    return workExperienceData.findIndex(
      (we) => we.companyName === 'Company Name'
    )
  }

  const handleAddNewWorkExperience = (index: number) => {
    const emptyIndex = checkForEmptyWorkExperience()
    if (emptyIndex === -1) {
      addNewWorkExperience(index)
      focusWorkExperienceElement(index)
    } else {
      focusWorkExperienceElement(emptyIndex)
    }
  }

  return (
    <div className='flex-grow'>
      {/*<div className=''>hello</div>*/}
      <div className='flex-grow'>
        <div className='mb-4 mt-2'>
          <div className='flex text-left gap-x-10'>
            <ContentEditable
              className={`${contentEditableClasses} grow font-semibold company-name`}
              defaultValue='Company Name'
              placeholder='Company Name'
              onChange={createChangeHandler('companyName')}
              isActive={isActive}
            >
              {workExperience.companyName}
            </ContentEditable>
            <ContentEditable
              className={`${contentEditableClasses} flex-none font-semibold`}
              placeholder='Location'
              onChange={createChangeHandler('location')}
              isActive={isActive}
            >
              {workExperience.location}
            </ContentEditable>
          </div>
          <div className='flex text-left gap-x-10'>
            <ContentEditable
              className={`${contentEditableClasses} grow italic`}
              placeholder='Title/Position'
              defaultValue='Title/Position'
              onChange={createChangeHandler('position')}
              isActive={isActive}
            >
              {workExperience.position}
            </ContentEditable>

            <ContentEditable
              className={`${contentEditableClasses} flex-none italic`}
              isActive={isActive}
              placeholder='Serving date'
              onChange={(value) => console.log('print', value)}
            >{`${workExperience.beginMonthYear} - ${workExperience.endMonthYear}`}</ContentEditable>
          </div>

          <WorkExperienceAchievements
            workExperienceId={workExperience.id}
            achievements={workExperience.achievements}
            isActive={isActive}
          />
        </div>

        <div className={showAddNewFieldClasses}>
          <div
            onClick={() => handleAddNewWorkExperience(index + 1)}
            className='cursor-pointer border border-green-500 rounded-full w-6 h-6 flex items-center justify-center'
          >
            +
          </div>
          <div className='flex-grow border-b-2 border-dashed border-green-500 mx-2' />
          <div className='w-2 h-2 bg-green-500 rounded-full' />
        </div>
      </div>
    </div>
  )
}

export default memo(WorkExperienceItems)
