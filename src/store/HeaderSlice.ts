import { StateCreator } from 'zustand/vanilla'
import { StoreState } from '@/store/rootStore.ts'
export interface Contact {
  mobile?: string
  email?: string
  linkedIn?: string
  location?: string
  github?: string
  portfolio?: string
}

export interface HeaderSlice {
  name: string
  contact: Contact
  addContactInfo: (key: keyof Contact, value: string) => void
  updateAllContactInfo: (contact: Contact) => void
  updateName: (name: string) => void
}

export const createHeaderSlice: StateCreator<
  StoreState,
  [['zustand/immer', never], ['zustand/devtools', never]],
  [],
  HeaderSlice
> = (set) => ({
  name: 'Neelmani Singh',
  contact: {
    mobile: '+91-9511110626',
    email: 'hello@neelmani.in',
    linkedIn: 'https://www.linkedin.com/in/neelmani-singh98',
    location: 'Bengaluru, Karnataka',
    github: 'https://github.com/neelmanisingh25',
    portfolio: 'https://neelmani.in'
  },
  addContactInfo: (key: keyof Contact, value: string) =>
    set(
      (state) => {
        state.contact[key] = value
      },
      undefined,
      'resume:Contact/addContactInfo'
    ),
  updateAllContactInfo: (contact: Contact) =>
    set(
      (state) => {
        state.contact = contact
      },
      undefined,
      'resume:Contact/updateAllContactInfo'
    ),
  updateName: (name: string) =>
    set(
      (state) => {
        state.name = name
      },
      undefined,
      'resume:Contact/updateName'
    )
})
