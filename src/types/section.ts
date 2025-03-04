export interface BaseField {
  id: string
  value: string
}

export interface BaseSection {
  id: string
  title: string
  fields: Record<string, string | string[]>
}

export interface Section {
  title: string
  data: Array<{
    id: string
    [key: string]: any
  }>
}

export interface Field {
  name: string
  type: 'text' | 'array' | 'url' | 'arrayFields' | 'date'
  placeholder?: string
  required?: boolean
  defaultValue?: string | string[]
  arrayFields?: Field[]
  displayName?: string
  deleteIcon?: boolean
  value?: string
}

export interface SectionConfig {
  name: string
  fields: Field[]
  rows: string[][]
}

export const SECTION_CONFIGS: Record<string, SectionConfig> = {
  workExperience: {
    name: 'Work Experience',
    fields: [
      {
        name: 'companyName',
        type: 'text',
        placeholder: 'Company Name',
        required: true,
        deleteIcon: true
        // defaultValue: 'Upland Software'
      },
      {
        name: 'location',
        type: 'text',
        placeholder: 'Location'
        // defaultValue: 'Bengaluru, India'
      },
      {
        name: 'positions',
        type: 'arrayFields',
        required: true,
        arrayFields: [
          {
            name: 'position',
            type: 'text',
            placeholder: 'Title/Position',
            required: true,
            deleteIcon: true
            // defaultValue: 'Software Engineer II'
          },
          {
            name: 'beginMonthYear',
            type: 'text',
            placeholder: 'Start Date'
            // defaultValue: 'Sep 2024'
          },
          {
            name: 'endMonthYear',
            type: 'text',
            placeholder: 'Finish Date'
            // defaultValue: 'Present'
          },
          {
            name: 'achievements',
            type: 'array',
            placeholder: 'Task/Responsibility/Accomplishments',
            defaultValue: ['']
          }
        ]
        // defaultValue: 'Title/Position'
      }
    ],
    rows: [['companyName', 'location'], ['positions']]
  },
  projects: {
    name: 'Projects',
    fields: [
      {
        name: 'projectName',
        type: 'text',
        placeholder: 'Project Name',
        // defaultValue: 'Project Name',
        required: true,
        deleteIcon: true
      },
      { name: 'beginMonthYear', type: 'date', placeholder: 'Month YYYY' },
      {
        name: 'endMonthYear',
        type: 'date',
        placeholder: 'Present'
      },
      {
        name: 'description',
        type: 'array',
        placeholder: 'Description',
        defaultValue: ['']
      },
      {
        name: 'url',
        displayName: 'Project URL',
        placeholder: 'Project URL',
        type: 'url'
      }
    ],
    rows: [
      ['projectName', 'beginMonthYear', 'endMonthYear'],
      ['url'],
      ['description']
    ]
  },
  education: {
    name: 'Education',
    fields: [
      {
        name: 'studyProgram',
        type: 'text',
        placeholder: 'Study Program',
        // defaultValue: 'Bachelor of Technology',
        required: true,
        deleteIcon: true
      },
      {
        name: 'graduationDate',
        type: 'date',
        placeholder: 'Graduation Date',
        displayName: 'Graduation Date'
        // defaultValue: 'Jun 2021'
      },
      // {
      //   name: 'endMonthYear',
      //   type: 'text',
      //   placeholder: 'Present'
      // },
      {
        name: 'institution',
        placeholder: 'Institution/Place of Education',
        // defaultValue: 'Lovely Professional University',
        required: true,
        type: 'text'
      },
      {
        name: 'CGPA',
        displayName: 'CGPA/Percentage',
        placeholder: 'CGPA/Percentage, (Optional)',
        type: 'text'
        // defaultValue: '7.53'
      },
      {
        name: 'location',
        placeholder: 'Location',
        type: 'text'
        // defaultValue: 'Phagwara, Punjab'
      }
    ],
    rows: [
      ['institution', 'location'],
      ['studyProgram', 'CGPA', 'graduationDate']
    ]
  },
  volunteerExperience: {
    name: 'Volunteer Experience',
    fields: [
      {
        name: 'organizationName',
        type: 'text',
        placeholder: 'Organization Name',
        required: true,
        deleteIcon: true
        // defaultValue: 'Organization Name'
      },
      {
        name: 'location',
        type: 'text',
        placeholder: 'Location'
      },
      {
        name: 'positions',
        type: 'arrayFields',
        required: true,
        arrayFields: [
          {
            name: 'position',
            type: 'text',
            placeholder: 'Roles/Responsibilities',
            required: true,
            deleteIcon: true
          },
          {
            name: 'beginMonthYear',
            type: 'text',
            placeholder: 'Start Date'
          },
          {
            name: 'endMonthYear',
            type: 'text',
            placeholder: 'Finish Date'
          },
          {
            name: 'responsibility',
            type: 'array',
            placeholder: 'Task/Responsibility/Accomplishments',
            defaultValue: ['']
          }
        ]
        // defaultValue: 'Title/Position'
      }
    ],
    rows: [['organizationName', 'location'], ['positions']]
  },
  certificates: {
    name: 'Certificates',
    fields: [
      {
        name: 'certificateName',
        type: 'text',
        placeholder: 'Certificate Name',
        // defaultValue: 'Certificate Name',
        required: true,
        deleteIcon: true
      },
      {
        name: 'beginMonthYear',
        type: 'text',
        placeholder: 'Month YYYY'
      },
      {
        name: 'endMonthYear',
        type: 'text',
        placeholder: 'Present'
      },
      {
        name: 'certificateLink',
        type: 'url',
        placeholder: 'Certificate URL',
        displayName: 'Certificate URL'
      }
    ],
    rows: [
      // ['certificateName', 'beginMonthYear', 'endMonthYear'],
      ['certificateName', 'certificateLink']
    ]
  }
}

// {
//   name: 'companyName',
//     type: 'text',
//   placeholder: 'Company Name',
//   required: true
//   // defaultValue: 'Company Name'
// },
// {
//   name: 'location',
//     type: 'text',
//   placeholder: 'Location'
// },
// {
//   name: 'beginMonthYear',
//     type: 'text',
//   placeholder: 'Month YYYY'
// },
// {
//   name: 'endMonthYear',
//     type: 'text',
//   placeholder: 'Present'
// },
// {
//   name: 'achievements',
//     type: 'array',
//   placeholder: 'Task/Responsibility/Accomplishments',
//   defaultValue: ['']
// }
