import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import SectionItem from '@/components/section/SectionItem.tsx'
import { SectionConfig } from '@/types/section.ts'
import { LuGrip } from 'react-icons/lu'
import React, { useContext } from 'react'
import { EditModeContext } from '@/contexts/context.ts'

interface SortableSectionItemProps {
  id: string
  itemRef: React.RefObject<Record<string, HTMLDivElement | null>>
  activeItem: string
  setActiveItem: (id: string) => void
  index: number
  item: any
  sectionKey: string
  config: SectionConfig
}

function SortableSectionItem({
  id,
  itemRef,
  activeItem,
  setActiveItem,
  index,
  item,
  sectionKey,
  config
}: SortableSectionItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transition,
    transform,
    isDragging
  } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    position: 'relative'
    // zIndex: isDragging ? 9 : 0
  }

  const { isEditMode } = useContext(EditModeContext)

  return (
    <div
      ref={(node) => {
        setNodeRef(node)
        if (node) {
          // combinedRef.current = node
          itemRef.current[id] = node
        } else {
          delete itemRef.current[id]
        }
      }}
      style={style as React.CSSProperties}
      className={`group relative flex transition-all duration-200 ${
        activeItem === id ? 'active' : ''
      }`}
      onClick={isEditMode ? () => setActiveItem(id) : undefined}
    >
      <div
        className={
          isEditMode
            ? 'absolute -ml-6 mt-1 flex flex-start cursor-grab touch-none opacity-0' +
              ' group-hover:opacity-100 transition-opacity duration-200'
            : 'hidden'
        }
        {...attributes}
        {...listeners}
      >
        <LuGrip />
      </div>
      <SectionItem
        item={item}
        index={index}
        sectionKey={sectionKey}
        config={config}
        isActive={activeItem === id}
        setActiveItem={setActiveItem}
        ref={itemRef}
      />
    </div>
  )
}

export default SortableSectionItem
