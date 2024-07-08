'use client'

import {deleteCookie} from '@/actions/deleteCookie'
import {
  DropdownMenuItem,
  DropdownMenuShortcut,
} from '@/components/ui/dropdown-menu'
import {LogOut} from 'lucide-react'
import {useRouter} from 'next/navigation'

export default function BtnLogOut() {
  const router = useRouter()

  const handleLogout = () => {
    deleteCookie('jwtBooking')
    deleteCookie('idBooking').then(() => {
      router.push('/login')
      router.refresh()
    })
  }

  return (
    <DropdownMenuItem
      onClick={handleLogout}
      className='cursor-pointer'
    >
      <LogOut className='w-4 h-4 mr-2' />
      <span onClick={handleLogout}>Đăng xuất</span>
      {/* <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut> */}
    </DropdownMenuItem>
  )
}
