import { memo, useActionState } from 'react'
import { useResumeStore } from '@/store/rootStore.ts'
import type { Contact } from '@/store/HeaderSlice.ts'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog.tsx'
import { Button } from '@/components/ui/button.tsx'
import { Label } from '@/components/ui/label.tsx'
import { Input } from '@/components/ui/input.tsx'

interface AccountInfoEditModalProps {
  onFormSubmit: (
    prevState: Contact,
    formData: FormData
  ) => Contact | Promise<Contact>
  showModal: boolean
  setShowModal: (prevState: boolean) => void
}

function AccountInfoEditModal(props: AccountInfoEditModalProps) {
  const { onFormSubmit, showModal, setShowModal } = props
  const formInitialData = useResumeStore((state) => state.contact)
  const [state, formAction] = useActionState(onFormSubmit, formInitialData)
  return (
    <>
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className='max-w-screen-md'>
          <DialogHeader>
            <DialogTitle>Contact Info</DialogTitle>
            <DialogDescription>
              Update all the necessary fields you want to be included in your
              resume
            </DialogDescription>
          </DialogHeader>
          <form action={formAction} className='space-y-8'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div className='space-y-1'>
                <Label htmlFor='email'>Email</Label>
                <Input
                  type='email'
                  name='email'
                  placeholder='Enter Email'
                  defaultValue={state?.email}
                  className='outline-none'
                />
              </div>
              <div className='space-y-1'>
                <Label htmlFor='mobile'>Mobile</Label>
                <Input
                  type='text'
                  name='mobile'
                  placeholder='Enter Mobile'
                  defaultValue={state?.mobile}
                  className='outline-none'
                />
                <Label
                  htmlFor='mobile'
                  className='text-zinc-400 italic text-xs'
                >
                  Prefix Country Code(+91-9988776655)
                </Label>
              </div>
              <div className='space-y-1'>
                <Label htmlFor='location'>Location</Label>
                <Input
                  type='text'
                  name='location'
                  placeholder='Enter Location'
                  defaultValue={state?.location}
                  className='outline-none'
                />
              </div>
              <div className='space-y-1'>
                <Label htmlFor='github'>Github</Label>
                <Input
                  type='text'
                  name='github'
                  placeholder='Enter Github Profile URL'
                  defaultValue={state?.github}
                  className='outline-none'
                />
              </div>
              <div className='space-y-1'>
                <Label htmlFor='linkedIn'>LinkedIn</Label>
                <Input
                  type='text'
                  name='linkedIn'
                  placeholder='Enter LinkedIn Profile URL'
                  defaultValue={state?.linkedIn}
                  className='outline-none'
                />
              </div>
              <div className='space-y-1'>
                <Label htmlFor='portfolio'>Portfolio Website</Label>
                <Input
                  type='text'
                  name='portfolio'
                  placeholder='Enter Portfolio URL'
                  defaultValue={state?.portfolio}
                  className='outline-none'
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose>
                <Button type='button' variant='destructive'>
                  Discard
                </Button>
              </DialogClose>
              <Button type='submit' variant='default'>
                Save Changes
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default memo(AccountInfoEditModal)
