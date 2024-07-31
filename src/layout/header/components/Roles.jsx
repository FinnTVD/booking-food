import Link from 'next/link'

export default function Roles({data}) {
  return (
    <div className='space-x-[1.5rem]'>
      {data?.type === 'public' && (
        <>
          <Link href={'/waiter'}>Quản lý tài khoản</Link>
          <Link href={'/report'}>Báo cáo</Link>
        </>
      )}
      {data?.type === 'waiter' && (
        <Link href={'/create-report'}>Tạo báo cáo hàng ngày</Link>
      )}
      <Link href={'/order'}>Đơn đặt bàn</Link>
    </div>
  )
}
