import PageContainer from '@/hoc/PageContainer.tsx'
import ResumeContent from '@/components/ResumeContent.tsx'
import { useContext, useEffect } from 'react'
import {
  EditModeContext,
  PageTypeContext,
  PreviewModeContext
} from '@/contexts/context.ts'
import useResumeSection from '@/hooks/useResumeSection.tsx'

function EditorPage() {
  const { setPageType } = useContext(PageTypeContext)
  const { setIsEditMode } = useContext(EditModeContext)
  const { setIsPreviewMode } = useContext(PreviewModeContext)

  useEffect(() => {
    setPageType('editor')
    setIsEditMode(true)
    setIsPreviewMode(false)
  }, [])

  const {
    resumeData,
    deletedSections,
    deleteSection,
    addSection,
    reorderSections
  } = useResumeSection('editor-resume')

  const handleDragEnd = (event: any) => {
    const { active, over } = event
    if (active.id !== over?.id) {
      const oldIndex = resumeData.findIndex(
        (item: any) => item.sectionKey === active.id
      )
      const newIndex = resumeData.findIndex(
        (item: any) => item.sectionKey === over?.id
      )
      reorderSections(oldIndex, newIndex)
    }
  }

  return (
    <div className='relative'>
      <div className='w-[210mm] mt-2 sticky top-0 z-10 mx-auto deleted-sections'>
        {deletedSections.length > 0 && (
          <div className='mb-4 p-2 bg-slate-100 rounded'>
            <h3 className='font-medium mb-2'>Add Sections:</h3>
            <div className='flex flex-wrap gap-2'>
              {deletedSections.map((section: any) => (
                <button
                  key={section.sectionKey}
                  onClick={() => addSection(section.sectionKey)}
                  className='px-2 py-1 bg-white border border-slate-300 rounded text-xs hover:bg-slate-50'
                >
                  + {section.sectionKey.replace(/([A-Z])/g, ' $1').trim()}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      <PageContainer>
        <ResumeContent
          resumeFields={resumeData}
          onDeleteSection={deleteSection}
          onDragEnd={handleDragEnd}
        />
      </PageContainer>
    </div>
  )
}

export default EditorPage
