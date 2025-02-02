import ContactInfoCard from './contact/ContactInfoCard.tsx'
import { useResumeStore } from '@/store/rootStore.ts'

function ContactInfo() {
  const { email, github, mobile, linkedIn, location, portfolio } =
    useResumeStore((state) => state.contact)
  return (
    <div>
      <ContactInfoCard value={location} suffix='|' />
      <ContactInfoCard value={mobile} suffix='|' />
      <ContactInfoCard value={email} suffix='|' />
      <ContactInfoCard value={github} suffix='|' text='Github' url />
      <ContactInfoCard value={linkedIn} suffix='|' text='LinkedIn' url />
      <ContactInfoCard value={portfolio} text='Portfolio' url />
    </div>
  )
}

export default ContactInfo
