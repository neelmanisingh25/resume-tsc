import { ReactNode } from 'react'

interface PageContainerProps {
  children: ReactNode
}

function PageContainer({ children }: PageContainerProps) {
  return (
    <div className='min-h-screen py-8 px-4' id='root-div'>
      <div className='mx-auto relative'>
        {/* A4 container with proper dimensions and padding */}
        <div className='w-[210mm] h-[297mm] mx-auto bg-white p-[10mm] shadow-lg'>
          {children}
        </div>
      </div>
    </div>
  )
}

export default PageContainer
