import PageContainer from '@/hoc/PageContainer.tsx'
import ResumeContent from '@/components/ResumeContent.tsx'
import { useContext, useEffect } from 'react'
import {
  EditModeContext,
  PageTypeContext,
  PreviewModeContext
} from '@/contexts/context.ts'
import { useResumeStore } from '@/store/rootStore.ts'

function EditorPage() {
  const { setPageType } = useContext(PageTypeContext)
  const { setIsEditMode } = useContext(EditModeContext)
  const { setIsPreviewMode, isPreviewMode } = useContext(PreviewModeContext)

  useEffect(() => {
    setPageType('editor')
    setIsEditMode(true)
    setIsPreviewMode(false)
  }, [])

  const resumeData = useResumeStore((state) => state.resumeData)
  const deletedSections = useResumeStore((state) => state.deletedSections)
  const deleteSection = useResumeStore((state) => state.deleteSection)
  const addSection = useResumeStore((state) => state.addSection)
  const reorderSections = useResumeStore((state) => state.reorderSections)

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
      {/*<div className='flex mx-auto w-[210mm] items-center justify-center text-white'></div>*/}
      {!isPreviewMode && (
        <div className='w-[210mm] mt-1 sticky top-0 z-10 mx-auto deleted-sections'>
          {deletedSections.length > 0 && (
            <div className='p-2 bg-slate-100 rounded'>
              <h3 className='font-bold mb-1'>
                Add more Sections to your Resume
              </h3>
              <div className='flex flex-wrap gap-2'>
                {deletedSections.map((section: any) => (
                  <button
                    key={section.sectionKey}
                    onClick={() => addSection(section.sectionKey)}
                    className='px-2 py-1 bg-green-600 border border-slate-300 rounded text-xs text-white'
                  >
                    + {section.sectionKey.replace(/([A-Z])/g, ' $1').trim()}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
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
