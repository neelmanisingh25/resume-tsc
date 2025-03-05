import ContactInfoCard from './contact/ContactInfoCard.tsx'
import { useMemo } from 'react'
import { v4 as uuid } from 'uuid'
import useResumeData from '@/hooks/useResumeData.tsx'

function ContactInfo() {
  const contactState = useResumeData('contact')
  const contactInfo = useMemo(
    () => [
      {
        id: uuid(),
        name: 'location',
        value: contactState.location,
        placeholder: 'Location'
      },
      {
        id: uuid(),
        name: 'mobile',
        value: contactState.mobile,
        placeholder: 'Mobile'
      },
      {
        id: uuid(),
        name: 'email',
        value: contactState.email,
        placeholder: 'Email'
      },
      {
        id: uuid(),
        name: 'github',
        value: contactState.github,
        type: 'url',
        displayText: 'Github',
        placeholder: 'Github'
      },
      {
        id: uuid(),
        name: 'linkedin',
        value: contactState.linkedIn,
        type: 'url',
        displayText: 'LinkedIn',
        placeholder: 'LinkedIn'
      },
      {
        id: uuid(),
        name: 'portfolio',
        value: contactState.portfolio,
        type: 'url',
        displayText: 'Portfolio',
        placeholder: 'Portfolio'
      }
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
