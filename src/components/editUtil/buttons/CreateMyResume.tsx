import { Button } from '@/components/ui/button.tsx'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { useContext } from 'react'
import { EditModeContext, PreviewModeContext } from '@/contexts/context.ts'

function CreateMyResume() {
  const { isEditMode, setIsEditMode } = useContext(EditModeContext)
  const { isPreviewMode, setIsPreviewMode } = useContext(PreviewModeContext)

  const handleSetIsEditMode = () => {
    setIsEditMode(true)
    setIsPreviewMode(false)
  }

  const handleSetIsPreviewMode = () => {
    setIsPreviewMode(true)
    setIsEditMode(false)
  }

  return (
    <div className='p-3 bg-green-600'>
      {isPreviewMode ? (
        <div className='flex gap-4 justify-center'>
          <Button onClick={handleSetIsEditMode}>Enter Edit Mode</Button>

          <Button>Download Resume</Button>
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
