import { useState } from 'react'
import { DndContext, DragEndEvent } from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy
} from '@dnd-kit/sortable'
import { restrictToVerticalAxis } from '@dnd-kit/modifiers'
import SortableSkillItem from '@/components/skills/SortableSkillItem.tsx'
import useSkillActions from '@/hooks/useSkillActions.ts'
import useResumeData from '@/hooks/useResumeData.tsx'

function Skills() {
  const { data: skillsData } = useResumeData('skills')
  const { handleReorderSkills } = useSkillActions()
  // const [isTitleEditable, setIsTitleEditable] = useState(false)
  // const updateSkillTitle = useResumeStore((state) => state.updateSkillTitle)

  const [activeSkillGroup, setActiveSkillGroup] = useState<null | string>(null)

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (active.id !== over?.id) {
      const oldIndex = skillsData.findIndex((sd: any) => sd.id === active.id)
      const newIndex = skillsData.findIndex((sd: any) => sd.id === over?.id)
      const newData = arrayMove(skillsData, oldIndex, newIndex)
      // @ts-ignore
      handleReorderSkills(newData)
    }
  }

  return (
    <>
      <DndContext
        onDragEnd={handleDragEnd}
        modifiers={[restrictToVerticalAxis]}
      >
        <SortableContext
          items={skillsData.map((sd: any) => sd.id)}
          strategy={verticalListSortingStrategy}
        >
          {skillsData?.map((sd: any, index: number) => (
            <SortableSkillItem
              key={sd.id}
              skill={sd}
              index={index}
              activeSkillGroup={activeSkillGroup}
              setActiveSkillGroup={setActiveSkillGroup}
            />
          ))}
        </SortableContext>
      </DndContext>
    </>
  )
}

export default Skills
