import Image from 'next/image'
import React from 'react'

export default function Note() {
  return (
    <div className='w-fit h-[3rem] flex gap-[5rem] items-center bg-white rounded-[6.5rem] px-[5rem] fixed bottom-[3rem] left-1/2 -translate-x-1/2'>
      <div className='flex items-center gap-[1rem]'>
        <Image
          className='h-[2rem] w-auto'
          src={'/blue.jpg'}
          alt='table'
          width={100}
          height={100}
        />
        <span className='block whitespace-nowrap'>Bàn đang trống</span>
      </div>
      <div className='flex items-center gap-[1rem]'>
        <Image
          className='h-[2rem] w-auto'
          src={'/silver.jpg'}
          alt='table'
          width={100}
          height={100}
        />
        <span className='block whitespace-nowrap'>Bàn đã có người đặt</span>
      </div>
      <div className='flex items-center gap-[1rem]'>
        <Image
          className='h-[2rem] w-auto'
          src={'/gold.jpg'}
          alt='table'
          width={100}
          height={100}
        />
        <span className='block whitespace-nowrap'>Bàn mình đã đặt</span>
      </div>
    </div>
  )
}
