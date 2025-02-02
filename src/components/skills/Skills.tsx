import { useState } from 'react'
import ContentEditable from '@/helper/contentEditable.tsx'
import { useResumeStore } from '@/store/rootStore.ts'
import SkillsData from './SkillsData.tsx'

function Skills() {
  const { title, data: skillsData } = useResumeStore((state) => state.skills)
  const [isTitleEditable, setIsTitleEditable] = useState(false)
  const updateSkillTitle = useResumeStore((state) => state.updateSkillTitle)

  const [activeSkillGroup, setActiveSkillGroup] = useState<null | string>(null)

  return (
    <>
      <ContentEditable
        className='text-3xl font-bold mb-2 text-left border-b-2 border-transparent border-dashed focus:outline-none focus:border-blue-500'
        placeholder='Skills'
        onChange={updateSkillTitle}
        defaultValue='Skills'
        isActive={isTitleEditable}
        onfocus={() => setIsTitleEditable(true)}
        onblur={() => setIsTitleEditable(false)}
      >
        {title}
      </ContentEditable>
      {skillsData?.map((sd, index) => (
        <div
          onClick={() => setActiveSkillGroup(sd.id)}
          className='group'
          key={sd.id}
        >
          <SkillsData
            skill={sd}
            index={index}
            activeSkillGroup={activeSkillGroup}
            setActiveSkillGroup={setActiveSkillGroup}
          />
        </div>
      ))}
    </>
  )
}

export default Skills
