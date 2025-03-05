import { PageTypeContext } from '@/contexts/context.ts'
import { ReactNode, useState } from 'react'
import { PageType } from '@/contexts/context.ts'

function PageTypeProvider({ children }: { children: ReactNode }) {
  const [pageType, setPageType] = useState<PageType>('home')
  return (
    <PageTypeContext.Provider value={{ pageType, setPageType }}>
      {children}
    </PageTypeContext.Provider>
  )
}

export default PageTypeProvider
