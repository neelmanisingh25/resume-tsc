import { showAddNewFieldClasses } from '@/constants/constants.ts'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip.tsx'
import { IoMdAddCircleOutline } from 'react-icons/io'
import { MdDeleteOutline } from 'react-icons/md'

interface AddNewFieldProps {
  handleAddNewField: () => void
  handleDeleteItem: () => void
  addArrayField: boolean
  addTooltip: string
  deleteTooltip: string
}

function AddNewField(props: AddNewFieldProps) {
  const {
    handleAddNewField,
    addArrayField,
    addTooltip,
    deleteTooltip,
    handleDeleteItem
  } = props
  return (
    <div
      className={`${showAddNewFieldClasses} ${addArrayField ? '-mx-8' : ''}`}
    >
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger>
            <div onClick={handleAddNewField} className='flex'>
              <IoMdAddCircleOutline size={25} className='text-green-600' />
            </div>
          </TooltipTrigger>
          <TooltipContent>{addTooltip}</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger>
            <div onClick={handleDeleteItem} className='flex'>
              <MdDeleteOutline size={25} className='text-red-600' />
            </div>
          </TooltipTrigger>
          <TooltipContent>{deleteTooltip}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <div className='flex-grow border-b-2 border-dashed border-green-500 mx-2' />
      <div className='w-2 h-2 bg-green-500 rounded-full' />
    </div>
  )
}

export default AddNewField
