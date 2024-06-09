import Link from 'next/link'

export default function Roles({data}) {
  return (
    <div className='space-x-[1.5rem]'>
      {data?.type === 'public' && <Link href={'/waiter'}>Nhân viên</Link>}
      <Link href={'/order'}>Đơn đặt bàn</Link>
    </div>
  )
}
