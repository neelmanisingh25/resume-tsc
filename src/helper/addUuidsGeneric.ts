import { v4 as uuid } from 'uuid'

function addUuidsGeneric(obj: any): any {
  if (!obj || typeof obj !== 'object') return obj

  // If it's an array, process each element
  if (Array.isArray(obj)) {
    return obj.map((item) => {
      // Only add id to objects, not to primitive values like strings
      if (typeof item === 'object' && item !== null) {
        return { ...addUuidsGeneric(item), id: uuid() }
      }
      // Return primitive values as-is
      return item
    })
  }

  // If it's an object, process each property
  const result = {}
  for (const [key, value] of Object.entries(obj)) {
    if (key === 'data' && Array.isArray(value)) {
      // Special handling for data arrays
      // @ts-ignore
      result[key] = value.map((item) => {
        if (typeof item === 'object' && item !== null) {
          // Process objects in data arrays
          const processedItem = addUuidsGeneric(item)
          return { ...processedItem, id: uuid() }
        }
        // Return primitive values in data arrays as-is
        return item
      })
    } else if (typeof value === 'object' && value !== null) {
      // Recursively process nested objects
      // @ts-ignore
      result[key] = addUuidsGeneric(value)
    } else {
      // @ts-ignore
      result[key] = value
    }
  }

  return result
}

// Special handling for skills section to maintain the expected structure
function addUuidsToResume(resumeData: any) {
  const result = addUuidsGeneric(resumeData)

  // Special handling for skills section
  if (result.skills && result.skills.data) {
    result.skills.data = result.skills.data.map((skill: any) => {
      if (skill.value && Array.isArray(skill.value)) {
        skill.value = skill.value.map((valueItem: any) => {
          if (valueItem.data && Array.isArray(valueItem.data)) {
            // Make sure we don't modify string values in the data array
            valueItem.data = valueItem.data.map((dataItem: any) =>
              typeof dataItem === 'string'
                ? dataItem
                : { ...dataItem, id: uuid() }
            )
          }
          return valueItem
        })
      }
      return skill
    })
  }

  return result
}
export default addUuidsToResume
