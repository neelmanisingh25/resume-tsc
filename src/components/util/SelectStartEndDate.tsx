import ContentEditable from '@/helper/contentEditable.tsx'
import { contentEditableClasses } from '@/constants/constants.ts'
import { PreviewModeContext } from '@/contexts/context.ts'
import { useContext } from 'react'

interface SelectDateProps {
  position?: any
  positionFields?: any
  onChange: (value: string, dateType?: string) => void
  isActive: boolean
  placeholder?: string
  startDate?: string
  endDate?: string
  isGraduationDate?: boolean
  graduationDate?: string
}

function SelectStartEndDate(props: SelectDateProps) {
  const {
    position,
    isActive,
    startDate,
    endDate,
    onChange,
    isGraduationDate,
    graduationDate
  } = props
  // const getPlaceHolder = (dateType: string, fields = positionFields): string =>
  //   fields.arrayFields?.find((f) => f.name === dateType)?.placeholder || ''
  const { isPreviewMode } = useContext(PreviewModeContext)

  const startFinishDate = (
    <>
      <ContentEditable
        className={`${contentEditableClasses} flex-none italic`}
        // placeholder={
        //   placeholder ? placeholder : getPlaceHolder('beginMonthYear')
        // }
        placeholder='Start Date'
        onChange={(value) => onChange(value, 'beginMonthYear')}
        isActive={isActive}
        isDatePicker
        value={position ? position.beginMonthYear : startDate}
      >
        {position ? position.beginMonthYear : startDate}
      </ContentEditable>
      <div
        className={`mx-1 ${isPreviewMode && (!(position?.beginMonthYear || startDate) || !(position?.endMonthYear || endDate)) ? 'hidden' : ''}`}
      >
        -
      </div>
      <ContentEditable
        className={`${contentEditableClasses} flex-none italic`}
        // placeholder={placeholder ? placeholder : getPlaceHolder('endMonthYear')}
        placeholder='Finish Date'
        onChange={(value) => onChange(value, 'endMonthYear')}
        isActive={isActive}
        endDate
        isDatePicker
        value={position ? position.endMonthYear : endDate}
      >
        {position ? position.endMonthYear : endDate}
      </ContentEditable>
    </>
  )

  const graduationDateView = (
    <ContentEditable
      className={`${contentEditableClasses} flex-none italic`}
      placeholder='Graduation Date'
      onChange={onChange}
      isActive={isActive}
      isDatePicker
    >
      {graduationDate}
    </ContentEditable>
  )

  return (
    <div className='flex'>
      {isGraduationDate ? graduationDateView : startFinishDate}
    </div>
  )
}

export default SelectStartEndDate
