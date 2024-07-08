import {cookies} from 'next/headers'
import {TableOrders} from './TableOrders'
import {handleStatusOrder} from '@/lib/utils'
import getDataAuthTags from '@/lib/getDataAuthTag'

export default async function Section1() {
  const cookieStore = cookies()
  const token = cookieStore.get('jwtBooking')?.value
  const id = cookieStore.get('idBooking')?.value
  const request = {
    api: `/orders?populate[table][populate]=floor&populate=user&&filters[user][id]=${id}&sort=publishedAt:desc`,
    token: token,
    tags: 'orders',
  }
  const data = await getDataAuthTags(request)

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
        username: item?.attributes?.name,
        email: item?.attributes?.email,
        phone: item?.attributes?.phone,
        table:
          item?.attributes?.table?.data?.attributes?.name +
          ` (${item?.attributes?.table?.data?.attributes?.floor?.data?.attributes?.name})`,
        date: handleDate(item?.attributes?.dateandtime),
        time: handleTime(item?.attributes?.dateandtime),
        status: handleStatusOrder(item?.attributes?.status),
      }
      arr.push(obj)
    })
    return arr
  }
  const dataNew = formatData(data?.data)
  return (
    <section className='container'>
      <TableOrders
        data={dataNew}
        token={token}
      />
    </section>
  )
}
