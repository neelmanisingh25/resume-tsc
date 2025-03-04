import { v4 as uuid } from 'uuid'

export const defaultResumeData = {
  name: 'Neelmani Singh',
  contact: {
    mobile: '+91-9511110626',
    email: 'hello@neelmani.in',
    linkedIn: 'https://www.linkedin.com/in/neelmani-singh98',
    location: 'Bengaluru, Karnataka',
    github: 'https://github.com/neelmani-singh98'
  },
  workExperience: {
    title: 'Work Experience',
    data: [
      {
        id: uuid(),
        companyName: 'Upland Software',
        location: 'Bengaluru, India',
        positions: [
          {
            id: uuid(),
            position: 'Software Engineer II',
            beginMonthYear: 'Sep 2024',
            endMonthYear: 'Present',
            positions: ['achivements1', 'achivements2', 'achivements3']
          }
        ]
      }
    ]
  },
  projects: {
    title: 'Projects',
    data: [
      {
        id: uuid(),
        projectName: 'Resume Maker',
        description: [
          'Resume Maker is a web application that allows users to create and customize their resumes' +
            ' with ease. It provides a user-friendly interface and a wide range of customizable templates to choose' +
            ' from. Users can easily add their personal information, work experience, education, skills, and more to create a professional and visually appealing resume.'
        ],
        url: 'https://resume.neelmani.in',
        beginMonthYear: 'Feb 2025',
        endMonthYear: 'Mar 2025'
      }
    ]
  },
  education: {
    title: 'Education',
    data: [
      {
        id: uuid(),
        studyProgram: 'Bachelor of Technology',
        institution: 'Lovely Professional University',
        graduationDate: 'Jun 2021',
        location: 'Phagwara, Punjab',
        cgpa: '7.53'
      }
    ]
  }
}
