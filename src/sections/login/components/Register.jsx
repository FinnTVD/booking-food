'use client'

import {zodResolver} from '@hookform/resolvers/zod'
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
import ICEyeActive from '@/components/icons/ICEyeActive'
import ICEyeActiveDisable from '@/components/icons/ICEyeActiveDisable'
import {register} from '@/actions/register'
import {toast} from 'sonner'
import {useForm} from 'react-hook-form'
import CircleLoading from './CircleLoading'

//init schema
const formSchema = z
  .object({
    username: z.string().min(1, {
      message: 'Vui lòng nhập họ và tên',
    }),
    email: z
      .string()
      .min(1, {message: 'Vui lòng nhập email!'})
      .email({message: 'Nhập đúng định dạng email'}),
    phone: z.string().min(1, {message: 'Vui lòng nhập sdt'}),
    password: z
      .string()
      .min(1, {message: 'Vui lòng nhập mật khẩu'})
      .min(6, {
        message: 'Phải có 6 kí tự trở lên, có chữ thường, chữ hoa và số',
      })
      .regex(/[a-z]/, {
        message: 'Phải có 6 kí tự trở lên, có chữ thường, chữ hoa và số',
      })
      .regex(/[A-Z]/, {
        message: 'Phải có 6 kí tự trở lên, có chữ thường, chữ hoa và số',
      })
      .regex(/[0-9]/, {
        message: 'Phải có 6 kí tự trở lên, có chữ thường, chữ hoa và số',
      }),
    confirmPassword: z
      .string()
      .min(1, {message: 'Vui lòng nhập mật khẩu!'})
      .min(6, {
        message: 'Phải có 6 kí tự trở lên, có chữ thường, chữ hoa và số!',
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Xác thực mật khẩu chưa khớp!',
    path: ['confirmPassword'],
  })

export default function Register() {
  const [isPending, startTransition] = useTransition()
  const [isShowPass, setIsShowPass] = useState(false)
  const [isFail, setIsFail] = useState(false)
  //init form
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
    },
  })

  //on submit
  function onSubmit(values) {
    startTransition(() => {
      try {
        const request = {
          api: '/auth/local/register',
          body: {
            username: values.username,
            email: values.email,
            phone: values.phone,
            password: values.password,
          },
        }
        register(request).then((res) => {
          if (res?.jwt) {
            toast.success('Đăng ký tài khoản thành công.', {
              duration: 3000,
              position: 'top-center',
            })
            const account = {
              email: values.email,
              password: values.password,
            }
            localStorage.setItem('account', JSON.stringify(account))
          } else {
            setIsFail(true)
          }
        })
      } catch (error) {
        console.log('🚀 ~ startTransition ~ error:', error)
      }
    })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-8'
      >
        <FormField
          control={form.control}
          name='username'
          render={({field}) => (
            <FormItem>
              <FormLabel>Họ và tên</FormLabel>
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
          name='phone'
          render={({field}) => (
            <FormItem>
              <FormLabel>Số điện thoại</FormLabel>
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
        <FormField
          control={form.control}
          name='confirmPassword'
          render={({field}) => (
            <FormItem>
              <FormLabel>Xác nhận mật khẩu</FormLabel>
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
        <Button
          className='min-w-[8rem]'
          type='submit'
        >
          {isPending ? <CircleLoading /> : 'Đăng ký'}
        </Button>
      </form>
    </Form>
  )
}
