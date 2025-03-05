import React, { useEffect, useRef, useState } from 'react'

interface MonthYearPickerProps {
  onChange: (value: string) => void
  onClose: () => void
  endDate?: boolean
  inputRef?: React.RefObject<HTMLElement | null>
}

function MonthYearPicker(props: MonthYearPickerProps) {
  const { onChange, onClose, endDate = false, inputRef } = props

  const pickerRef = useRef<HTMLDivElement | null>(null)
  const currentYear = new Date().getFullYear()
  const [selectedYear, setSelectedYear] = useState(currentYear)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(event.target as Node) &&
        inputRef &&
        !inputRef.current?.contains(event.target as Node)
      ) {
        onClose()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [onClose, inputRef])

  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ]

  const handlePrevYear = () => {
    setSelectedYear((prev) => prev - 1)
  }

  const handleNextYear = () => {
    setSelectedYear((prev) => prev + 1)
  }

  const handleMonthSelect = (month: string) => {
    const value = month === 'Present' ? 'Present' : `${month} ${selectedYear}`
    onChange(value)
    onClose()
  }

  return (
    <div
      className='absolute z-50 bg-white border border-gray-200 rounded-lg shadow-lg p-4 mt-6 right-0'
      ref={pickerRef}
    >
      <div className='flex justify-between items-center mb-4'>
        <button
          onClick={handlePrevYear}
          className='text-gray-600 hover:text-gray-800'
        >
          ←
        </button>
        <span className='text-lg font-semibold'>{selectedYear}</span>
        <button
          onClick={handleNextYear}
          className='text-gray-600 hover:text-gray-800'
        >
          →
        </button>
      </div>

      <div className='w-[280px]'>
        {' '}
        {/* Fixed width container */}
        <div className='grid grid-cols-4 gap-2'>
          {months.map((month) => (
            <button
              key={month}
              onClick={() => handleMonthSelect(month)}
              className='p-2 text-center hover:bg-gray-100 rounded text-sm'
            >
              {month}
            </button>
          ))}
        </div>
        {endDate && (
          <button
            onClick={() => handleMonthSelect('Present')}
            className='w-full mt-2 p-2 text-center hover:bg-gray-100 rounded text-sm'
          >
            Present
          </button>
        )}
      </div>
    </div>
  )
}

export default MonthYearPicker
