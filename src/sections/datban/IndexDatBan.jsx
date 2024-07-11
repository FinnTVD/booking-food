
import { cookies } from 'next/headers'
import ProfileForm from '../home/_components/FormOrder'

export default function IndexDatBan({idTable, dataTable}) {
  const cookieStore = cookies()
  const token = cookieStore.get('jwtBooking')
  const id = cookieStore.get('idBooking')
  return (
    <div className='w-[50%] mx-auto'>
      <ProfileForm
        id={id?.value}
        token={token?.value}
        idTable={idTable}
        dataTable={dataTable}
      />
    </div>
  )
}
