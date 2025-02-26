import ContentEditable from '@/helper/contentEditable.tsx'
import { SectionConfig } from '@/types/section.ts'
import { useResumeStore } from '@/store/rootStore.ts'
import { EditModeContext } from '@/contexts/context.ts'
import { useContext } from 'react'

interface SectionTitleProps {
  sectionKey: string
  config?: SectionConfig
}

function SectionTitle(props: SectionTitleProps) {
  const { sectionKey, config } = props

  const title = useResumeStore((state) => state[sectionKey]?.title)
  const updateTitle = useResumeStore(
    (state) => state[`update${sectionKey}Title`]
  )
  const updateSkillTitle = useResumeStore((state) => state.updateSkillTitle)
  const { isEditMode } = useContext(EditModeContext)

  return (
    <ContentEditable
      className={
        isEditMode
          ? 'text-xl font-bold text-left border-b-2 border-transparent border-dashed' +
            ' focus:outline-none focus:border-blue-500'
          : 'text-xl font-bold text-left'
      }
      placeholder={
        sectionKey === 'skills' ? 'Skills' : config?.name || 'Placeholder'
      }
      defaultValue={sectionKey === 'skills' ? 'Skills' : config?.name}
      onChange={sectionKey === 'skills' ? updateSkillTitle : updateTitle}
    >
      {title}
    </ContentEditable>
  )
}

export default SectionTitle
