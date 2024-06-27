import getDataAuth from '@/lib/getDataAuth'
import ItemTable from './ItemTable'

export default async function GridTable({id}) {
  const request = {
    api: `/floors?populate[tables][populate]=thumbnail&filters[id]=${id}`,
    token: process.env.TOKEN,
  }
  const res = await getDataAuth(request)
  const data = res?.data?.[0]?.attributes?.tables?.data
  return (
    <div className='w-full gap-[1.5rem] grid grid-cols-4 mt-[2rem] max-md:grid-cols-1 max-md:gap-[1rem]'>
      {data?.map((item, index) => (
        <ItemTable
          key={index}
          item={item}
        />
      ))}
    </div>
  )
}
