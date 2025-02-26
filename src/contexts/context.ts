import React, { createContext } from 'react'

interface EditModeContextType {
  isEditMode: boolean
  setIsEditMode: React.Dispatch<React.SetStateAction<boolean>>
}

interface PreviewModeContextType {
  isPreviewMode: boolean
  setIsPreviewMode: React.Dispatch<React.SetStateAction<boolean>>
}

export const EditModeContext = createContext<EditModeContextType>({
  isEditMode: false,
  setIsEditMode: () => {}
})
export const PreviewModeContext = createContext<PreviewModeContextType>({
  isPreviewMode: false,
  setIsPreviewMode: () => {}
})
