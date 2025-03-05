import Contact from '@/components/contact/Contact.tsx'
import { Separator } from '@/components/ui/separator.tsx'
import { DndContext, DragEndEvent } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import SortableSectionTitle from '@/components/section/SortableSectionTitle.tsx'
import Section from '@/components/section/Section.tsx'
import Skills from '@/components/skills/Skills.tsx'
import { useEffect, useState } from 'react'
import { restrictToVerticalAxis } from '@dnd-kit/modifiers'

interface ResumeContentProps {
  resumeFields: any | null
  onDeleteSection?: (sectionKey: string) => void
  onDragEnd?: (sectionKey: string) => void
}

function ResumeContent({
  resumeFields = null,
  onDeleteSection,
  onDragEnd
}: ResumeContentProps) {
  const [isDraggingSection, setIsDraggingSection] = useState(false)

  const handleChangeIsDraggingSection = (isDraggingSection: boolean) => {
    setIsDraggingSection(isDraggingSection)
  }

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (document.activeElement !== event.target) {
        event.stopPropagation()
        event.preventDefault()
        // (document.activeElement as HTMLElement)?.blur()
        if (document.activeElement instanceof HTMLElement) {
          document.activeElement.blur()
        }
        // document.activeElement?.classList.add('cursor-transparent')
      }
    }

    window.addEventListener('click', (event) => handleClick(event))

    // Cleanup function to remove event listener
    return () => {
      window.removeEventListener('click', handleClick)
    }
  }, [])

  // const [resumeData, setResumeData] = useState(resumeFields || null)

  const deleteSelection = (sectionKey: string) => {
    if (onDeleteSection) {
      onDeleteSection(sectionKey)
    }
    // setResumeData((prevData) =>
    //   prevData.filter((item) => item.sectionKey !== sectionKey)
    // )
  }

  const handleDragEnd = (event: DragEndEvent): void => {
    // const { active, over } = event
    // if (active.id !== over?.id) {
    //   setResumeData((prev) => {
    //     const oldIndex = prev.findIndex((item) => item.sectionKey === active.id)
    //     const newIndex = prev.findIndex((item) => item.sectionKey === over?.id)
    //     return arrayMove(prev, oldIndex, newIndex)
    //   })
    // }
    if (onDragEnd) {
      // @ts-ignore
      onDragEnd(event)
    }
  }

  return (
    <div className='text-[10pt] leading-normal'>
      <Contact />
      <Separator className='my-1.5' />
      <DndContext
        onDragEnd={handleDragEnd}
        modifiers={[restrictToVerticalAxis]}
      >
        <SortableContext
          items={resumeFields.map((item: any) => item.sectionKey)}
          strategy={verticalListSortingStrategy}
        >
          {resumeFields.map(
            ({ sectionKey, config }: { sectionKey: string; config: any }) => (
              <div key={sectionKey}>
                <SortableSectionTitle
                  sectionKey={sectionKey}
                  config={config}
                  onDraggingChange={handleChangeIsDraggingSection}
                  onDelete={deleteSelection}
                />
                <div className={isDraggingSection ? 'hidden' : ''}>
                  {sectionKey === 'skills' ? (
                    <Skills />
                  ) : (
                    <Section
                      key={sectionKey}
                      sectionKey={sectionKey}
                      config={config}
                    />
                  )}
                </div>
              </div>
            )
          )}
        </SortableContext>
      </DndContext>
    </div>
  )
}

export default ResumeContent
