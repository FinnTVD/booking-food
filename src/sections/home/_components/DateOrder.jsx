'use client'

import {format} from 'date-fns'
import {Calendar as CalendarIcon} from 'lucide-react'

import {cn} from '@/lib/utils'
import {Button} from '@/components/ui/button'
import {Calendar} from '@/components/ui/calendar'
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover'

export function DateOrder({values, form}) {
  return (
    <div>
      <div
        className={`${
          form.formState.errors.date?.message ? 'text-red-500' : ''
        }`}
      >
        Ngày đặt bàn:
      </div>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={'outline'}
            className={cn(
              'w-[280px] justify-start text-left font-normal',
              !values?.date && 'text-muted-foreground',
            )}
          >
            <CalendarIcon className='w-4 h-4 mr-2' />
            {values?.date ? (
              format(values?.date, 'PPP')
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-auto p-0'>
          <Calendar
            disabled={{before: new Date()}}
            mode='single'
            selected={values?.date}
            onSelect={(format) => {
              form.clearErrors('date')
              form.setValue('date', format.toString())
            }}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      <p className='text-sm text-red-500'>
        {form.formState.errors.date?.message}
      </p>
    </div>
  )
}
