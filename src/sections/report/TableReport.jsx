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

import {format} from 'date-fns'
import {Calendar as CalendarIcon} from 'lucide-react'

import {cn} from '@/lib/utils'
import {Calendar} from '@/components/ui/calendar'
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover'
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
import {updateStatusTable} from '@/actions/updateStatusTable'
import {formatToVND} from '@/lib/utils'
import {usePathname, useRouter, useSearchParams} from 'next/navigation'

export default function TableReport({data, type}) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathName = usePathname()
  const dateFilter = searchParams.get('day') || new Date()
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
      token: process.env.NEXT_PUBLIC_TOKEN,
    }
    updateStatusOrderById(request).then((res) => {
      RevalidateTags('order1')
      RevalidateTags('order2')
      RevalidateTags('order3')
      RevalidateTags('order4')
      if (status === 'confirm') {
        const request1 = {
          api: `/tables/${payment.idTable}`,
          token: process.env.NEXT_PUBLIC_TOKEN,
          body: JSON.stringify({
            data: {
              status: 'false',
            },
          }),
        }
        updateStatusTable(request1).then(() => {
          RevalidateTags('allTables')
        })
      } else if (status === 'cancel' || status === 'done') {
        const request1 = {
          api: `/tables/${payment.idTable}`,
          token: process.env.NEXT_PUBLIC_TOKEN,
          body: JSON.stringify({
            data: {
              status: 'true',
            },
          }),
        }
        updateStatusTable(request1).then(() => {
          RevalidateTags('allTables')
        })
      }
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
      accessorKey: 'name',
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
      cell: ({row}) => <div className='lowercase'>{row.getValue('name')}</div>,
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
      header: ({column}) => {
        return (
          <Button
            variant='ghost'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Ngày
            <ArrowUpDown className='w-4 h-4 ml-2' />
          </Button>
        )
      },
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
      accessorKey: 'price',
      header: 'Giá cọc',
      cell: ({row}) => (
        <div className='lowercase'>{formatToVND(row.getValue('price'))}</div>
      ),
    },
    {
      id: 'actions',
      // enableHiding: false,
      cell: ({row}) => {
        // if (type !== 'processing') return null
        const payment = row.original
        if (type === 'confirm') {
          return (
            <div className='space-x-[1rem]'>
              <ConfirmCancel
                handle={() => handleCancelOrder(payment, 'cancel')}
              >
                <button className='px-[1rem] py-[0.4rem] bg-red-600 rounded-[0.5rem] text-center text-white font-bold'>
                  Huỷ đơn
                </button>
              </ConfirmCancel>
              <ConfirmCancel
                handle={() => handleCancelOrder(payment, 'done')}
                title='Hoàn tất đơn đặt bàn này?'
              >
                <button className='px-[1rem] py-[0.4rem] bg-green-600 rounded-[0.5rem] text-center text-white font-bold'>
                  Hoàn tất
                </button>
              </ConfirmCancel>
            </div>
          )
        }
        if (type === 'processing') {
          return (
            <div className='space-x-[1rem]'>
              <ConfirmCancel
                handle={() => handleCancelOrder(payment, 'cancel')}
              >
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
        }
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

  const handleTotalPrice = (data) => {
    if (data?.length > 0 && Array.isArray(data)) {
      return data.reduce((total, item) => {
        return total + Number(item?.price)
      }, 0)
    } else {
      return 0
    }
  }

  return (
    <>
      <div className='w-full bg-white px-[1rem] rounded-[0.6rem] py-[1rem]'>
        <div className='flex items-center py-4'>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={'outline'}
                className={cn(
                  'w-[280px] justify-start text-left font-normal',
                  !dateFilter && 'text-muted-foreground',
                )}
              >
                <CalendarIcon className='w-4 h-4 mr-2' />
                {dateFilter ? (
                  format(dateFilter, 'PPP')
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className='w-auto p-0'>
              <Calendar
                mode='single'
                selected={dateFilter}
                onSelect={(format) => {
                  const date = new Date(format.toString())

                  const options = {
                    timeZone: 'Asia/Ho_Chi_Minh',
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                  }
                  const vnDateString = date.toLocaleDateString('en-CA', options)
                  const paramNew = new URLSearchParams(searchParams)

                  paramNew.set('day', vnDateString)
                  router.push(pathName + '?' + paramNew.toString(), {
                    scroll: false,
                  })
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>

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
      <div className='w-fit h-[3rem] flex justify-center items-center ml-auto rounded-sm bg-white text-black mt-[1.5rem] px-[1.5rem]'>
        Tổng cọc: {formatToVND(handleTotalPrice(data)) || '0đ'}
      </div>
    </>
  )
}
