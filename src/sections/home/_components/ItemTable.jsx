import Image from 'next/image'
import DialogForm from './DialogForm'
import {directions} from './data'

export default function ItemTable({item}) {
  const direction = directions.find(
    (i) => i.value === item.attributes.direction,
  )
  return (
    <article className='md:border md:border-solid md:border-[#E5E7EB] group shadow-[2px_4px_20px_0px_rgba(0,0,0,0.02)] md:hover:shadow-[2px_4px_20px_0px_rgba(12,46,112,0.04),-6px_2px_32px_0px_rgba(12,46,112,0.08)] select-none max-md:shadow-[-6px_2px_28px_0px_rgba(12,46,112,0.08),2px_4px_16px_0px_rgba(12,46,112,0.04)] rounded-[0.6rem]'>
      <div className='w-full h-[16rem] rounded-tl-[0.6rem] rounded-tr-[0.6rem] relative '>
        <Image
          className='size-full object-cover rounded-tl-[0.6rem] rounded-tr-[0.6rem]'
          src={
            process.env.NEXT_PUBLIC_BE +
            item.attributes.thumbnail.data?.[0].attributes.formats.small.url
          }
          alt={
            item.attributes.thumbnail.data?.[0].attributes.formats.small.name
          }
          width={
            item.attributes.thumbnail.data?.[0].attributes.formats.small
              .width || 400
          }
          height={
            item.attributes.thumbnail.data?.[0].attributes.formats.small
              .height || 400
          }
        />
        <div
          className={`${
            item?.attributes?.status ? 'bg-green-600' : 'bg-red-600'
          } absolute top-[0.5rem] left-[0.5rem] text-white font-bold z-10 rounded-[0.5rem] px-[1.5rem] py-[0.5rem]`}
        >
          {item?.attributes?.status ? 'Còn bàn' : 'Hết bàn'}
        </div>
      </div>
      <div className='p-[1rem] space-y-[0.5rem]'>
        <h2 className='line-clamp-1'>{item.attributes.name}</h2>
        <span className='block'>Số ghế: {item.attributes.slot}</span>
        <span className='block'>Vị trí: {direction?.name}</span>
        <p className='line-clamp-1'>
          {item.attributes.description?.[0].children[0].text}
        </p>
        <DialogForm idTable={item.id}>
          <button
            className={`${
              item?.attributes?.status ? '' : 'pointer-events-none'
            } rounded-[0.6rem] h-[2.7rem] flex justify-center items-center w-full md:group-hover:bg-blue-800 bg-blue-50 max-md:bg-[#10273F] group-hover:text-white transition-all duration-200 !mt-[1rem] max-md:text-white`}
          >
            {item?.attributes?.status ? 'Đặt bàn' : 'Hết bàn'}
          </button>
        </DialogForm>
      </div>
    </article>
  )
}
