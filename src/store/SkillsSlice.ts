import { v4 as uuid } from 'uuid'
import { StateCreator } from 'zustand'
import { WorkExperienceSlice } from './WorkExperienceSlice'
import { HeaderSlice } from './HeaderSlice'

export interface Skill {
  id: string
  name: string
  value: {
    id: string
    data: string
  }[]
}

interface SkillsState {
  skills: {
    title: string
    data: Skill[]
  }
}

export interface SkillsSlice extends SkillsState {
  updateSkillTitle: (title: string) => void
  updateSkillGroupName: (id: string, value: string) => void
  addNewSkill: (id: string, index: number) => void
  updateSkillValue: (id: string, index: number, value: string) => void
}

const initialState: SkillsState = {
  skills: {
    title: 'Skills',
    data: [
      {
        id: uuid(),
        name: 'Core Skills',
        value: [
          {
            id: uuid(),
            data: 'HTML'
          },
          {
            id: uuid(),
            data: 'CSS'
          }
        ]
      },
      {
        id: uuid(),
        name: 'New Acquired Skills',
        value: []
      }
    ]
  }
}

const findSkillIndex = (skills: Skill[], id: string) => {
  return skills.findIndex((data) => data.id === id)
}

export const findSkill = (skills: Skill[], id: string) => {
  return skills.find((data) => data.id === id)
}

const updateSkillState = (
  state: SkillsState,
  id: string,
  updater: (skill: Skill) => void
): void => {
  const skill = findSkill(state.skills.data, id)
  if (skill) {
    updater(skill)
  }
}

export const createSkillsSlice: StateCreator<
  SkillsSlice & WorkExperienceSlice & HeaderSlice,
  [['zustand/immer', never], ['zustand/devtools', never]],
  [],
  SkillsSlice
> = (set) => ({
  ...initialState,
  updateSkillTitle: (title: string) =>
    set(
      (state) => {
        state.skills.title = title
      },
      undefined,
      'resume:Skills/updateSkillTitle'
    ),
  updateSkillGroupName: (id: string, value: string) =>
    set(
      (state) => {
        updateSkillState(state, id, (skill) => {
          skill.name = value
        })
      },
      undefined,
      'resume:Skills/updateSkillGroupName'
    ),
  addNewSkill: (id: string, index: number) =>
    set(
      (state) => {
        updateSkillState(state, id, (skill) => {
          skill.value.splice(index, 0, { id: uuid(), data: '' })
        })
      },
      undefined,
      'resume:Skills/addNewSkill'
    ),
  updateSkillValue: (id: string, index: number, value: string) =>
    set(
      (state) => {
        updateSkillState(state, id, (skill) => {
          skill.value[index].data = value
        })
      },
      undefined,
      'resume:Skills/updateSkillValue'
    )
})
