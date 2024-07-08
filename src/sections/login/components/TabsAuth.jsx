import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs'
import Login from './Login'
import Register from './Register'

export default function TabsAuth() {
  return (
    <Tabs
      defaultValue='login'
      className='w-[400px] max-md:w-full max-md:px-[1rem]'
    >
      <TabsList className='grid w-full grid-cols-2'>
        <TabsTrigger value='login'>Đăng nhập</TabsTrigger>
        <TabsTrigger value='register'>Đăng ký</TabsTrigger>
      </TabsList>
      <TabsContent value='login'>
        <Login />
      </TabsContent>
      <TabsContent value='register'>
        <Register />
      </TabsContent>
    </Tabs>
  )
}
