import SectionTitle from '@/components/section/SectionTitle.tsx'
import { useSortable } from '@dnd-kit/sortable'
import { SectionConfig } from '@/types/section.ts'
import { LuGrip } from 'react-icons/lu'
import { CSS } from '@dnd-kit/utilities'
import React, { useContext, useEffect } from 'react'
import { MdDeleteOutline } from 'react-icons/md'
import { useResumeStore } from '@/store/rootStore.ts'
import { IoMdAddCircleOutline } from 'react-icons/io'
import useSkillActions from '@/hooks/useSkillActions.ts'
import { EditModeContext } from '@/contexts/context.ts'

interface SortableSectionTitleProps {
  sectionKey: string
  config?: SectionConfig
  onDraggingChange: (isDraggingSection: boolean) => void
  onDelete: (sectionKey: string) => void
}

function SortableSectionTitle(props: SortableSectionTitleProps) {
  const { isEditMode } = useContext(EditModeContext)
  const { sectionKey, config, onDraggingChange, onDelete } = props
  const deleteSectionKey = useResumeStore(
    (state) => state[`reset${sectionKey}`]
  )
  const addSectionKey = useResumeStore((state) => state[`addNew${sectionKey}`])
  const { handleAddNewSkill } = useSkillActions()

  const handleTitleDelete = (): void => {
    onDelete(sectionKey)
    deleteSectionKey(sectionKey)
  }

  const handleAddSectionValue = (): void => {
    if (sectionKey !== 'skills') {
      addSectionKey(0)
    } else {
      handleAddNewSkill()
    }
  }

  const {
    attributes,
    listeners,
    setNodeRef,
    transition,
    transform,
    isDragging
  } = useSortable({ id: sectionKey })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    position: 'relative',
    zIndex: isDragging ? 99 : 0
  }

  useEffect(() => {
    onDraggingChange(isDragging)
  }, [isDragging])

  return (
    <div
      ref={setNodeRef}
      style={style as React.CSSProperties}
      className='group relative'
    >
      <div className='flex items-center justify-between border-b-2 border-black'>
        <div className='flex'>
          <div
            onClick={() => handleTitleDelete()}
            className={isEditMode ? 'hover:cursor-pointer' : 'hidden'}
          >
            <MdDeleteOutline
              size={40}
              className='absolute pr-4 top-1/2 -translate-y-1/2 -translate-x-6  text-red-500 transition-colors opacity-0 group-hover:opacity-100 hover:cursor-pointer'
            />
          </div>

          <SectionTitle sectionKey={sectionKey} config={config} />
          <div onClick={handleAddSectionValue} className='hover:cursor-pointer'>
            <IoMdAddCircleOutline
              size={32}
              className={
                isEditMode
                  ? 'absolute  top-1/2 pl-1 -translate-y-1/2 text-green-500 transition-colors' +
                    ' opacity-0 group-hover:opacity-100 hover:cursor-pointer'
                  : 'hidden'
              }
            />
          </div>
        </div>

        <div
          className='mr-2 cursor-grab touch-none'
          {...listeners}
          {...attributes}
        >
          {isEditMode && <LuGrip size={14} className='text-gray-400' />}
        </div>
      </div>
    </div>
  )
}

export default SortableSectionTitle
