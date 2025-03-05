import React, { createContext } from 'react'

interface EditModeContextType {
  isEditMode: boolean
  setIsEditMode: React.Dispatch<React.SetStateAction<boolean>>
}

interface PreviewModeContextType {
  isPreviewMode: boolean
  setIsPreviewMode: React.Dispatch<React.SetStateAction<boolean>>
}

export type PageType = 'home' | 'editor'

export const EditModeContext = createContext<EditModeContextType>({
  isEditMode: false,
  setIsEditMode: () => {}
})
export const PreviewModeContext = createContext<PreviewModeContextType>({
  isPreviewMode: false,
  setIsPreviewMode: () => {}
})

export const PageTypeContext = createContext<{
  pageType: PageType
  setPageType: React.Dispatch<React.SetStateAction<PageType>>
}>({
  pageType: 'home',
  setPageType: () => {}
})
