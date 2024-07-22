'use client'
import {Home} from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import Link from 'next/link'

export default function Content({res}) {
  return (
    <aside className='fixed inset-y-0 left-0 z-[10] flex-col hidden border-r w-[8rem] bg-background sm:flex pt-[5rem]'>
      <nav className='flex flex-col items-center gap-4 px-2 sm:py-5'>
        <TooltipProvider>
          {res?.data?.map((item) => (
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href={item?.id === 1 ? '/' : `?floor=${item?.id}`}
                  className='flex flex-col items-center justify-center transition-colors rounded-lg h-9 w-9 text-muted-foreground hover:text-foreground md:h-fit md:w-fit bg-accent p-[1rem]'
                >
                  <Home className='w-[2rem] h-[2rem] flex-shrink-0' />
                  <span className='whitespace-nowrap'>
                    {item?.attributes?.name}
                  </span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side='right'>
                {item?.attributes?.name}
              </TooltipContent>
            </Tooltip>
          ))}
        </TooltipProvider>
      </nav>
    </aside>
  )
}
