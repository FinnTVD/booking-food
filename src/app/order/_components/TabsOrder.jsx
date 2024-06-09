import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs'
import getDataAuth from '@/lib/getDataAuth'
import {handleStatusOrder} from '@/lib/utils'
import {TableOrders} from './TableOrders'
export default async function TabsOrder() {
  const request1 = {
    api: `/orders?populate[table][populate]=floor&populate=user&filters[status][$eq]=processing`,
    token: process.env.TOKEN,
  }
  const request2 = {
    api: `/orders?populate[table][populate]=floor&populate=user&filters[status][$eq]=confirm`,
    token: process.env.TOKEN,
  }
  const request3 = {
    api: `/orders?populate[table][populate]=floor&populate=user&filters[status][$eq]=done`,
    token: process.env.TOKEN,
  }
  const request4 = {
    api: `/orders?populate[table][populate]=floor&populate=user&filters[status][$eq]=cancel`,
    token: process.env.TOKEN,
  }
  const [data1, data2, data3, data4] = await Promise.all([
    getDataAuth(request1),
    getDataAuth(request2),
    getDataAuth(request3),
    getDataAuth(request4),
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
        <TableOrders data={formatData(data1?.data)} />
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
