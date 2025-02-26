import { SectionConfig } from '@/types/section.ts'
import { useResumeStore } from '@/store/rootStore.ts'
import {
  useCallback,
  useDeferredValue,
  useEffect,
  useRef,
  useState
} from 'react'

import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent
} from '@dnd-kit/core'
import { restrictToVerticalAxis } from '@dnd-kit/modifiers'

import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove
} from '@dnd-kit/sortable'
import SortableSectionItem from '@/components/section/SortableSectionItem.tsx'

interface SectionProps {
  sectionKey: string
  config?: SectionConfig
}

function Section({ sectionKey, config }: SectionProps) {
  const { data } = useResumeStore((state) => state[sectionKey])
  const sectionData = useDeferredValue(data)
  // const updateTitle = useResumeStore(
  //   (state) => state[`update${sectionKey}Title`]
  // )
  const updateData = useResumeStore((state) => state[`update${sectionKey}Data`])
  const reorderData = useResumeStore(
    (state) => state[`reorder${sectionKey}Items`]
  )
  const [activeItem, setActiveItem] = useState('')

  const itemRef = useRef<Record<string, HTMLDivElement | null>>({})

  const sensors = useSensors(useSensor(PointerSensor))

  const handleDragEnd = (event: DragEndEvent): void => {
    const { active, over } = event
    if (over && active.id !== over.id) {
      const oldIndex = sectionData.findIndex(
        (item: any) => item.id === active.id
      )
      const newIndex = sectionData.findIndex((item: any) => item.id === over.id)
      const newData = arrayMove(sectionData, oldIndex, newIndex)
      reorderData(newData)
    }
  }

  // TODO: implement useClickOutside here
  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (!activeItem) return

      const activeElement = itemRef.current[activeItem]
      if (activeElement && !activeElement.contains(event.target as Node)) {
        const currentData = sectionData.find((sd: any) => sd.id === activeItem)
        const arrayFieldName = config?.fields.filter(
          (cf) => cf.type === 'array'
        )[0]?.name

        const arrayFieldData = currentData[arrayFieldName!]
        if (arrayFieldData && arrayFieldData.length > 1) {
          console.log('arrayFieldData', arrayFieldData)
          const nonEmptyData = arrayFieldData.filter(
            (a: any) => a.trim() !== ''
          )
          if (nonEmptyData.length === 0) {
            updateData(activeItem, {
              [arrayFieldName!]: ['']
            })
            return
          }

          if (nonEmptyData.length !== arrayFieldData.length) {
            updateData(activeItem, {
              [arrayFieldName!]: nonEmptyData
            })
          }
        }
        setActiveItem('')
      }
    },
    [activeItem, sectionData, updateData, config?.fields]
  )

  useEffect(() => {
    document.addEventListener('click', handleClickOutside)

    return () => document.removeEventListener('click', handleClickOutside)
  }, [handleClickOutside])

  return (
    <>
      <DndContext
        sensors={sensors}
        onDragEnd={handleDragEnd}
        modifiers={[restrictToVerticalAxis]}
      >
        <SortableContext
          items={sectionData}
          strategy={verticalListSortingStrategy}
        >
          {sectionData?.map((item: any, index: number) => (
            <SortableSectionItem
              key={item.id}
              id={item.id}
              itemRef={itemRef}
              activeItem={activeItem}
              setActiveItem={setActiveItem}
              index={index}
              item={item}
              sectionKey={sectionKey}
              config={config!}
            />
          ))}
        </SortableContext>
      </DndContext>
    </>
  )
}

export default Section
