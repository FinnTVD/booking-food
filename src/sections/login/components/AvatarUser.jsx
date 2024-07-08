import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar'
import MenuAccount from './MenuAccount'

export default function AvatarUser({data}) {
  return (
    <MenuAccount>
      <Avatar className='cursor-pointer'>
        <AvatarImage
          src={
            data?.avatar?.formats?.thumbnail?.url
              ? process.env.NEXT_PUBLIC_BE +
                data?.avatar?.formats?.thumbnail?.url
              : 'https://github.com/shadcn.png'
          }
          alt='@shadcn'
        />
        <AvatarFallback>BK</AvatarFallback>
      </Avatar>
    </MenuAccount>
  )
}
