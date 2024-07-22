import getDataAuthTags from '@/lib/getDataAuthTag'
import Content from './Content'
import GridTableV2 from './GridTableV2'
import Note from './Note'
import getDataAuth from '@/lib/getDataAuth'
import {cookies} from 'next/headers'

export default async function Section1() {
  const request = {
    api: `/floors`,
    token: process.env.TOKEN,
    tag: 'allTables',
  }
  const request1 = {
    api: `/floors?populate[tables][populate]=thumbnail&filters[id]=1`,
    token: process.env.TOKEN,
  }
  const request2 = {
    api: `/floors?populate[tables][populate]=thumbnail&filters[id]=2`,
    token: process.env.TOKEN,
  }

  const cookieStore = cookies()
  const id = cookieStore.get('idBooking')?.value
  const request3 = {
    api: `/orders?populate=table&populate=user&&filters[user][id]=${id}&sort=publishedAt:desc`,
    token: process.env.TOKEN,
  }
  const [res, res1, res2, res3] = await Promise.all([
    getDataAuthTags(request),
    getDataAuth(request1),
    getDataAuth(request2),
    getDataAuth(request3),
  ])

  return (
    <section className='w-full h-screen pl-[8rem] overflow-hidden'>
      {/* <TabsFloor /> */}
      {/* <Dashboard /> */}
      <GridTableV2
        data1={res1?.data?.[0]?.attributes?.tables?.data}
        data2={res2?.data?.[0]?.attributes?.tables?.data}
        listId={res3?.data}
      />
      <Content res={res} />
      <Note />
    </section>
  )
}
