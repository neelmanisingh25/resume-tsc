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
            achievements: [
              'Architected and delivered an enterprise-level UI Component Library hosted on JFrog Artifactory, standardizing designpatterns across teams and accelerating development velocity by 40%',
              'Spearheaded Frontend Architecture Migration: Led the strategic migration of the customer dashboard from AngularJS to React, resulting in improved performance, maintainability, and a more intuitive user experience, directly contributingto a 10% customer retention rate.',
              'Orchestrated code reviews and established frontend development best practices, elevating code quality and teamperformance',
              'Optimized Messaging Dashboard Performance: Implemented critical performance enhancements to the messagingdashboard, reducing campaign load time by 80%, significantly improving user experience and operational efficiency.'
            ]
          },
          {
            id: uuid(),
            position: 'Software Engineer I',
            beginMonthYear: 'Jul 2022',
            endMonthYear: 'Aug 2024',
            achievements: [
              'Optimized front-end performance by restructuring component architecture, reducing load times by 35%',
              "Web SDK Enhancement: Completely revamped the company's Web SDK, implementing robust error handling,improving stability by 30%, and adding new features for enhanced data collection and user tracking capabilities.",
              'Development Environment Optimization: Created and deployed a new Docker image enabling cross-platformcompatibility with Apple Silicon Macs, reducing development setup time by 50% and improving team productivity.',
              'Migration Planning: Developed detailed documentation outlining the architecture and approach for the AngularJS toReact migration, creating a solid foundation that later proved critical for successful implementation and customerretention.'
            ]
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
            beginMonthYear: 'Mar 2022',
            endMonthYear: 'Jul 2022',
            achievements: [
              'Engineered critical features for Admin Zone platform, streamlining enterprise onboarding and Sender ID managementfor customer communications',
              'Developed innovative chunking solution for report downloads, slashing download times by 90%'
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
            achievements: [
              'Drove 30% client profit growth in Q2 2021 through optimization of key business processes',
              'Received Best Quality Work Performer award for outstanding contributions to project success'
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
        projectName: 'Resume Builder',
        description: [
          'Designed and developed a web application enabling users to create customized, professional resumes',
          'Engineered responsive design for optimal viewing across all device types',
          'Technologies used: React, Zustand, Node, Express, Docker, Vite, Tailwind CSS, TypeScript'
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
      },
      {
        id: uuid(),
        name: 'Current Learning',
        value: [
          {
            id: uuid(),
            data: ['Docker, Kubernetes, Go, Ruby']
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
              'Elevated organization from Tier 1 to Tier 2 status by executing 25+ successful events and programs',
              'Led cross-functional team of 70+ members, developing leadership and organizational management skills'
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
