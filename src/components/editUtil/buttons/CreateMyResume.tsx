import { Button } from '@/components/ui/button.tsx'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { useContext, useState } from 'react'
import {
  EditModeContext,
  PageTypeContext,
  PreviewModeContext
} from '@/contexts/context.ts'
import { useNavigate } from 'react-router-dom'
import { useResumeStore } from '@/store/rootStore.ts'
import { saveAs } from 'file-saver'
import ExtractPdf from '@/helper/extractPdf.tsx'
import { defaultResumeData } from '@/constants/defaultResume.ts'

function CreateMyResume() {
  const { isEditMode, setIsEditMode } = useContext(EditModeContext)
  const { isPreviewMode, setIsPreviewMode } = useContext(PreviewModeContext)
  const navigate = useNavigate()
  const resetStore = useResumeStore((state) => state.resetState)

  const { email } = useResumeStore((state) => state.contact)
  const { name } = useResumeStore((state) => state)
  const [isDownloading, setIsDownloading] = useState(false)
  const { pageType } = useContext(PageTypeContext)

  const handleSetIsEditMode = () => {
    setIsEditMode(true)
    setIsPreviewMode(false)
  }

  const handleSetIsEditModeWithSameData = () => {
    setIsEditMode(true)
    setIsPreviewMode(false)
    resetStore(defaultResumeData)
    navigate('/editor')
  }

  const handleSetIsPreviewMode = () => {
    setIsPreviewMode(true)
    setIsEditMode(false)
  }

  const handleDownloadResume = async () => {
    // const htmlContent = document.documentElement.outerHTML
    // @ts-ignore
    const htmlContent = document.getElementById('resume-data').innerHTML
    const base64Html = btoa(htmlContent)
    try {
      setIsDownloading(true)
      const response = await fetch(
        'https://negative-bibi-resume-builder-f3b7e503.koyeb.app/generate-pdf',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            html: base64Html,
            name: name,
            email: email,
            isBase64: true
          })
        }
      )

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`)
      }
      const blob = await response.blob()

      const fileName = `${name.replace(/\s+/g, '_')}_Resume.pdf`
      saveAs(blob, fileName)
    } catch (error) {
      console.error('Error downloading resume:', error)
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <div className='p-2 bg-gray-400 resume-options mx-auto w-full md:w-[210mm] sticky bottom-0 z-10 flex justify-center items-center'>
      {pageType === 'editor' ? <ExtractPdf /> : null}
      {isPreviewMode ? (
        <div className='flex gap-4 justify-center'>
          <Button onClick={handleSetIsEditMode}>Enter Edit Mode</Button>

          <Button onClick={handleDownloadResume} disabled={isDownloading}>
            {isDownloading ? 'Downloading...' : 'Download Resume'}
          </Button>
        </div>
      ) : isEditMode ? (
        <div className='flex gap-4 justify-center'>
          <Button onClick={handleSetIsPreviewMode}>Preview Resume</Button>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span>
                  <Button disabled={true}>Download Resume</Button>
                </span>
              </TooltipTrigger>
              <TooltipContent>
                <p>Preview before downloading</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      ) : (
        <div>
          <Button onClick={handleSetIsEditMode}>
            Create Resume(Empty Template)
          </Button>
          <Button onClick={handleSetIsEditModeWithSameData}>
            Create Resume(Fill same data)
          </Button>
        </div>
      )}
    </div>
  )
}

export default CreateMyResume
