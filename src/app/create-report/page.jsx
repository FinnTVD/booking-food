import getDataAuth from '@/lib/getDataAuth'
import IndexCreate from '@/sections/createReport/IndexCreate'
import {cookies} from 'next/headers'
import {redirect} from 'next/navigation'

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
  if (data?.role?.type !== 'waiter') return redirect('/')
  return (
    <main>
      <IndexCreate />
    </main>
  )
}
