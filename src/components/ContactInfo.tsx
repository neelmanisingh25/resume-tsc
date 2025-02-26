import ContactInfoCard from './contact/ContactInfoCard.tsx'
import { useResumeStore } from '@/store/rootStore.ts'
import { useMemo } from 'react'
import { v4 as uuid } from 'uuid'

function ContactInfo() {
  // const { email, github, mobile, linkedIn, location, portfolio } = useResumeStore((state) => state.contact)
  const contactState = useResumeStore((state) => state.contact)
  const contactInfo = useMemo(
    () => [
      {
        id: uuid(),
        name: 'location',
        value: contactState.location
      },
      {
        id: uuid(),
        name: 'mobile',
        value: contactState.mobile
      },
      {
        id: uuid(),
        name: 'email',
        value: contactState.email
      },
      {
        id: uuid(),
        name: 'github',
        value: contactState.github,
        type: 'url',
        displayText: 'Github'
      },
      {
        id: uuid(),
        name: 'linkedin',
        value: contactState.linkedIn,
        type: 'url',
        displayText: 'LinkedIn'
      }
      // {
      //   id: uuid(),
      //   name: 'portfolio',
      //   value: contactState.portfolio,
      //   type: 'url',
      //   displayText: 'Portfolio'
      // }
    ],
    [contactState]
  )
  return (
    <div className='flex flex-wrap mt-1 justify-center'>
      {contactInfo.map((ci) => (
        <ContactInfoCard contactInfo={ci} key={ci.id} />
      ))}
    </div>
  )
}

export default ContactInfo
