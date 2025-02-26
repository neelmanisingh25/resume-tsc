import { useResumeStore } from '@/store/rootStore.ts'
import ContactInfo from '../ContactInfo.tsx'
import { useCallback, useContext, useState } from 'react'
import AccountInfoEditModal from '../modal/AccountInfoEditModal.tsx'
import type { Contact } from '@/store/HeaderSlice.ts'
import { showPlaceholderClasses } from '@/constants/constants.ts'
import { EditModeContext } from '@/contexts/context.ts'

function Contact() {
  const name = useResumeStore((state) => state.name)
  const updateAllContactInfo = useResumeStore(
    (state) => state.updateAllContactInfo
  )
  const [showContactEditModal, setShowContactEditModal] = useState(false)

  const handleContactFormSubmit = useCallback(
    (_prevState: Contact, formData: FormData) => {
      const data: Record<string, string | undefined> = {}
      for (const [key, value] of formData.entries()) {
        const val = value as string
        data[key] = val === '' ? undefined : val
      }

      updateAllContactInfo(data)
      setShowContactEditModal(false)
      return data
    },
    [updateAllContactInfo]
  )

  const { isEditMode } = useContext(EditModeContext)

  return (
    <>
      <div
        onClick={() => {
          setShowContactEditModal(true)
        }}
      >
        <h1
          className={`text-4xl font-bold ${showPlaceholderClasses}`}
          data-placeholder='John Doe'
        >
          {name}
        </h1>
        <ContactInfo />
      </div>
      <AccountInfoEditModal
        onFormSubmit={handleContactFormSubmit}
        showModal={showContactEditModal && isEditMode}
        setShowModal={setShowContactEditModal}
      />
    </>
  )
}

export default Contact
