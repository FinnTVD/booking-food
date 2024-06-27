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
import RevalidateTags from '@/actions/revalidateTags'
import {updateStatusOrderById} from '@/actions/updateStatusOrderById'
import {ConfirmCancel} from './ConfirmCancel'

export function TableOrders({data, token}) {
  console.log('🚀 ~ TableOrders ~ data:', data)
  const [sorting, setSorting] = useState([])
  const [columnFilters, setColumnFilters] = useState([])
  const [columnVisibility, setColumnVisibility] = useState({})
  const [rowSelection, setRowSelection] = useState({})

  async function handleCancelOrder(payment) {
    console.log('🚀 ~ handleCancelOrder ~ payment:', payment)
    const request = {
      api: `/orders/${payment.id}`,
      body: JSON.stringify({
        data: {
          status: 'cancel',
        },
      }),
      token: token,
    }
    updateStatusOrderById(request).then((res) => {
      console.log('🚀 ~ updateStatusOrderById ~ res:', res)
      RevalidateTags('orders')
    })
    const dataDon = new FormData()
    dataDon?.append('entry.377556313', payment?.date)
    dataDon?.append('entry.1803996443', payment?.email)
    dataDon?.append('entry.763171905', payment?.id)
    dataDon?.append('entry.594050415', payment?.phone)
    dataDon?.append('entry.1946356008', payment?.status)
    dataDon?.append('entry.1520761440', payment?.table)
    dataDon?.append('entry.964051301', payment?.time)
    dataDon?.append('entry.1056944520', payment?.username)
    const res = await fetch(
      'https://docs.google.com/forms/u/0/d/e/1FAIpQLSfyJq3cwdztaqWBLn9s99mtgJDQjSpgeawb1RzhEAPnfXv8-Q/formResponse',
      {
        method: 'POST',
        body: dataDon,
        mode: 'no-cors',
      },
    )
    console.log('ok')
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
        const payment = row.original
        if (
          payment?.status === 'Đã huỷ' ||
          payment?.status === 'Hoàn tất' ||
          payment?.status === 'Thành công'
        )
          return null
        return (
          <ConfirmCancel handle={() => handleCancelOrder(payment)}>
            <button className='px-[1rem] py-[0.4rem] bg-red-600 rounded-[0.5rem] text-center text-white font-bold'>
              Huỷ đơn
            </button>
          </ConfirmCancel>
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
