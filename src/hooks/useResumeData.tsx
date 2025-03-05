import { PageTypeContext } from '@/contexts/context.ts'
import { useContext } from 'react'
import { useResumeStore } from '@/store/rootStore.ts'
import { defaultResumeData } from '@/constants/defaultResume.ts'

function useResumeData(sectionKey: string) {
  const { pageType } = useContext(PageTypeContext)
  const storeData = useResumeStore((state) => state[sectionKey])

  // @ts-ignore
  return pageType === 'home' ? defaultResumeData[sectionKey] : storeData
}

export default useResumeData
