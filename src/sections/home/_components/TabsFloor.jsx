import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs'
import {initFloors} from './data'
import GridTable from './GridTable'
import getDataAuth from '@/lib/getDataAuth'

export default async function TabsFloor() {
    const request = {
      api: `/floors`,
      token: process.env.TOKEN,
    }
    const res = await getDataAuth(request)
  return (
    <Tabs
      defaultValue={1}
      className='container'
    >
      <TabsList className='grid w-full grid-cols-5 gap-x-[1rem] h-fit max-md:grid-cols-3 max-md:grid-rows-2'>
        {res?.data?.map((item) => (
          <TabsTrigger
            key={item?.id}
            value={item?.id}
            className='font-bold text-blue-800 text-[1.5rem] max-md:text-[1rem]'
          >
            {item?.attributes?.name}
          </TabsTrigger>
        ))}
      </TabsList>
      {res?.data?.map((item) => (
        <TabsContent
          key={item?.id}
          value={item?.id}
        >
          <GridTable id={item?.id} />
        </TabsContent>
      ))}
    </Tabs>
  )
}
