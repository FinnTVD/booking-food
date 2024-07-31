import getDataAuth from '@/lib/getDataAuth'
import ListRepost from './ListRepost'

export default async function IndexReport({ searchParams }) {
  const date = new Date()
  const options = {
    timeZone: 'Asia/Ho_Chi_Minh',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }
  const vnDateString = date.toLocaleDateString('en-CA', options) 
  const request = {
    api: `/reports?populate[orders][populate]=table.floor&filters[time][$eq]=${
      searchParams?.day || vnDateString
    }&sort=time:desc`,
    token: process.env.TOKEN,
  }
  const [reports] = await Promise.all([getDataAuth(request)])
  return (
    <section className='container'>
      <ListRepost reports={reports?.data} />
    </section>
  )
}
