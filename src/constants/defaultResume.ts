import { v4 as uuid } from 'uuid'

export const defaultResumeData = {
  name: 'Neelmani Singh',
  contact: {
    mobile: '+91-9999999999',
    email: 'hire@neelmani.in',
    linkedIn: 'https://www.linkedin.com/in/neelmani-singh98',
    location: 'Bengaluru, Karnataka',
    github: 'https://github.com/neelmanisingh25',
    portfolio: 'https://neelmani.in'
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
            achievements: ['achivements1', 'achivements2', 'achivements3']
          },
          {
            id: uuid(),
            position: 'Software Engineer I',
            beginMonthYear: 'July 2022',
            endMonthYear: 'Aug 2024',
            achievements: ['achivements1', 'achivements2', 'achivements3']
          }
        ]
      },
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
            achievements: ['achivements1', 'achivements2', 'achivements3']
          },
          {
            id: uuid(),
            position: 'Software Engineer I',
            beginMonthYear: 'July 2022',
            endMonthYear: 'Aug 2024',
            achievements: ['achivements1', 'achivements2', 'achivements3']
          }
        ]
      },
      {
        id: uuid(),
        companyName: 'Sinch',
        location: 'Noida, Uttar Pradesh',
        positions: [
          {
            id: uuid(),
            position: 'Software Engineer',
            beginMonthYear: 'July 2022',
            endMonthYear: 'Aug 2024',
            achievements: [
              'Analysed Traffic Analyser Platform built with React and Node in an end to end basis.',
              'Developed new features and solved bugs for Admin Zone platform to onboard new enterprise and add Sender ID for customer communications',
              'Developed a new feature to download the report in chunks to reduce the time taken to download the report by 90%'
            ]
          }
        ]
      },
      {
        id: uuid(),
        companyName: 'Cognizant',
        location: 'Kolkata, West Bengal',
        positions: [
          {
            id: uuid(),
            position: 'Programmer Analyst Trainee',
            beginMonthYear: 'Jul 2021',
            endMonthYear: 'Mar 2022',
            achievements: []
          }
        ]
      },
      {
        id: uuid(),
        companyName: 'Eclerx',
        location: 'Mumbai, Maharashtra',
        positions: [
          {
            id: uuid(),
            position: 'Intern',
            beginMonthYear: 'Sep 2020',
            endMonthYear: 'Jul 2021',
            achievements: [
              'Accomplished growth in client profit by 30% in quarter 2 of 2021',
              'Presented with Client(Director) appreciation twice in a month',
              'Received Best Quality Work Performer award recognition',
              'Mentored and trained 2 new joiners'
            ]
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
        CGPA: '7.53'
      }
    ]
  },
  skills: {
    title: 'Skills',
    data: [
      {
        id: uuid(),
        name: 'Core Skills',
        value: [
          {
            id: uuid(),
            data: [
              'HTML, CSS, JavaScript, React, Redux, Redux, Zustand, Node, Express'
            ]
          }
        ]
      },
      {
        id: uuid(),
        name: 'Familiar with',
        value: [
          {
            id: uuid(),
            data: [
              'MongoDB, MySQL, Spring, Spring Boot, JDBC, Sprint Data JPA, Hibernate'
            ]
          }
        ]
      }
    ]
  },
  volunteerExperience: {
    title: 'Volunteer Experience',
    data: [
      {
        id: uuid(),
        organizationName: 'YUVAA, Student Organization',
        location: 'Lovely Professional University',
        positions: [
          {
            id: uuid(),
            position: 'Founder and Chief Executive Officer',
            beginMonthYear: 'Mar 2019',
            endMonthYear: 'Sep 2020',
            responsibility: [
              'Promoted organisation from Tier 1 to Tier 2 with 25+ successful events and programmes',
              'Led a team of 70+ members',
              'Encouraged team with skill-development programmes'
            ]
          }
        ]
      }
    ]
  },
  certificates: {
    title: 'Certificates',
    data: []
  }
}
