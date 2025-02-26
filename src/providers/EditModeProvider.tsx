import { ReactNode, useState } from 'react'
import { EditModeContext } from '@/contexts/context.ts'

function EditModeProvider({ children }: { children: ReactNode }) {
  const [isEditMode, setIsEditMode] = useState(false)

  return (
    <EditModeContext.Provider value={{ isEditMode, setIsEditMode }}>
      {children}
    </EditModeContext.Provider>
  )
}

export default EditModeProvider
