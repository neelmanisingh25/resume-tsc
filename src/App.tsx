import { useEffect, useState } from 'react'
import './App.css'
import Contact from './components/contact/Contact.tsx'
import { Separator } from '@/components/ui/separator.tsx'
import Section from '@/components/section/Section.tsx'
import { SECTION_CONFIGS } from '@/types/section.ts'
import PageContainer from '@/hoc/PageContainer.tsx'
import { DndContext, DragEndEvent } from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy
} from '@dnd-kit/sortable'
import { restrictToVerticalAxis } from '@dnd-kit/modifiers'
import SortableSectionTitle from '@/components/section/SortableSectionTitle.tsx'
import Skills from '@/components/skills/Skills.tsx'
import { SpeedInsights } from '@vercel/speed-insights/react'
function App() {
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

  const [resumeData, setResumeData] = useState(availableResumeFields)

  const deleteSelection = (sectionKey: string) => {
    setResumeData((prevData) =>
      prevData.filter((item) => item.sectionKey !== sectionKey)
    )
  }

  const handleDragEnd = (event: DragEndEvent): void => {
    const { active, over } = event
    if (active.id !== over?.id) {
      setResumeData((prev) => {
        const oldIndex = prev.findIndex((item) => item.sectionKey === active.id)
        const newIndex = prev.findIndex((item) => item.sectionKey === over?.id)
        return arrayMove(prev, oldIndex, newIndex)
      })
    }
  }

  return (
    <>
      <EditModeProvider>
        <PreviewModeProvider>
          <CreateMyResume />
          <PageContainer>
            <div className='text-[10pt] leading-normal'>
              <Contact />
              <Separator className='my-1.5' />
              <DndContext
                onDragEnd={handleDragEnd}
                modifiers={[restrictToVerticalAxis]}
              >
                <SortableContext
                  items={resumeData.map((item) => item.sectionKey)}
                  strategy={verticalListSortingStrategy}
                >
                  {resumeData.map(({ sectionKey, config }) => (
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
                  ))}
                </SortableContext>
              </DndContext>
            </div>
          </PageContainer>
        </PreviewModeProvider>
      </EditModeProvider>
      <Analytics />
      <SpeedInsights />
    </>
  )
}

import PreviewModeProvider from '@/providers/PreviewModeProvider.tsx'
import CreateMyResume from '@/components/editUtil/buttons/CreateMyResume.tsx'
import EditModeProvider from '@/providers/EditModeProvider.tsx'
import { Analytics } from '@vercel/analytics/react'

const availableResumeFields = [
  {
    sectionKey: 'workExperience',
    config: SECTION_CONFIGS.workExperience
  },
  {
    sectionKey: 'projects',
    config: SECTION_CONFIGS.projects
  },
  {
    sectionKey: 'volunteerExperience',
    config: SECTION_CONFIGS.volunteerExperience
  },
  {
    sectionKey: 'education',
    config: SECTION_CONFIGS.education
  },
  {
    sectionKey: 'certificates',
    config: SECTION_CONFIGS.certificates
  },
  {
    sectionKey: 'skills'
  }
]

export default App
