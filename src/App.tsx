import { useEffect } from 'react'
import './App.css'
import Contact from './components/contact/Contact.tsx'
import { Separator } from '@/components/ui/separator.tsx'
import WorkExperience from '@/components/workExperience/WorkExperience.tsx'
import Skills from '@/components/skills/Skills.tsx'

function App() {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (document.activeElement !== event.target) {
        event.stopPropagation()
        event.preventDefault()
        document.activeElement?.blur()
        // document.activeElement?.classList.add('cursor-transparent')
      }
    }

    window.addEventListener('click', (event) => handleClick(event))

    // Cleanup function to remove event listener
    return () => {
      window.removeEventListener('click', handleClick)
    }
  }, [])

  return (
    <>
      <Contact />
      <Separator className='my-1.5' />
      <WorkExperience />
      <Separator className='my-1.5' />
      <Skills />
    </>
  )
}

export default App
