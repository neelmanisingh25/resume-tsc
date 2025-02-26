export const contentEditableClasses =
  'focus:outline-none border-dashed group-[.active]:border-b-2 focus:border-green-500'

export const showPlaceholderClasses =
  '[&:empty::before]:content-[attr(data-placeholder)] [&:empty::before]:text-gray-400 [&:empty::before]:cursor-text [&:empty::before]:italic'

export const showAddNewFieldClasses =
  'flex-row justify-center text-center items-center hidden group-[.active]:flex mt-2'

// export const flexGrowFields = ['companyName', 'organizationName', 'institution']
export const flexGrowFields = [
  'companyName',
  'organizationName',
  'institution',
  'location',
  'projectName'
]
