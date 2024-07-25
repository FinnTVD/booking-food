'use client'
import Image from 'next/image'
import Link from 'next/link'
import {useSearchParams} from 'next/navigation'

export default function GridTableV2({data1, data2, listId}) {
  const searchParams = useSearchParams()
  const floor = searchParams.get('floor')
  const data = floor ? data2 : data1

  function handleSort(data) {
    if (floor) {
      const sorted = data.sort((a, b) => {
        return (
          Number(a?.attributes?.name.replace('-T2', '')) -
          Number(b?.attributes?.name.replace('-T2', ''))
        )
      })
      return sorted
    } else {
      const sorted = data.sort((a, b) => {
        return Number(a?.attributes?.name) - Number(b?.attributes?.name)
      })
      return sorted
    }
  }
  const dataLatest = handleSort(data)
  console.log(dataLatest)

  function handleRole(status, id) {
    if (listId?.length) {
      if (
        listId.find((item) => item?.attributes?.table?.data?.id === Number(id))
          ?.id
      ) {
        return '/gold.jpg'
      } else {
        if (status) {
          return '/blue.jpg'
        } else {
          return '/silver.jpg'
        }
      }
    } else {
      if (status) {
        return '/blue.jpg'
      } else {
        return '/silver.jpg'
      }
    }
  }
  return (
    <div className=''>
      <div className='grid h-screen pb-[5rem] grid-cols-6 grid-rows-3 p-[1.5rem] rounded-[0.5rem] gap-[1rem]'>
        {dataLatest?.slice(0, 18)?.map((item, index) => (
          <Link
            href={`/${item?.attributes?.name}`}
            key={index}
            className='relative size-full'
          >
            <Image
              className='object-fill size-full'
              src={handleRole(item?.attributes?.status, item?.id)}
              alt='table'
              width={300}
              height={100}
            />
            <div className='size-[2rem] rounded-full flex items-center justify-center text-black text-bold absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white'>
              {index + 1}
            </div>
          </Link>
        ))}
      </div>
      <div className='size-[6rem] flex flex-col mb-[3rem] ml-[-2rem]'>
        <div className='flex-1 border border-black border-solid rounded-br-[6.5rem] border-t-[3px]'></div>
        <div className='flex-1 border border-black border-solid rounded-tr-[6.5rem] border-b-[3px]'></div>
      </div>
      <div className='grid h-screen pb-[5rem] grid-cols-6 grid-rows-3 p-[1.5rem] rounded-[0.5rem] gap-[1rem]'>
        {dataLatest?.slice(18, 36)?.map((item, index) => (
          <Link
            href={`/${item?.attributes?.name}`}
            key={index}
            className='relative size-full'
          >
            <Image
              className='object-fill size-full'
              src={handleRole(item?.attributes?.status, item?.id)}
              alt='table'
              width={300}
              height={100}
            />
            <div className='size-[2rem] rounded-full flex items-center justify-center text-black text-bold absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white'>
              {index + 1}
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
