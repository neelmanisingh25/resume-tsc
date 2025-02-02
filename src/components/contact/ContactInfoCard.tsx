//Adding a comment to test Eslint
interface ContactInfoProps {
  value: string | undefined
  suffix?: string
  url?: boolean
  text?: string
}

function ContactInfoCard(props: ContactInfoProps) {
  const { value, suffix, url, text } = props
  const showContent = !!value
  if (!showContent) {
    return ''
  }
  return (
    <>
      {!url && (
        <span>
          {value}
          {suffix ? ` ${suffix} ` : null}
        </span>
      )}
      {url && (
        <span>
          <a href={value}>{text}</a>
          {suffix ? ` ${suffix} ` : null}
        </span>
      )}
    </>
  )
}

export default ContactInfoCard
