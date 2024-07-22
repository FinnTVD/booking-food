import getDataAuth from '@/lib/getDataAuth'
import {formatToVND} from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'

export default async function page({params}) {
  const request1 = {
    api: `/tables?populate=thumbnail&populate=floor&filters[name]=${params.slug}`,
    token: process.env.TOKEN,
  }
  const data = await getDataAuth(request1)
  console.log(data)
  return (
    <>
      <div className='w-full h-auto'>
        <Image
          className='object-cover w-[30rem] h-auto'
          src={
            process.env.NEXT_PUBLIC_BE +
            data?.data?.[0]?.attributes?.thumbnail?.data?.[0]?.attributes?.url
          }
          alt='table '
          width={1600}
          height={800}
        />
      </div>
      <div>Bàn: {data?.data?.[0]?.attributes?.name.replace('-T2', '')}</div>
      <div>Tầng: {data?.data?.[0]?.attributes?.floor?.data?.id}</div>
      <div>
        Đặt cọc trước: {formatToVND(data?.data?.[0]?.attributes?.price)}
      </div>
      <Link
        href={`/dat-ban/${data?.data?.[0]?.id}`}
        className={`${
          data?.data?.[0]?.attributes?.status ? '' : 'pointer-events-none'
        } rounded-[0.6rem] h-[2.7rem] flex justify-center items-center w-[10rem] md:group-hover:bg-blue-800 bg-blue-50 max-md:bg-[#10273F] group-hover:text-white transition-all duration-200 !mt-[1rem] max-md:text-white`}
      >
        {data?.data?.[0]?.attributes?.status ? 'Đặt bàn' : 'Hết bàn'}
      </Link>
    </>
  )
}
