import {cookies} from 'next/headers'

import {AvatarUser} from '@/app/login/_components/AvatarUser'
import Link from 'next/link'
import getDataAuth from '@/lib/getDataAuth'
import Roles from './Roles'

export default async function Account() {
  const cookieStore = cookies()
  const token = cookieStore.get('jwtBooking')
  const id = cookieStore.get('idBooking')

  const request = {
    api: `/users/${id?.value}?populate=avatar&populate=role`,
    token: token?.value,
  }
  const data = token && id && (await getDataAuth(request))

  return (
    <div className='flex items-center space-x-[3rem] max-md:space-x-[2rem]'>
      {data?.role?.type !== 'authenticated' ? (
        <Roles data={data?.role} />
      ) : (
        <Link href={'/my-order'}>Đơn đặt bàn</Link>
      )}
      {token ? (
        <AvatarUser data={data} />
      ) : (
        <Link href={'/login'}>Đăng nhập</Link>
      )}
    </div>
  )
}
