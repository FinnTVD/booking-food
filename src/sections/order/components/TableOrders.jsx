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
import {useState} from 'react'
import ConfirmCancel from '@/sections/my-order/components/ConfirmCancel'
import RevalidateTags from '@/actions/revalidateTags'
import {updateStatusOrderById} from '@/actions/updateStatusOrderById'

export default function TableOrders({data, token, type}) {
  const [sorting, setSorting] = useState([])
  const [columnFilters, setColumnFilters] = useState([])
  const [columnVisibility, setColumnVisibility] = useState({})
  const [rowSelection, setRowSelection] = useState({})

  function handleCancelOrder(payment, status) {
    const request = {
      api: `/orders/${payment.id}`,
      body: JSON.stringify({
        data: {
          status: status,
        },
      }),
      token: token,
    }
    updateStatusOrderById(request).then((res) => {
      RevalidateTags('order1')
      RevalidateTags('order2')
      RevalidateTags('order3')
      RevalidateTags('order4')
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
      header: 'Mã đơn',
      cell: ({row}) => <div className='capitalize'>{row.getValue('id')}</div>,
    },
    {
      accessorKey: 'username',
      header: ({column}) => {
        return (
          <Button
            variant='ghost'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Tên
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
      header: 'Email',
      cell: ({row}) => <div className='lowercase'>{row.getValue('email')}</div>,
    },
    {
      accessorKey: 'phone',
      header: 'SDT',
      cell: ({row}) => <div className='lowercase'>{row.getValue('phone')}</div>,
    },
    {
      accessorKey: 'table',
      header: 'Bàn',
      cell: ({row}) => <div className='lowercase'>{row.getValue('table')}</div>,
    },
    {
      accessorKey: 'date',
      header: 'Ngày',
      cell: ({row}) => <div className='lowercase'>{row.getValue('date')}</div>,
    },
    {
      accessorKey: 'time',
      header: 'Giờ',
      cell: ({row}) => <div className='lowercase'>{row.getValue('time')}</div>,
    },
    {
      accessorKey: 'status',
      header: 'Trạng thái',
      cell: ({row}) => (
        <div className='lowercase'>{row.getValue('status')}</div>
      ),
    },
    {
      id: 'actions',
      // enableHiding: false,
      cell: ({row}) => {
        if (type !== 'processing') return null
        const payment = row.original

        return (
          <div className='space-x-[1rem]'>
            <ConfirmCancel handle={() => handleCancelOrder(payment, 'cancel')}>
              <button className='px-[1rem] py-[0.4rem] bg-red-600 rounded-[0.5rem] text-center text-white font-bold'>
                Huỷ đơn
              </button>
            </ConfirmCancel>
            <ConfirmCancel
              handle={() => handleCancelOrder(payment, 'confirm')}
              title='Xác nhận đơn đặt bàn thành công?'
            >
              <button className='px-[1rem] py-[0.4rem] bg-green-600 rounded-[0.5rem] text-center text-white font-bold'>
                Xác nhận
              </button>
            </ConfirmCancel>
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
    <div className='w-full bg-white px-[1rem] rounded-[0.6rem] py-[1rem]'>
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
