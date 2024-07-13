import getDataAuth from '@/lib/getDataAuth'
import IndexPayment from '@/sections/payment/IndexPayment'
import { cookies } from 'next/headers'

export default async function page({ searchParams }) {
    const cookieStore = cookies()
    const id = cookieStore.get('idBooking')
    const request = {
      api: `/tables?populate=floor&filters[id]=${searchParams?.idTable}`,
      token: process.env.TOKEN,
    }
    const dataTable = await getDataAuth(request)
  return (
    <div className='flex items-center justify-center w-full h-screen bg-primary-5'>
      <IndexPayment
        searchParams={searchParams}
        dataTable={dataTable?.data?.[0]}
        id={id?.value}
      />
    </div>
  )
}
