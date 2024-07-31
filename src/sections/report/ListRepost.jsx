'use client'

import {handleStatusOrder} from '@/lib/utils'
import TableReport from './TableReport'

export default function ListRepost({reports = []}) {
  function handleDate(isoString) {
    const date = new Date(isoString)
    const day = date.getUTCDate()
    const month = date.getUTCMonth() + 1
    const year = date.getUTCFullYear()
    const formattedDate = `${day.toString().padStart(2, '0')}-${month
      .toString()
      .padStart(2, '0')}-${year}`
    return formattedDate
  }
  function handleTime(isoString) {
    const date = new Date(isoString)
    const hours = date.getUTCHours()
    const minutes = date.getUTCMinutes()
    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}`
    return formattedTime
  }

  const formatData = (data = []) => {
    const arr = []
    data.forEach((item) => {
      const obj = {
        id: item?.id,
        date: handleDate(item?.attributes?.dateandtime),
        name: item?.attributes?.name,
        phone: item?.attributes?.phone,
        email: item?.attributes?.email,
        time: handleTime(item?.attributes?.dateandtime),
        table:
          'Bàn ' +
          item?.attributes?.table?.data?.attributes?.name +
          ' - Tầng ' +
          item?.attributes?.table?.data?.attributes?.floor?.data?.id,
        status: handleStatusOrder(item?.attributes?.status),
        price: item?.attributes?.table?.data?.attributes?.price,
      }
      arr.push(obj)
    })
    return arr
  }
  return (
    <div className='mt-[2rem]'>
      <TableReport data={formatData(reports?.[0]?.attributes?.orders?.data)} />
    </div>
  )
}
