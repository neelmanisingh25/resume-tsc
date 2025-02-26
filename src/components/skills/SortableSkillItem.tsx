import SkillsData from './SkillsData.tsx'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { LuGrip } from 'react-icons/lu'
import React, { useContext } from 'react'
import { EditModeContext } from '@/contexts/context.ts'

interface SortableSkillItemProps {
  skill: any
  index: number
  activeSkillGroup: string | null
  setActiveSkillGroup: (id: string | null) => void
}

// Sortable Skill Item component
const SortableSkillItem = ({
  skill,
  index,
  activeSkillGroup,
  setActiveSkillGroup
}: SortableSkillItemProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: skill.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    position: 'relative',
    zIndex: isDragging ? 1 : 0
  }

  const { isEditMode } = useContext(EditModeContext)
  return (
    <div
      ref={setNodeRef}
      style={style as React.CSSProperties}
      className='group relative'
      onClick={() => setActiveSkillGroup(skill.id)}
    >
      <div
        className={
          isEditMode
            ? 'absolute left-[-20px] top-1 opacity-0 group-hover:opacity-100 cursor-grab'
            : 'hidden'
        }
        {...attributes}
        {...listeners}
      >
        <LuGrip size={14} className='text-gray-400' />
      </div>
      <SkillsData
        skill={skill}
        index={index}
        activeSkillGroup={activeSkillGroup}
        setActiveSkillGroup={setActiveSkillGroup}
      />
    </div>
  )
}

export default SortableSkillItem
