'use client'
import {Home} from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import Link from 'next/link'

const floors = [
  {
    id: 1,
    name: 'Tầng 1',
  },
  {
    id: 2,
    name: 'Tầng 2',
  },
]

export default function Content({res}) {
  return (
    <>
      <aside className='fixed inset-y-0 left-0 z-[10] flex-col hidden border-r w-[8rem] bg-background sm:flex pt-[5rem]'>
        <nav className='flex flex-col items-center gap-4 px-2 sm:py-5'>
          <TooltipProvider>
            {floors?.map((item, index) => (
              <Tooltip key={index}>
                <TooltipTrigger asChild>
                  <Link
                    href={item?.id === 1 ? '/' : `?floor=${item?.id}`}
                    className='flex flex-col items-center justify-center transition-colors rounded-lg h-9 w-9 text-muted-foreground hover:text-foreground md:h-fit md:w-fit bg-accent p-[1rem]'
                  >
                    <Home className='w-[2rem] h-[2rem] flex-shrink-0' />
                    <span className='whitespace-nowrap'>{item?.name}</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side='right'>{item?.name}</TooltipContent>
              </Tooltip>
            ))}
          </TooltipProvider>
        </nav>
      </aside>
      {/* <div className='fixed left-[5rem] z-[5] -translate-y-1/2 top-1/2 size-[6rem] flex flex-col'>
        <div className='flex-1 border border-black border-solid rounded-br-[6.5rem] border-t-[3px]'></div>
        <div className='flex-1 border border-black border-solid rounded-tr-[6.5rem] border-b-[3px]'></div>
      </div> */}
    </>
  )
}
