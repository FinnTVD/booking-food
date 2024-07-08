'use client'
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import {ArrowUpDown, ChevronDown} from 'lucide-react'

import {Button} from '@/components/ui/button'
import {Checkbox} from '@/components/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {Input} from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar'
import {useState} from 'react'
import ConfirmCancel from '@/sections/my-order/_components/ConfirmCancel'
import {deleteUserById} from '@/actions/deleteUserById'
import {updateRoleUser} from '@/actions/updateRoleUser'
import RevalidateTags from '@/actions/revalidateTags'
import DropdownRoles from './DropdownRoles'

export function TableUsers({data}) {
  console.log('🚀 ~ TableUsers ~ data:', data)
  const [sorting, setSorting] = useState([])
  const [columnFilters, setColumnFilters] = useState([])
  const [columnVisibility, setColumnVisibility] = useState({})
  const [rowSelection, setRowSelection] = useState({})

  function handleDeleteUserById(id) {
    console.log('🚀 ~ handleDeleteUserById ~ id:', id)
    const request = {
      api: `/users/${id}`,
      token: process.env.NEXT_PUBLIC_TOKEN,
    }
    deleteUserById(request).then((res) => {
      console.log('🚀 ~ deleteUserById ~ res:', res)
      RevalidateTags('waiter')
    })
  }

  function handleChangeRoleUser(idRoleNext, idRolePrev) {
    const body = {
      role: {
        connect: [
          {
            id: idRoleNext,
          },
        ],
        disconnect: [
          {
            id: idRolePrev,
          },
        ],
      },
    }
    const request = {
      api: `/api/users/${id}`,
      body: JSON.stringify(body),
      token: process.env.NEXT_PUBLIC_TOKEN,
    }
    updateRoleUser(request).then((res) => {
      console.log('res', res)
    })
  }
  const columns = [
    {
      id: 'select',
      header: ({table}) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && 'indeterminate')
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label='Select all'
        />
      ),
      cell: ({row}) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label='Select row'
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: 'id',
      header: 'Id',
      cell: ({row}) => <div className='capitalize'>{row.getValue('id')}</div>,
    },
    {
      accessorKey: 'avatar',
      header: 'Avatar',
      cell: ({row}) => (
        <Avatar className='cursor-pointer'>
          <AvatarImage
            className='object-cover'
            src={
              row.getValue('avatar')
                ? process.env.NEXT_PUBLIC_BE + row.getValue('avatar')
                : 'https://github.com/shadcn.png'
            }
            alt='@shadcn'
          />
          <AvatarFallback>BK</AvatarFallback>
        </Avatar>
      ),
    },
    {
      accessorKey: 'username',
      header: ({column}) => {
        return (
          <Button
            variant='ghost'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Name
            <ArrowUpDown className='w-4 h-4 ml-2' />
          </Button>
        )
      },
      cell: ({row}) => (
        <div className='lowercase'>{row.getValue('username')}</div>
      ),
    },
    {
      accessorKey: 'email',
      header: ({column}) => {
        return (
          <Button
            variant='ghost'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Email
            <ArrowUpDown className='w-4 h-4 ml-2' />
          </Button>
        )
      },
      cell: ({row}) => <div className='lowercase'>{row.getValue('email')}</div>,
    },
    {
      accessorKey: 'phone',
      header: 'Phone',
      cell: ({row}) => <div className='lowercase'>{row.getValue('phone')}</div>,
    },
    {
      accessorKey: 'role',
      header: ({column}) => {
        return (
          <Button
            variant='ghost'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Role
            <ArrowUpDown className='w-4 h-4 ml-2' />
          </Button>
        )
      },
      cell: ({row}) => <div className='lowercase'>{row.getValue('role')}</div>,
    },
    {
      id: 'actions',
      header: 'Chỉnh sửa',
      cell: ({row}) => {
        const payment = row.original
        if (payment?.role === 'Administrator') return null
        return (
          <div className='space-x-[0.5rem]'>
            <ConfirmCancel
              handle={() => handleDeleteUserById(payment?.id)}
              title='Bạn vẫn muốn tiếp tục xoá tài khoản này?'
            >
              <button className='px-[1rem] py-[0.4rem] bg-red-600 rounded-[0.5rem] text-center text-white font-bold'>
                Xoá tài khoản
              </button>
            </ConfirmCancel>
            <DropdownRoles
              handle={handleChangeRoleUser}
              role={payment?.role}
            >
              <button className='px-[1rem] py-[0.4rem] rounded-[0.5rem] text-center text-black bg-white font-bold border-none active:border-none'>
                Phân quyền
              </button>
            </DropdownRoles>
          </div>
        )
      },
    },
  ]
  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <div className='w-full'>
      <div className='flex items-center py-4'>
        <div className='flex space-x-[2rem] w-full'>
          <Input
            placeholder='Filter emails...'
            value={table.getColumn('email')?.getFilterValue() ?? ''}
            onChange={(event) =>
              table.getColumn('email')?.setFilterValue(event.target.value)
            }
            className='max-w-sm'
          />
          <Input
            placeholder='Filter phones...'
            value={table.getColumn('phone')?.getFilterValue() ?? ''}
            onChange={(event) =>
              table.getColumn('phone')?.setFilterValue(event.target.value)
            }
            className='max-w-sm'
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant='outline'
              className='ml-auto'
            >
              Columns <ChevronDown className='w-4 h-4 ml-2' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className='capitalize'
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className='border rounded-md'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className='h-24 text-center'
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className='flex items-center justify-end py-4 space-x-2'>
        <div className='flex-1 text-sm text-muted-foreground'>
          {table.getFilteredSelectedRowModel().rows.length} of{' '}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className='space-x-2'>
          <Button
            variant='outline'
            size='sm'
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant='outline'
            size='sm'
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
