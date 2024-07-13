'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {useState} from 'react'

const roles = [
  {
    id: 1,
    role: 'Authenticated',
    name: 'Khách hàng',
  },
  {
    id: 3,
    role: 'Waiter',
    name: 'Nhân viên',
  },
]

export default function  DropdownRoles({children, role, handle,idUser}) {
  const [position, setPosition] = useState(role)

  function handleIdRole(role) {
    return roles.find((e) => e?.role === role)?.id
  }

  function handleGetIdRoleCurrent() {
    return roles.find((e) => e?.role === role)?.id
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent className='w-56'>
        <DropdownMenuLabel>Quản lý quyền người dùng</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={position}
          onValueChange={(role) => {
            if (position === role) return
            setPosition(role)
            handle(handleIdRole(role), handleGetIdRoleCurrent(),idUser)
          }}
        >
          {roles.map((role) => (
            <DropdownMenuRadioItem
              key={role.id}
              value={role.role}
              className='cursor-pointer select-none'
            >
              {role.name}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
