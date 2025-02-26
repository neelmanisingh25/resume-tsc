import { v4 as uuid } from 'uuid'
import { Field, SectionConfig } from '@/types/section.ts'
import { StateCreator } from 'zustand/vanilla'
import { StoreState } from '@/store/rootStore.ts'

interface Position {
  id: string
  [key: string]: any
}

interface SectionItem {
  id: string
  [key: string]: any
}

// interface Section {
//   title: string
//   data: SectionItem[]
// }

export const createEmptyPosition = (positionFields: Field[]): Position => ({
  id: uuid(),
  ...positionFields.reduce(
    (acc, field) => ({
      ...acc,
      [field.name]: field.defaultValue || ''
    }),
    {}
  )
})

export const createSectionSlice = (
  sectionKey: string,
  config: SectionConfig
): StateCreator<
  StoreState,
  [['zustand/immer', never], ['zustand/devtools', never]],
  [],
  any
> => {
  // create initial state based on config
  const createEmptyType = () => {
    const baseFields = config.fields.filter(
      (field) => field.type !== 'arrayFields'
    )
    const arrayFields = config.fields.filter(
      (field) => field.type === 'arrayFields' && field?.arrayFields
    )

    const base: { id: string; [key: string]: any } = {
      id: uuid(),
      ...baseFields.reduce(
        (acc, field) => ({
          ...acc,
          [field.name]: field.defaultValue || ''
        }),
        {}
      )
    }

    if (arrayFields) {
      arrayFields.map(
        (af) => (base[af.name] = [createEmptyPosition(af.arrayFields || [])])
      )
    }

    return base
  }

  const initialState = {
    [sectionKey]: {
      title: config.name,
      data: [createEmptyType()]
    }
  }

  return (set) => ({
    ...initialState,
    [`update${sectionKey}Title`]: (title: string) =>
      set(
        (state) => {
          state[sectionKey].title = title
        },
        undefined,
        `resume:${sectionKey}/updateTitle`
      ),
    [`update${sectionKey}Data`]: (id: string, value: Partial<any>) =>
      set(
        (state) => {
          const findIndex = state[sectionKey].data?.findIndex(
            (item: any) => item.id === id
          )
          if (findIndex !== -1) {
            Object.assign(state[sectionKey].data[findIndex], value)
          }
        },
        undefined,
        `resume:${sectionKey}/updateData`
      ),
    [`addNew${sectionKey}`]: (index: number) =>
      set(
        (state) => {
          state[sectionKey].data.splice(index, 0, createEmptyType())
        },
        undefined,
        `resume:${sectionKey}/addNew`
      ),
    [`delete${sectionKey}`]: (id: string) =>
      set(
        (state) => {
          state[sectionKey].data = state[sectionKey].data.filter(
            (item: any) => item.id !== id
          )
        },
        undefined,
        `resume:${sectionKey}/delete`
      ),
    [`reorder${sectionKey}Items`]: (newItems: SectionItem[]) =>
      set(
        (state) => {
          state[sectionKey].data = newItems
        },
        undefined,
        `resume:${sectionKey}/reorder`
      ),
    [`addNew${sectionKey}Positions`]: (id: string, index: number) =>
      set(
        (state) => {
          const company = state[sectionKey].data.find(
            (item: SectionItem) => item.id === id
          )
          if (company) {
            const arrayFields = config.fields.find(
              (field) => field.type === 'arrayFields' && field.arrayFields
            )
            if (arrayFields) {
              company.positions.splice(
                index,
                0,
                createEmptyPosition(arrayFields?.arrayFields || [])
              )
            }
          }
        },
        undefined,
        `resume:${sectionKey}/addNewPosition`
      ),
    [`reset${sectionKey}`]: (sectionKey: string) =>
      set(
        (state) => {
          state[sectionKey] = {
            title: config.name,
            data: [createEmptyType()]
          }
        },
        undefined,
        `reset:${sectionKey}`
      )
    // [`update${sectionKey}Position`]: (
    //   id: string,
    //   positionId: string,
    //   value: Partial<any>
    // ) =>
    //   set(
    //     (state) => {
    //       const company = state[sectionKey].data.find((item) => item.id === id)
    //       if (company) {
    //         const position = company.positions.find(
    //           (pos) => pos.id === positionId
    //         )
    //         if (position) {
    //           Object.assign(position, value)
    //         }
    //       }
    //     },
    //     undefined,
    //     `resume:${sectionKey}/updatePosition`
    //   )
  })
}
