import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs'
import {initFloors} from './data'
import GridTable from './GridTable'

export default function TabsFloor() {
  return (
    <Tabs
      defaultValue='floor1'
      className='container'
    >
      <TabsList className='grid w-full grid-cols-5 gap-x-[1rem] h-fit max-md:grid-cols-3 max-md:grid-rows-2'>
        {initFloors.map((item) => (
          <TabsTrigger
            key={item.id}
            value={item.value}
            className='font-bold text-blue-800 text-[1.5rem] max-md:text-[1rem]'
          >
            {item.name}
          </TabsTrigger>
        ))}
      </TabsList>
      {initFloors.map((item) => (
        <TabsContent
          key={item.id}
          value={item.value}
        >
          <GridTable id={item.id} />
        </TabsContent>
      ))}
    </Tabs>
  )
}
