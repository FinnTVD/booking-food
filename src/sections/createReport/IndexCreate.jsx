import getDataAuth from '@/lib/getDataAuth'
import {handleStatusOrder} from '@/lib/utils'
import TableCreateReport from './TableCreateReport'

export default async function IndexCreate() {
  const date = new Date()
  const options = {
    timeZone: 'Asia/Ho_Chi_Minh',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }
  // Function to add days to a date
  function addDays(date, days) {
    const result = new Date(date)
    result.setDate(result.getDate() + days)
    return result
  }

  // Add one day to the current date
  const nextDate = addDays(date, 1)

  // Format the next date according to the options
  const vnNextDateString = nextDate.toLocaleDateString('en-CA', options)
  const vnDateString = date.toLocaleDateString('en-CA', options)
  const request = {
    api: `/orders?populate[table][populate]=floor&populate=user&filters[dateandtime][$gte]=${vnDateString}&filters[dateandtime][$lt]=${vnNextDateString}&sort=dateandtime:desc`,
    token: process.env.TOKEN,
  }

  const request1 = {
    api: `/reports?populate[orders][populate]=table.floor&filters[time][$eq]=${vnDateString}&sort=time:desc`,
    token: process.env.TOKEN,
  }
  const [ordersByDay, reports] = await Promise.all([
    getDataAuth(request),
    getDataAuth(request1),
  ])
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
    <div className='container mt-[2rem]'>
      <TableCreateReport
        data={formatData(ordersByDay?.data)}
        reports={reports}
      />
    </div>
  )
}
