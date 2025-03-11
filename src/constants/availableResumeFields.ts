import { SECTION_CONFIGS } from '@/types/section.ts'

export const availableResumeFields = [
  {
    sectionKey: 'workExperience',
    config: SECTION_CONFIGS.workExperience
  },
  {
    sectionKey: 'skills'
  },
  {
    sectionKey: 'projects',
    config: SECTION_CONFIGS.projects
  },
  {
    sectionKey: 'education',
    config: SECTION_CONFIGS.education
  },
  {
    sectionKey: 'volunteerExperience',
    config: SECTION_CONFIGS.volunteerExperience
  },
  {
    sectionKey: 'certificates',
    config: SECTION_CONFIGS.certificates
  }
]
