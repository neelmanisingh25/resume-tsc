import { ReactNode, useState } from 'react'
import { PreviewModeContext } from '@/contexts/context.ts'

function PreviewModeProvider({ children }: { children: ReactNode }) {
  const [isPreviewMode, setIsPreviewMode] = useState(false)

  return (
    <PreviewModeContext.Provider value={{ isPreviewMode, setIsPreviewMode }}>
      {children}
    </PreviewModeContext.Provider>
  )
}

export default PreviewModeProvider
