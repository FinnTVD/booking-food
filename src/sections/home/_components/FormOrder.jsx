'use client'

import {zodResolver} from '@hookform/resolvers/zod'
import {useForm} from 'react-hook-form'
import {z} from 'zod'
import CryptoJS from 'crypto-js'

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
import {useEffect, useState, useTransition} from 'react'
import {DateOrder} from './DateOrder'
import {convertStr2URL, fDate} from '@/lib/utils'
import {pickBy} from 'lodash'
import {useRouter} from 'next/navigation'
import Time from './Time'

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
  time: z.string().min(1, {message: 'Vui lòng không để trống'}),
  date: z.string().min(1, {message: 'Vui là chọn ngày'}),
  note: z.string(),
})

export default function ProfileForm({id, token, idTable, dataTable, user}) {
  const router = useRouter()
  const [isPending, setTransition] = useTransition()
  const [ip, setIp] = useState()

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user?.username || '',
      email: user?.email || '',
      phone: user?.phone || '',
      time: '',
      date: '',
      note: '',
    },
  })
  useEffect(() => {
    const getIp = async () => {
      try {
        const response = await fetch('https://api.ipify.org?format=json')
        const data = await response.json()
        if (data) {
          setIp(data.ip)
        }
      } catch (error) {
        console.error(error)
      }
    }
    getIp()
  }, [])

  const values = form.watch()

  function handleFormatDate(dateString) {
    // Tạo một đối tượng Date từ chuỗi ngày tháng
    const date = new Date(dateString)

    // Lấy ngày, tháng và năm từ đối tượng Date
    const day = date.getDate()
    const month = date.getMonth() + 1 // getMonth() trả về tháng từ 0-11, nên cần +1
    const year = date.getFullYear()

    // Định dạng ngày và tháng với hai chữ số (thêm số 0 nếu cần)
    const formattedDay = day < 10 ? `0${day}` : day
    const formattedMonth = month < 10 ? `0${month}` : month

    // Tạo chuỗi kết quả theo định dạng DD-MM-YYYY
    const formattedDate = `${formattedDay}-${formattedMonth}-${year}`
    return formattedDate
  }
  function onSubmit(value) {
    setTransition(async () => {
      const body = {
        data: {
          name: value.name,
          note: value.note,
          email: value.email,
          phone: value.phone,
          status: 'confirm',
          date: handleFormatDate(value.date),
          time: value.time,
          user: id,
          table:
            dataTable?.attributes?.name +
            ' - ' +
            'Tầng ' +
            dataTable?.attributes?.floor?.data?.id,
          price: dataTable?.attributes?.price,
        },
      }

      window?.localStorage?.setItem(
        'formDataPayment',
        JSON.stringify(body?.data),
      )

      // handlePayMent()
    })
  }
  const generateParams = (pickVpc = false) => {
    const reqParam = {
      AgainLink: process.env.NEXT_PUBLIC_DOMAIN,
      Title: 'Booking Food',
      vpc_AccessCode: '6BEB2546',
      vpc_Amount: dataTable?.attributes?.price + '00',
      vpc_CardList: 'null',
      vpc_Command: 'pay',
      vpc_Currency: 'VND',
      vpc_Locale: 'en',
      vpc_MerchTxnRef: Math.floor(Date.now() / 1000) + '_bk',
      vpc_Merchant: 'TESTONEPAY',
      vpc_OrderInfo:
        values.name +
        ' - ' +
        dataTable?.attributes?.name +
        ' - ' +
        dataTable?.attributes?.floor?.data?.attributes?.name,
      vpc_ReturnURL:
        process.env.NEXT_PUBLIC_DOMAIN + `/payment?idTable=${idTable}`,
      vpc_TicketNo: ip,
      vpc_Version: '2',
    }
    if (pickVpc) {
      const pickParams = pickBy(
        reqParam,
        (_, key) => key.startsWith('vpc_') || key.startsWith('user_'),
      )
      return convertStr2URL(pickParams)
    }
    return convertStr2URL(reqParam)
  }

  function handlePayMent() {
    const params = generateParams(true)
    const secretWordArray = CryptoJS.enc.Hex.parse(
      '6D0870CDE5F24F34F3915FB0045120DB',
    )
    const hash = CryptoJS.HmacSHA256(params, secretWordArray)
    const vpc_SecureHash = hash.toString(CryptoJS.enc.Hex).toUpperCase()
    router.push(
      `https://mtf.onepay.vn/paygate/vpcpay.op?${generateParams(
        false,
      )}&vpc_SecureHash=${vpc_SecureHash}`,
    )
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
            form={form}
            values={values}
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
                {/* <Time form={form} /> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            className='cursor-pointer'
            type='submit'
          >
            Thanh Toán
          </Button>
        </form>
      </Form>
    </div>
  )
}
