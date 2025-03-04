import React, { useContext, useRef, useState } from 'react'
import { showPlaceholderClasses } from '@/constants/constants.ts'
import MonthYearPicker from '@/components/util/MonthYearPicker.tsx'
import { EditModeContext, PreviewModeContext } from '@/contexts/context.ts'

interface Props {
  children: React.ReactNode
  className: string
  preventEnterPress?: boolean
  placeholder: string
  onChange: (value: string) => void
  defaultValue?: string
  isActive?: boolean
  onfocus?: () => void
  onblur?: () => void
  onEnterKey?: () => void
  addNewAchievement?: boolean
  deleteAchievement?: boolean
  onDeleteField?: () => void
  addNewSkill?: boolean
  dataField?: string
  isDatePicker?: boolean
  endDate?: boolean
  useHtml?: boolean
  value?: string
}

function ContentEditable({
  children,
  className,
  preventEnterPress = true,
  placeholder,
  onChange,
  defaultValue,
  // isActive,
  onfocus,
  onblur,
  onEnterKey,
  addNewAchievement,
  deleteAchievement,
  onDeleteField,
  addNewSkill,
  dataField,
  isDatePicker = false,
  endDate = false,
  useHtml = false,
  value
}: Props) {
  const contentEditableDivRef = useRef<HTMLDivElement>(null)
  const [showDatePicker, setShowDatePicker] = useState(false)
  const { isEditMode } = useContext(EditModeContext)
  const { isPreviewMode } = useContext(PreviewModeContext)

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter' && e.key !== 'Backspace') return
    if (e.key === 'Enter' && preventEnterPress) {
      e.preventDefault()
    }
    if (e.key === 'Enter' && (addNewAchievement || addNewSkill)) {
      e.preventDefault()
      const currentText = contentEditableDivRef.current?.textContent
      if (currentText !== '') {
        onChange?.(currentText || '')
        onEnterKey?.()
      }
    }
    if (e.key === 'Backspace' && deleteAchievement) {
      const currentText = contentEditableDivRef.current?.textContent
      if (currentText === '') onDeleteField?.()
    }
  }

  const getContent = () => {
    if (!contentEditableDivRef.current) return ''
    return useHtml
      ? contentEditableDivRef.current.innerHTML
      : contentEditableDivRef.current.textContent || ''
  }

  const handleInput = (isTriggeredByOnInput: boolean) => {
    if (!contentEditableDivRef.current) return
    const value = getContent()
    // const value = contentEditableDivRef.current.textContent || ''
    if (value === '') contentEditableDivRef.current.textContent = ''
    if (value !== '' && isTriggeredByOnInput) return
    if (value === '' && defaultValue && !isTriggeredByOnInput && isEditMode) {
      onChange?.(defaultValue)
      return
    }
    onChange?.(value)
  }

  const handleBlur = (event: React.FocusEvent) => {
    event.stopPropagation()
    event.preventDefault()
    handleInput(false)
    onblur?.()
  }

  const handleFocus = (event: React.FocusEvent) => {
    // if (!isActive) {
    //   event.preventDefault()
    //   contentEditableDivRef.current?.blur()
    //   return
    // }

    // TODO: mark the element even when focused through tab key

    if (isDatePicker) {
      event.preventDefault()
      setShowDatePicker(true)
      return
    }

    event.stopPropagation()
    if (contentEditableDivRef.current && defaultValue) {
      const value = contentEditableDivRef.current.textContent
      if (value === defaultValue && isEditMode) {
        onChange?.('')
      }
    }
    onfocus?.()
  }

  const handleDateSelect = (value: string) => {
    onChange(value)
    setShowDatePicker(false)
  }

  return (
    <>
      <div
        ref={contentEditableDivRef}
        contentEditable={!isDatePicker && isEditMode}
        suppressContentEditableWarning
        tabIndex={0}
        onKeyDown={handleKeyPress}
        className={`
        ${className || ''}
        ${placeholder ? `${showPlaceholderClasses}` : ''}
        ${isDatePicker ? 'cursor-pointer' : ''}
        ${isPreviewMode && !value ? 'hidden' : ''}
      `}
        data-placeholder={placeholder}
        onInput={() => handleInput(true)}
        onBlur={handleBlur}
        onFocus={handleFocus}
        data-name={dataField}
      >
        {/*{useHtml ? (*/}
        {/*  <div dangerouslySetInnerHTML={{ __html: children as string }} />*/}
        {/*) : (*/}
        {/*  children*/}
        {/*)}*/}
        {value ? value : children}
      </div>
      {isDatePicker && showDatePicker && isEditMode && (
        <MonthYearPicker
          onChange={handleDateSelect}
          onClose={() => setShowDatePicker(false)}
          endDate={endDate}
        />
      )}
    </>
  )
}

export default ContentEditable
