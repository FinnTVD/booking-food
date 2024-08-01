'use client'
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import {ArrowUpDown} from 'lucide-react'

import {Button} from '@/components/ui/button'
import {Checkbox} from '@/components/ui/checkbox'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {useState, useTransition} from 'react'

import {formatToVND} from '@/lib/utils'
import {createOrder} from '@/actions/createOrder'
import {toast} from 'sonner'
import CircleLoading from '../login/components/CircleLoading'

export default function TableCreateReport({data, reports}) {

  const [sorting, setSorting] = useState([])
  const [columnFilters, setColumnFilters] = useState([])
  const [columnVisibility, setColumnVisibility] = useState({})
  const [rowSelection, setRowSelection] = useState({})
  const [isPending, setTransition] = useTransition()

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
  const handleIdOrders = (data = []) => {
    if (!Array.isArray(data)) return []
    const arr = []
    data.forEach((item, index) => {
      if (index === data?.length - 1) {
        arr.push({
          id: item?.id,
          position: {
            end: true,
          },
        })
      } else {
        arr.push({
          id: item?.id,
          position: {
            before: data?.[index + 1]?.id,
          },
        })
      }
    })
    return arr
  }
  function handleCreateReportByDate() {
    setTransition(() => {
      const date = new Date()
      const options = {
        timeZone: 'Asia/Ho_Chi_Minh',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }
      const vnDateString = date.toLocaleDateString('en-CA', options)
      const body = {
        data: {
          orders: {
            disconnect: [],
            connect: handleIdOrders(data),
          },
          time: vnDateString,
        },
      }
      const request = {
        api: '/reports',
        token: process.env.NEXT_PUBLIC_TOKEN,
        body: JSON.stringify(body),
      }
      createOrder(request).then((res) => {
        if (res?.data?.id) {
          toast.success('Tạo báo cáo thành công', {
            position: 'top-center',
            duration: 5000,
          })
        } else {
          toast.error('Tạo báo cáo thất bại', {
            position: 'top-center',
            duration: 5000,
          })
        }
      })
    })
  }

  return (
    <>
      <div className='w-full bg-white px-[1rem] rounded-[0.6rem] py-[1rem]'>
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
      <div className='flex gap-x-[2rem] w-fit ml-auto mt-[1.5rem]'>
        <div className='w-fit h-[3rem] flex justify-center items-center rounded-sm bg-white text-black  px-[1.5rem]'>
          Tổng cọc: {formatToVND(handleTotalPrice(data)) || '0đ'}
        </div>

        {reports?.data?.length ? (
          <div className='px-[1rem] h-[3rem] bg-greyscale-30 rounded-[0.5rem] text-center text-white font-bold flex justify-center items-center'>
            Đã tạo báo cáo hôm nay
          </div>
        ) : (
          <button
            onClick={handleCreateReportByDate}
            className='px-[1rem] h-[3rem] bg-green-600 rounded-[0.5rem] text-center text-white font-bold flex justify-center items-center'
          >
            {isPending ? <CircleLoading /> : 'Tạo báo cáo'}
          </button>
        )}
      </div>
    </>
  )
}
