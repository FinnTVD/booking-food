'use client'
// {
//     "data": {
//             "name": "Test3",
//             "note": "Test3",
//             "status": "processing",
//             "email": "trinhvanduc3@gmail.com",
//             "phone": "0333666998",
//             "dateandtime": "2024-06-04T08:30:00.000Z",
//             "user": 3,
//             "table": 4
//     }
// }
import {zodResolver} from '@hookform/resolvers/zod'
import {useForm} from 'react-hook-form'
import {z} from 'zod'

import {Button} from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {Input} from '@/components/ui/input'
import {useState, useTransition} from 'react'
import {DateOrder} from './DateOrder'
import {createOrder} from '@/actions/createOrder'

const formSchema = z.object({
  name: z.string().min(1, {message: 'Vui lòng không để trống'}),
  email: z
    .string()
    .min(1, {message: 'Vui lòng không để trống'})
    .email({message: 'Nhập đúng định dạng email'}),
  phone: z
    .string()
    .min(1, {message: 'Vui lòng nhập số điện thoại'})
    .regex(
      /^(999|998|997|996|995|994|993|992|991|990|979|978|977|976|975|974|973|972|971|970|969|968|967|966|965|964|963|962|961|960|899|898|897|896|895|894|893|892|891|890|889|888|887|886|885|884|883|882|881|880|879|878|877|876|875|874|873|872|871|870|859|858|857|856|855|854|853|852|851|850|839|838|837|836|835|834|833|832|831|830|809|808|807|806|805|804|803|802|801|800|699|698|697|696|695|694|693|692|691|690|689|688|687|686|685|684|683|682|681|680|679|678|677|676|675|674|673|672|671|670|599|598|597|596|595|594|593|592|591|590|509|508|507|506|505|504|503|502|501|500|429|428|427|426|425|424|423|422|421|420|389|388|387|386|385|384|383|382|381|380|379|378|377|376|375|374|373|372|371|370|359|358|357|356|355|354|353|352|351|350|299|298|297|296|295|294|293|292|291|290|289|288|287|286|285|284|283|282|281|280|269|268|267|266|265|264|263|262|261|260|259|258|257|256|255|254|253|252|251|250|249|248|247|246|245|244|243|242|241|240|239|238|237|236|235|234|233|232|231|230|229|228|227|226|225|224|223|222|221|220|219|218|217|216|215|214|213|212|211|210|98|95|94|93|92|91|90|86|84|0|82|81|66|65|64|63|62|61|60|58|57|56|55|54|53|52|51|49|48|47|46|45|44|43|41|40|39|36|34|33|32|31|30|27|20|7|1)[0-9]{0,14}$/,
      {message: 'Định dạng không hợp lệ'},
    ),
  // date: z.string().min(1, {message: 'Vui lòng không để trống'}),
  time: z.string().min(1, {message: 'Vui lòng không để trống'}),
  note: z.string(),
})

export function ProfileForm({id, token, idTable}) {
  const [isPending, setTransition] = useTransition()
  const [date, setDate] = useState()

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      time: '',
      note: '',
    },
  })
  function handleFormatDate(dateString) {
    let date = new Date(dateString)
    let isoDate = date.toISOString()
    date.setTime(date.getTime() + 7 * 60 * 60 * 1000)
    let newIsoDate = date.toISOString()
    return newIsoDate
  }

  function handleMergeDateAndTime(dateString, timeString) {
    const isoDateString = handleFormatDate(dateString)
    const date = new Date(isoDateString)
    const datePart = date.toISOString().split('T')[0]
    const [hours, minutes] = timeString.split(':')
    const mergedDate = new Date(`${datePart}T${hours}:${minutes}:00.000Z`)
    mergedDate.setHours(mergedDate.getHours() - 7)
    const mergedISOString = mergedDate.toISOString()
    return mergedISOString
  }
  function onSubmit(values) {
    setTransition(async () => {
      const body = {
        data: {
          name: values.name,
          note: values.note,
          email: values.email,
          phone: values.phone,
          status: 'processing',
          dateandtime: handleMergeDateAndTime(date, values.time),
          user: id,
          table: idTable,
        },
      }
      const formdata = new FormData()
      formdata.append('entry.1302347709', values.name)
      formdata.append('entry.2068127557', values.email)
      formdata.append('entry.746753759', values.phone)
      formdata.append(
        'entry.1638872290',
        handleMergeDateAndTime(date, values.time),
      )
      formdata.append('entry.1725351599', values.note)
      formdata.append('entry.2107664396', 'processing')
      formdata.append('entry.423096853', idTable)
      formdata.append('entry.344451594', id)
      const res = await fetch(
        'https://docs.google.com/forms/u/0/d/e/1FAIpQLSeYDJntbTgoRJF-azx_urnO6ywTb7KFsj1vCsJvQtPQx15n8g/formResponse',
        {
          method: 'POST',
          body: formdata,
          mode: 'no-cors',
        },
      )
      const request = {
        api: `/orders`,
        token: token,
        body: JSON.stringify(body),
      }
      // createOrder(request)
      //   .then((res) => {
      //     console.log('🚀 ~ .then ~ res:', res)
      //   })
      //   .catch((error) => {
      //     console.log('🚀 ~ createOrder ~ error:', error)
      //   })
    })
  }

  return (
    <div className='p-[2rem] max-md:p-[0.5rem] max-md:h-[60vh] max-md:overflow-y-auto'>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-8'
        >
          <FormField
            control={form.control}
            name='name'
            render={({field}) => (
              <FormItem>
                <FormLabel>Họ và tên:</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='email'
            render={({field}) => (
              <FormItem>
                <FormLabel>Email:</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='phone'
            render={({field}) => (
              <FormItem>
                <FormLabel>Số điện thoại:</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    onChange={(e) => {
                      const value = e.target.value
                      const filteredValue = value.replace(/[^\d]/g, '')
                      field.onChange(filteredValue)
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='note'
            render={({field}) => (
              <FormItem>
                <FormLabel>Ghi chú:</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <DateOrder
            setDate={setDate}
            date={date}
          />
          <FormField
            control={form.control}
            name='time'
            render={({field}) => (
              <FormItem>
                <FormLabel>Thời gian:</FormLabel>
                <FormControl>
                  <Input
                    type='time'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit'>Submit</Button>
        </form>
      </Form>
    </div>
  )
}
