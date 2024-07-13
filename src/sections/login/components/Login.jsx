'use client'

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
import {useEffect, useState, useTransition} from 'react'
import ICEyeActive from '@/components/icons/ICEyeActive'
import ICEyeActiveDisable from '@/components/icons/ICEyeActiveDisable'
import {login} from '@/actions/login'
import {setCookie} from '@/actions/setCookie'
import {useRouter} from 'next/navigation'
import CircleLoading from './CircleLoading'

//init schema
const formSchema = z.object({
  email: z
    .string()
    .min(1, {message: 'Vui lòng nhập email!'})
    .email({message: 'Nhập đúng định dạng email!'}),
  password: z
    .string()
    .min(1, {message: 'Vui lòng nhập mật khẩu!'})
    .min(6, {
      message: 'Phải có 6 kí tự trở lên, có chữ thường, chữ hoa và số!',
    })
    .regex(/[a-z]/, {
      message: 'Phải có 6 kí tự trở lên, có chữ thường, chữ hoa và số!',
    })
    .regex(/[A-Z]/, {
      message: 'Phải có 6 kí tự trở lên, có chữ thường, chữ hoa và số!',
    })
    .regex(/[0-9]/, {
      message: 'Phải có 6 kí tự trở lên, có chữ thường, chữ hoa và số!',
    }),
})

export default function Login() {
  const router = useRouter()

  const [isPending, startTransition] = useTransition()
  const [isShowPass, setIsShowPass] = useState(false)
  const [isFail, setIsFail] = useState(false)

  //init form
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: 'admin@gmail.com',
      password: 'Admin123!@#',
    },
  })

  useEffect(() => {
    const account = localStorage.getItem('account')
    if (account) {
      const accountJson = JSON.parse(account)
      form.reset({
        email: accountJson.email,
        password: accountJson.password,
      })
    }
  },[])

  //on submit
  function onSubmit(values) {
    startTransition(() => {
      try {
        const request = {
          api: '/auth/local',
          body: {
            identifier: values.email,
            password: values.password,
          },
        }
        login(request).then((res) => {
          if (res?.jwt) {
            setIsFail(false)
            setCookie({name: 'jwtBooking', value: res?.jwt})
            setCookie({ name: 'idBooking', value: res?.user?.id }).then(() => {
              localStorage.removeItem('account')
              router.push('/')
              router.refresh()
            })
          } else {
            setIsFail(true)
          }
        })
      } catch (error) {}
    })
  }
  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-8'
        >
          <FormField
            control={form.control}
            name='email'
            render={({field}) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='password'
            render={({field}) => (
              <FormItem>
                <FormLabel>Mật khẩu</FormLabel>
                <FormControl>
                  <div className='relative size-full'>
                    <Input
                      {...field}
                      type={isShowPass ? 'text' : 'password'}
                    />
                    <div
                      onClick={() => setIsShowPass((prev) => !prev)}
                      className='size-[1.5rem] absolute top-1/2 -translate-y-1/2 right-[1rem] flex justify-center items-center cursor-pointer'
                    >
                      {isShowPass ? (
                        <ICEyeActive />
                      ) : (
                        <ICEyeActiveDisable className='size-[1.2rem] ' />
                      )}
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {isFail && (
            <p className='text-sm font-medium text-destructive'>
              Thông tin tài khoản hoặc mật khẩu không chính xác
            </p>
          )}
          <Button className="min-w-[8rem]" type='submit'>
            {isPending ? <CircleLoading /> : 'Đăng nhập'}
          </Button>
        </form>
      </Form>
    </>
  )
}
