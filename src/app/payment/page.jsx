import getDataAuth from '@/lib/getDataAuth'
import IndexPayment from '@/sections/payment/IndexPayment'

export default async function page({ searchParams }) {
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
      />
    </div>
  )
}
