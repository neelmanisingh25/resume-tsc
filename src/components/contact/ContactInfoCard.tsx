import { CiLinkedin, CiLocationOn, CiMail, CiMobile3 } from 'react-icons/ci'
import { TbWorldWww } from 'react-icons/tb'
import { SlSocialGithub } from 'react-icons/sl'

// interface ContactInfoProps {
//   value: string | undefined
//   suffix?: string
//   url?: boolean
//   text?: string
// }

function ContactInfoCard(props: any) {
  const { contactInfo } = props
  const showContent = !!contactInfo.value
  if (!showContent) {
    return ''
  }

  function extractAfterHttps(url: string) {
    const regex = /^https:\/\/(www\.)?(.+)$/
    const match = url.match(regex)

    return match ? match[2] : null
  }

  const renderIcon = () => {
    switch (contactInfo.name) {
      case 'location':
        return <CiLocationOn />
      case 'mobile':
        return <CiMobile3 />
      case 'email':
        return <CiMail />
      case 'github':
        return <SlSocialGithub />
      case 'linkedin':
        return <CiLinkedin />
      case 'portfolio':
        return <TbWorldWww />
    }
  }

  const renderItems = () => {
    switch (contactInfo?.type) {
      case 'url':
        return (
          <a href={contactInfo.value}>{extractAfterHttps(contactInfo.value)}</a>
        )
      default:
        return <div>{contactInfo.value}</div>
    }
  }

  return (
    <div className='flex justify-center items-center text-center mr-2 last:mr-0'>
      {renderIcon()} <div className='ml-1'>{renderItems()}</div>
    </div>
  )
}

export default ContactInfoCard
