import {getDataAuth} from '@/lib/getDataAuth'
import {TableUsers} from './TableUsers'

export default async function Section1() {
  const request = {
    api: `/users?populate=role&populate=avatar`,
    token: process.env.TOKEN,
  }
  const data = await getDataAuth(request)
  const formatData = (data = []) => {
    const arr = []
    data.forEach((item) => {
      const obj = {
        id: item?.id,
        username: item?.username,
        email: item?.email,
        phone: item?.phone,
        role: item?.role?.name,
        avatar: item?.avatar?.formats?.thumbnail?.url,
      }
      arr.push(obj)
    })
    return arr
  }
  const dataNew = formatData(data)
  return (
    <section className='container'>
      <TableUsers data={dataNew} />
    </section>
  )
}
