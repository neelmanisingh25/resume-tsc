import PageContainer from '@/hoc/PageContainer.tsx'
import ResumeContent from '@/components/ResumeContent.tsx'
import { useContext, useEffect } from 'react'
import { PageTypeContext } from '@/contexts/context.ts'
import { defaultResumeData } from '@/constants/defaultResume.ts'
import { availableResumeFields } from '@/constants/availableResumeFields.ts'

function HomePage() {
  const { setPageType } = useContext(PageTypeContext)

  useEffect(() => {
    setPageType('home')
  }, [])

  const showResumeFields = availableResumeFields.filter((field: any) => {
    // @ts-ignore
    return defaultResumeData[field.sectionKey].data.length > 0
  })

  return (
    <PageContainer>
      <ResumeContent resumeFields={showResumeFields} />
    </PageContainer>
  )
}
export default HomePage
