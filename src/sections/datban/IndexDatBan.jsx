import {cookies} from 'next/headers'
import ProfileForm from '../home/_components/FormOrder'
import getDataAuth from '@/lib/getDataAuth'

export default async function IndexDatBan({idTable, dataTable}) {
  const cookieStore = cookies()
  const token = cookieStore.get('jwtBooking')
  const id = cookieStore.get('idBooking')
  const user = await getDataAuth({
    api: `/users/${id?.value}`,
    token: process.env.TOKEN,
  })
  return (
    <div className='w-[50%] mx-auto'>
      <ProfileForm
        id={id?.value}
        token={token?.value}
        idTable={idTable}
        dataTable={dataTable}
        user={user}
      />
    </div>
  )
}
