import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

import {ProfileForm} from './FormOrder'
import {cookies} from 'next/headers'

export default function DialogForm({children, idTable}) {
  const cookieStore = cookies()
  const token = cookieStore.get('jwtBooking')
  const id = cookieStore.get('idBooking')
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className='max-w-[425px] max-md:max-w-[96%] max-md:h-[70vh] max-md:rounded-[0.5rem] max-md:px-0'>
        <DialogHeader>
          <DialogTitle>Đặt bàn</DialogTitle>
          {/* <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription> */}
        </DialogHeader>
        <ProfileForm
          id={id?.value}
          token={token?.value}
          idTable={idTable}
        />
      </DialogContent>
    </Dialog>
  )
}
