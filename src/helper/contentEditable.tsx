import React, { useRef } from 'react'
import { showPlaceholderClasses } from '@/constants/constants.ts'

interface Props {
  children: React.ReactNode
  className: string
  preventEnterPress?: boolean
  placeholder: string
  onChange: (value: string) => void
  defaultValue?: string
  isActive: boolean
  onfocus?: () => void
  onblur?: () => void
  onEnterKey?: () => void
  addNewAchievement?: boolean
  deleteAchievement?: boolean
  onDeleteField?: () => void
  addNewSkill?: boolean
}

function ContentEditable({
  children,
  className,
  preventEnterPress = true,
  placeholder,
  onChange,
  defaultValue,
  isActive,
  onfocus,
  onblur,
  onEnterKey,
  addNewAchievement,
  deleteAchievement,
  onDeleteField,
  addNewSkill
}: Props) {
  const contentEditableDivRef = useRef<HTMLDivElement>(null)

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter' && e.key !== 'Backspace') return
    if (e.key === 'Enter' && preventEnterPress) {
      e.preventDefault()
    }
    if (e.key === 'Enter' && (addNewAchievement || addNewSkill)) {
      e.preventDefault()
      const currentText = contentEditableDivRef.current?.textContent
      if (currentText !== '') {
        onChange?.(currentText)
        onEnterKey?.()
      }
    }
    if (e.key === 'Backspace' && deleteAchievement) {
      const currentText = contentEditableDivRef.current?.textContent
      if (currentText === '') onDeleteField?.()
    }
  }

  const handleInput = (isTriggeredByOnInput: boolean) => {
    if (!contentEditableDivRef.current) return
    const value = contentEditableDivRef.current.textContent || ''
    if (value === '') contentEditableDivRef.current.textContent = ''
    if (value !== '' && isTriggeredByOnInput) return
    if (value === '' && defaultValue && !isTriggeredByOnInput) {
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
    event.stopPropagation()
    if (contentEditableDivRef.current && defaultValue) {
      const value = contentEditableDivRef.current.textContent
      if (value === defaultValue) {
        onChange?.('')
      }
    }
    onfocus?.()
  }

  return (
    <div
      ref={contentEditableDivRef}
      contentEditable
      suppressContentEditableWarning
      tabIndex={0}
      onKeyDown={handleKeyPress}
      className={`
        ${className || ''}
        ${placeholder && isActive ? `${showPlaceholderClasses}` : ''}
      `}
      data-placeholder={placeholder}
      onInput={() => handleInput(true)}
      onBlur={handleBlur}
      onFocus={handleFocus}
    >
      {children}
    </div>
  )
}

export default ContentEditable
