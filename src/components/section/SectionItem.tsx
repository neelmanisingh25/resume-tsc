import { SectionConfig } from '@/types/section.ts'
import { useResumeStore } from '@/store/rootStore.ts'
import React, { useCallback } from 'react'
import ContentEditable from '@/helper/contentEditable.tsx'
import { contentEditableClasses } from '@/constants/constants.ts'
import { flexGrowFields } from '@/constants/constants.ts'
import SectionItemArray from '@/components/section/SectionItemArray.tsx'
import AddNewField from '@/components/util/AddNewField.tsx'
import SelectStartEndDate from '@/components/util/SelectStartEndDate.tsx'

interface SectionItemProps {
  item: any
  index: number
  sectionKey: string
  config: SectionConfig
  isActive: boolean
  setActiveItem: (id: string) => void
  ref: React.RefObject<Record<string, HTMLDivElement | null>>
}

function SectionItem({
  item,
  index,
  sectionKey,
  config,
  isActive,
  setActiveItem,
  ref: itemRef
}: SectionItemProps) {
  const updateData = useResumeStore((state) => state[`update${sectionKey}Data`])
  const addNewData = useResumeStore((state) => state[`addNew${sectionKey}`])
  const addNewPositions = useResumeStore(
    (state) => state[`addNew${sectionKey}Positions`]
  )
  const deleteData = useResumeStore((state) => state[`delete${sectionKey}`])

  const createChangeHandler = useCallback(
    (field: string) => (value: string) =>
      updateData(item.id, { [field]: value }),
    [updateData, item.id]
  )

  const updatePosition = (id: string, positionId: string, value: any) => {
    updateData(id, {
      positions: item.positions.map(
        (pos: { id: string; [key: string]: any }) =>
          pos.id === positionId ? { ...pos, ...value } : pos
      )
    })
  }

  const checkForEmptyState = () => {
    const sectionData = useResumeStore.getState()[sectionKey].data
    // TODO: this can be done in better way using, required  fields
    return sectionData.findIndex((sd: any) => sd[config.fields[0].name] === '')
  }

  const handleAddNewItem = () => {
    const emptyIndex = checkForEmptyState()
    if (emptyIndex === -1) {
      console.log('addNewItem')
      addNewData(index + 1)
      focusNewItem(index + 1)
    } else {
      focusNewItem(emptyIndex)
    }
  }

  const handleDeleteItem = () => {
    deleteData(item.id)
  }

  const handleAddNewPosition = (index: number) => {
    addNewPositions(item.id, index + 1)
  }

  const handleDeletePosition = (positionId: string) => {
    const newPositions = item.positions.filter(
      (pos: { id: string; [key: string]: any }) => pos.id !== positionId
    )
    if (newPositions.length === 0) {
      window.alert(
        'You cannot delete the only position, consider deleting the company instead.'
      )
      return
    }
    updateData(item.id, {
      positions: item.positions.filter(
        (pos: { id: string; [key: string]: any }) => pos.id !== positionId
      )
    })
  }

  const focusNewItem = (index: number) => {
    // setTimeout(() => {
    //
    // }, 10)
    // queueMicrotask(() => {
    //
    // })
    // TODO: do this in better way, maybe move update data to parent or initialise ref in this particular element
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const sectionData = useResumeStore.getState()[sectionKey].data
        const id = sectionData[index].id
        setActiveItem(id)
        const divElement = itemRef.current[id]
        if (!divElement) return

        // TODO: make this also better based on the required fields and not just the first field
        const firstField = config.fields[0].name
        const fieldDiv = divElement.querySelector(
          `[data-name="${firstField}"]`
        ) as HTMLDivElement
        if (fieldDiv) {
          fieldDiv.focus()
        }
      })
    })
  }

  const renderRow = (fieldNames: string[]) => {
    const fields = fieldNames
      .map((name) => config.fields.find((f) => f.name === name))
      .filter(Boolean)

    if (fields[0]?.type === 'arrayFields' && fields[0]?.arrayFields) {
      const positionFields = fields[0]
      return (
        <div key={fieldNames.join('-')}>
          {item[positionFields.name].map((position: any, index: number) => (
            <div className='mt-2' key={position.id}>
              <div className='flex text-left gap-x-10 justify-between'>
                <ContentEditable
                  key={`position-${position.id}`}
                  className={`${contentEditableClasses}`}
                  placeholder={
                    positionFields.arrayFields?.find(
                      (f) => f.name === 'position'
                    )?.placeholder || ''
                  }
                  onChange={(value) =>
                    updatePosition(item.id, position.id, {
                      position: value
                    })
                  }
                  isActive={isActive}
                >
                  {position.position}
                </ContentEditable>
                <SelectStartEndDate
                  onChange={(value: string, dateType = 'beginMonthYear') =>
                    updatePosition(item.id, position.id, {
                      [dateType]: value
                    })
                  }
                  isActive={isActive}
                  position={position}
                  positionFields={positionFields}
                />
              </div>
              {positionFields.arrayFields?.map((field) => {
                if (field.type === 'array') {
                  return (
                    <SectionItemArray
                      key={field.name}
                      workExperienceId={item.id}
                      positionId={position.id}
                      isActive={isActive}
                      value={position[field.name]}
                      placeholder={field.placeholder || ''}
                      sectionKey={sectionKey}
                      fieldName={field.name}
                      item={item}
                    />
                  )
                }
                return null
              })}
              <AddNewField
                handleAddNewField={() => handleAddNewPosition(index)}
                handleDeleteItem={() => handleDeletePosition(position.id)}
                addArrayField={false}
                addTooltip='Add Title/Position'
                deleteTooltip='Delete Position'
              />
            </div>
          ))}
        </div>
      )
    }

    if (
      fieldNames.includes('beginMonthYear') &&
      fieldNames.includes('endMonthYear')
    ) {
      return (
        <div
          className='flex text-left gap-x-10 justify-between'
          key={fieldNames.join('-')}
        >
          <ContentEditable
            className={`${contentEditableClasses} ${flexGrowFields.includes(fieldNames[0]) ? 'font-semibold' : ''}`}
            placeholder={fields[0]?.placeholder || ''}
            onChange={createChangeHandler(fields[0]?.name as string)}
            isActive={isActive}
            defaultValue={fields[0]?.defaultValue as string}
          >
            {item[fieldNames[0]]}
          </ContentEditable>
          <SelectStartEndDate
            onChange={(value: string, dateType = 'beginMonthYear') =>
              updateData(item.id, {
                [dateType]: value
              })
            }
            isActive={isActive}
            startDate={item[fieldNames[1]]}
            endDate={item[fieldNames[2]]}
          />
        </div>
      )
    }

    if (fields[0]?.type === 'array') {
      return (
        <div key={fieldNames.join('-')}>
          <SectionItemArray
            workExperienceId={item.id}
            isActive={isActive}
            value={item[fieldNames[0]]}
            placeholder={fields[0]?.placeholder || ''}
            sectionKey={sectionKey}
            fieldName={fieldNames[0]}
          />
        </div>
      )
    }
    return (
      <div
        className='flex text-left gap-x-10 justify-between'
        key={fieldNames.join('-')}
      >
        {fields.length >= 3 ? (
          <>
            <div className='flex gap-x-4'>
              {fields.slice(0, 2).map(
                (field) =>
                  field && (
                    <div
                      key={`${field.name}-${item.id}`}
                      className={`${flexGrowFields.includes(field.name) ? 'font-semibold' : ''}`}
                    >
                      <div className='flex'>
                        <span className='pr-1'>
                          {field?.displayName && item[field.name]
                            ? `${field.displayName} : `
                            : ''}
                        </span>
                        <ContentEditable
                          className={`${contentEditableClasses}`}
                          placeholder={field.placeholder || ''}
                          onChange={createChangeHandler(field.name)}
                          isActive={isActive}
                          defaultValue={field.defaultValue as string}
                          dataField={
                            flexGrowFields.includes(field.name)
                              ? field?.name
                              : ''
                          }
                        >
                          {item[field.name]}
                        </ContentEditable>
                      </div>
                    </div>
                  )
              )}
            </div>
            <div>
              <div className='flex pr-1 italic'>
                {fields[2]?.displayName && item[fields[2].name]
                  ? `${fields[2]?.displayName} :`
                  : ''}
                <div className='pl-1 italic'>
                  <SelectStartEndDate
                    onChange={createChangeHandler(fields[2]?.name as string)}
                    isActive={isActive}
                    isGraduationDate
                    graduationDate={item[fieldNames[2]]}
                  />
                </div>
              </div>
            </div>
          </>
        ) : (
          fields.map(
            (field) =>
              field && (
                <div
                  key={`${field.name}-${item.id}`}
                  className={`${flexGrowFields.includes(field?.name) ? 'font-semibold' : ''}`}
                >
                  <ContentEditable
                    className={`${contentEditableClasses}`}
                    placeholder={field.placeholder || ''}
                    onChange={createChangeHandler(field.name)}
                    isActive={isActive}
                    defaultValue={field.defaultValue as string}
                    dataField={
                      flexGrowFields.includes(field.name) ? field?.name : ''
                    }
                  >
                    {item[field.name]}
                  </ContentEditable>
                </div>
              )
          )
        )}
      </div>
    )
  }

  return (
    <div className='flex-grow'>
      <div className='flex-grow text-left'>
        <div>
          {/*{config.fields.map((field) => renderField(field))}*/}
          {config.rows.map((row) => renderRow(row))}
        </div>
      </div>
      <AddNewField
        handleAddNewField={handleAddNewItem}
        handleDeleteItem={handleDeleteItem}
        addArrayField
        addTooltip='Add Company'
        deleteTooltip='Delete Company'
      />
    </div>
  )
}
export default SectionItem

// ${!isActive && item[field.name] === '' && !flexGrowFields.includes(field.name) ? '' : ''}
