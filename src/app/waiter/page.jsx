import {cookies} from 'next/headers'
import getDataAuth from '@/lib/getDataAuth'
import {redirect} from 'next/navigation'
import Section1 from '@/sections/waiter/components/Section1'

export default async function page() {
  const cookieStore = cookies()
  const token = cookieStore.get('jwtBooking')
  const id = cookieStore.get('idBooking')
  const request = {
    api: `/users/${id?.value}?populate=avatar&populate=role`,
    token: token?.value,
  }
  if (!token || !id) return redirect('/')
  const data = token && id && (await getDataAuth(request))
  if (data?.role?.type !== 'public') return redirect('/')
  return (
    <main className='w-full'>
      <Section1 />
    </main>
  )
}
