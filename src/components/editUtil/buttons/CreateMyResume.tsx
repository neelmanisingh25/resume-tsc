import { Button } from '@/components/ui/button.tsx'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { useContext } from 'react'
import { EditModeContext, PreviewModeContext } from '@/contexts/context.ts'
import { useNavigate } from 'react-router-dom'
import { useResumeStore } from '@/store/rootStore.ts'
import { saveAs } from 'file-saver'

function CreateMyResume() {
  const { isEditMode, setIsEditMode } = useContext(EditModeContext)
  const { isPreviewMode, setIsPreviewMode } = useContext(PreviewModeContext)
  const navigate = useNavigate()

  const { email } = useResumeStore((state) => state.contact)
  const { name } = useResumeStore((state) => state)

  const handleSetIsEditMode = () => {
    setIsEditMode(true)
    setIsPreviewMode(false)
    navigate('/editor')
  }

  const handleSetIsPreviewMode = () => {
    setIsPreviewMode(true)
    setIsEditMode(false)
  }

  const handleDownloadResume = async () => {
    const htmlContent = document.documentElement.outerHTML
    const base64Html = btoa(htmlContent)
    try {
      const response = await fetch('http://localhost:3000/generate-pdf', {
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
      })

      console.log(response)
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`)
      }
      const blob = await response.blob()

      const fileName = `${name.replace(/\s+/g, '_')}_Resume.pdf`
      saveAs(blob, fileName)
    } catch (error) {
      console.error('Error downloading resume:', error)
    }
  }

  return (
    <div className='p-3 bg-green-600 resume-options w-[210mm] mx-auto sticky top-0 z-10'>
      {isPreviewMode ? (
        <div className='flex gap-4 justify-center'>
          <Button onClick={handleSetIsEditMode}>Enter Edit Mode</Button>

          <Button onClick={handleDownloadResume}>Download Resume</Button>
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
        <Button onClick={handleSetIsEditMode}>Create My Resume</Button>
      )}
    </div>
  )
}

export default CreateMyResume
