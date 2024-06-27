import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs'
import {handleStatusOrder} from '@/lib/utils'
import {TableOrders} from './TableOrders'
import getDataAuthTags from '@/lib/getDataAuthTag'
import {cookies} from 'next/headers'
export default async function TabsOrder() {
  const request1 = {
    api: `/orders?populate[table][populate]=floor&populate=user&filters[status][$eq]=processing&sort=publishedAt:desc`,
    token: process.env.TOKEN,
    tag: 'order1',
  }
  const request2 = {
    api: `/orders?populate[table][populate]=floor&populate=user&filters[status][$eq]=confirm&sort=publishedAt:desc`,
    token: process.env.TOKEN,
    tag: 'order2',
  }
  const request3 = {
    api: `/orders?populate[table][populate]=floor&populate=user&filters[status][$eq]=done&sort=publishedAt:desc`,
    token: process.env.TOKEN,
    tag: 'order3',
  }
  const request4 = {
    api: `/orders?populate[table][populate]=floor&populate=user&filters[status][$eq]=cancel&sort=publishedAt:desc`,
    token: process.env.TOKEN,
    tag: 'order4',
  }
  const [data1, data2, data3, data4] = await Promise.all([
    getDataAuthTags(request1),
    getDataAuthTags(request2),
    getDataAuthTags(request3),
    getDataAuthTags(request4),
  ])

  const cookieStore = cookies()
  const token = cookieStore.get('jwtBooking')?.value
  const id = cookieStore.get('idBooking')?.value

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
  return (
    <Tabs
      defaultValue='processing'
      className='w-full'
    >
      <TabsList className='grid w-full grid-cols-4'>
        <TabsTrigger value='processing'>Chờ xác nhận</TabsTrigger>
        <TabsTrigger value='confirm'>Đã xác nhận</TabsTrigger>
        <TabsTrigger value='done'>Hoàn tất</TabsTrigger>
        <TabsTrigger value='cancel'>Đã huỷ</TabsTrigger>
      </TabsList>
      <TabsContent value='processing'>
        <TableOrders
          token={token}
          data={formatData(data1?.data)}
          type='processing'
        />
      </TabsContent>
      <TabsContent value='confirm'>
        <TableOrders data={formatData(data2?.data)} />
      </TabsContent>
      <TabsContent value='done'>
        <TableOrders data={formatData(data3?.data)} />
      </TabsContent>
      <TabsContent value='cancel'>
        <TableOrders data={formatData(data4?.data)} />
      </TabsContent>
    </Tabs>
  )
}
