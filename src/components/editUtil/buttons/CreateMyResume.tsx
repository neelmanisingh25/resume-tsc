import { Button } from '@/components/ui/button.tsx'
import { useContext } from 'react'
import { EditModeContext } from '@/contexts/context.ts'

function CreateMyResume() {
  // const { isPreviewMode, setIsPreviewMode } = useContext(PreviewModeContext)
  const { isEditMode, setIsEditMode } = useContext(EditModeContext)

  const handleSetIsEditMode = () => {
    setIsEditMode(true)
  }

  return (
    <div className='p-3 bg-green-600'>
      {isEditMode ? (
        <div className='flex gap-4 justify-center'>
          <Button onClick={() => setIsEditMode(false)}>Preview Resume</Button>
          <Button>Download Resume</Button>
        </div>
      ) : (
        <Button onClick={handleSetIsEditMode}>Create My Resume</Button>
      )}
    </div>
  )
}

export default CreateMyResume
