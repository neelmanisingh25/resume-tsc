import { CiLinkedin, CiLocationOn, CiMail, CiMobile3 } from 'react-icons/ci'
import { TbWorldWww } from 'react-icons/tb'
import { SlSocialGithub } from 'react-icons/sl'
import { showPlaceholderClasses } from '@/constants/constants.ts'
import { useContext } from 'react'
import { EditModeContext, PreviewModeContext } from '@/contexts/context.ts'

// interface ContactInfoProps {
//   value: string | undefined
//   suffix?: string
//   url?: boolean
//   text?: string
// }

function ContactInfoCard(props: any) {
  const { contactInfo } = props
  const { isPreviewMode } = useContext(PreviewModeContext)
  const { isEditMode } = useContext(EditModeContext)
  // if (!showContent) {
  //   return ''
  // }

  function extractAfterHttps(url: string) {
    const regex = /^https:\/\/(www\.)?(.+)$/
    if (!url) return null
    const match = url.match(regex)

    return match ? match[2] : url
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
        return isEditMode ? (
          <div>{extractAfterHttps(contactInfo.value)}</div>
        ) : (
          <a
            href={contactInfo.value}
            data-placeholder={contactInfo.placeholder}
            className={`${showPlaceholderClasses}`}
          >
            {extractAfterHttps(contactInfo.value)}
          </a>
        )
      default:
        return (
          <div
            data-placeholder={contactInfo.placeholder}
            className={`${showPlaceholderClasses}`}
          >
            {contactInfo.value}
          </div>
        )
    }
  }

  return (
    <div
      className={`flex justify-center items-center text-center mr-2 last:mr-0 ${isPreviewMode && !contactInfo.value ? 'hidden' : ''}`}
    >
      {renderIcon()} <div className='ml-1'>{renderItems()}</div>
    </div>
  )
}

export default ContactInfoCard
