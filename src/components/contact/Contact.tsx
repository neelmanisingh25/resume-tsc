import { useResumeStore } from '@/store/rootStore.ts'
import ContactInfo from '../ContactInfo.tsx'
import { useCallback, useContext, useState } from 'react'
import AccountInfoEditModal from '../modal/AccountInfoEditModal.tsx'
import type { Contact } from '@/store/HeaderSlice.ts'
import { contentEditableClasses } from '@/constants/constants.ts'
import { EditModeContext } from '@/contexts/context.ts'
import ContentEditable from '@/helper/contentEditable.tsx'
import useResumeData from '@/hooks/useResumeData.tsx'

function Contact() {
  const name = useResumeData('name')
  const updateAllContactInfo = useResumeStore(
    (state) => state.updateAllContactInfo
  )
  const updateName = useResumeStore((state) => state.updateName)
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
      <ContentEditable
        className={
          isEditMode
            ? `text-4xl font-bold ${contentEditableClasses} focus:border-b-2 flex items-center justify-center`
            : 'text-4xl font-bold flex items-center justify-center'
        }
        placeholder='John Doe'
        onChange={updateName}
        value={name}
      >
        {name}
      </ContentEditable>
      <div
        onClick={() => {
          setShowContactEditModal(true)
        }}
      >
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
