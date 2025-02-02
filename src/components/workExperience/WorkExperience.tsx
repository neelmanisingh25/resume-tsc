import { useResumeStore } from '@/store/rootStore.ts'
import ContentEditable from '@/helper/contentEditable.tsx'
import {
  useCallback,
  useDeferredValue,
  useEffect,
  useRef,
  useState
} from 'react'
import WorkExperienceItems from '@/components/workExperience/WorkExperienceItems.tsx'

export type WorkExperienceRefs = {
  [key: string]: HTMLDivElement | null
}

// TODO: prevent the default click behaviour when clicking apart from the contentEditableDiv
function WorkExperience() {
  const { title, data } = useResumeStore((state) => state.workExperience)
  const [isTitleEditable, setIsTitleEditable] = useState(false)
  const workExperienceData = useDeferredValue(data)
  const addWorkExperienceTitle = useResumeStore(
    (state) => state.addWorkExperienceTitle
  )
  const workExperienceItemsRef = useRef<WorkExperienceRefs>({})
  const [activeWorkExperienceGroup, setActiveWorkExperienceGroup] = useState('')

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (activeWorkExperienceGroup) {
        const activeElement =
          workExperienceItemsRef.current[activeWorkExperienceGroup]

        const store = useResumeStore.getState()
        if (activeElement && !activeElement.contains(event.target as Node)) {
          const currentExperience = store.workExperience.data.find(
            (we) => we.id === activeWorkExperienceGroup
          )
          if (currentExperience?.achievements) {
            if (currentExperience.achievements.length > 1) {
              const nonEmptyAchievements =
                currentExperience.achievements.filter((a) => a.trim() !== '')
              if (nonEmptyAchievements.length === 0) {
                store.updateWorkExperienceData(activeWorkExperienceGroup, {
                  achievements: []
                })
                return
              }
              if (
                nonEmptyAchievements.length !==
                currentExperience.achievements.length
              ) {
                store.updateWorkExperienceData(activeWorkExperienceGroup, {
                  achievements: nonEmptyAchievements
                })
              }
            }
          }
          setActiveWorkExperienceGroup('')
        }
      }
    },
    [activeWorkExperienceGroup]
  )
  useEffect(() => {
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [handleClickOutside])

  return (
    <>
      <ContentEditable
        className='text-3xl font-bold mb-2 text-left border-b-2 border-transparent border-dashed focus:outline-none focus:border-blue-500'
        placeholder='Work Experience'
        onChange={addWorkExperienceTitle}
        defaultValue='Work Experience'
        isActive={isTitleEditable}
        onfocus={() => setIsTitleEditable(true)}
        onblur={() => setIsTitleEditable(false)}
      >
        {title}
      </ContentEditable>
      {workExperienceData?.map((workExperience, index) => (
        <div
          key={workExperience.id}
          ref={(element) => {
            if (element) {
              workExperienceItemsRef.current[workExperience.id] = element
            } else {
              delete workExperienceItemsRef.current[workExperience.id]
            }
          }}
          className={`group relative flex transition-all duration-200 ${activeWorkExperienceGroup === workExperience.id ? 'active' : ''}`}
          onClick={() => setActiveWorkExperienceGroup(workExperience.id)}
        >
          <WorkExperienceItems
            workExperience={workExperience}
            activeWorkExperienceGroup={activeWorkExperienceGroup}
            index={index}
            ref={workExperienceItemsRef}
            setActiveWorkExperienceGroup={setActiveWorkExperienceGroup}
          />
        </div>
      ))}
    </>
  )
}

export default WorkExperience
