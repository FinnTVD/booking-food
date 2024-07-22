'use client'

import {useState} from 'react'

export default function Time({form}) {
  const [isOpen, setIsOpen] = useState(false)
  const [value, setValue] = useState('')
  function generateTimeSlots() {
    const startHour = 9
    const endHour = 23
    const intervalMinutes = 30
    const timeSlots = []

    for (let hour = startHour; hour < endHour; hour++) {
      for (let minutes = 0; minutes < 60; minutes += intervalMinutes) {
        const formattedHour = hour.toString().padStart(2, '0')
        const formattedMinutes = minutes.toString().padStart(2, '0')
        timeSlots.push(`${formattedHour}:${formattedMinutes}`)
      }
    }

    // Adding the final slot at 23:00
    timeSlots.push(`${endHour}:00`)

    return timeSlots
  }
  const listHour = generateTimeSlots()
  return (
    <div
      onClick={() => setIsOpen(!isOpen)}
      className='h-10 bg-white rounded-md w-[8rem] justify-center items-center flex gap-x-[1rem] relative cursor-pointer'
    >
      {value || '--:--'}
      <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        strokeWidth='1.5'
        stroke='currentColor'
        className='size-6'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
        />
      </svg>
      <div
        className={` ${
          isOpen
            ? 'opacity-1 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        } w-full h-[20rem] absolute bottom-[-0.5rem] left-0 translate-y-full rounded-md bg-white overflow-auto`}
      >
        <div className={` w-full h-fit `}>
          {listHour?.map((item, index) => (
            <div
              onClick={() => {
                setValue(item)
                form.setValue('time', item)
              }}
              key={index}
              className='w-full h-[2rem] flex items-center justify-center text-[0.7rem] cursor-pointer hover:bg-gray-200'
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
