import { ReactNode } from 'react'

interface PageContainerProps {
  children: ReactNode
}

function PageContainer({ children }: PageContainerProps) {
  return (
    <div className='min-h-screen md:py-8 md:px-4' id='root-div'>
      <div className='mx-auto relative'>
        {/* A4 container with proper dimensions and padding */}
        <div
          className='w-full md:w-[210mm] mx-auto p-[10mm] min-h-[297mm] bg-white'
          id='resume-data'
        >
          {children}
        </div>
      </div>
    </div>
  )
}

export default PageContainer
