import Image from 'next/image'
import Link from 'next/link'
import Account from './components/Account'

export default function Header() {
  return (
    <header className='flex items-center justify-center h-[5rem] fixed top-0 left-0 z-50 w-screen bg-white max-md:h-[4rem]'>
      <nav className='container flex items-center justify-between h-full'>
        <Link href={'/'}>
          <Image
            className='size-[4rem] object-cover max-md:size-[3rem] rounded-[0.5rem]'
            src={'/logo.jfif'}
            alt='logo'
            width={100}
            height={100}
            quality={90}
            priority
          />
        </Link>
        <Account />
      </nav>
    </header>
  )
}
