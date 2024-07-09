import {Inter} from 'next/font/google'
import './globals.css'
import Header from '@/layout/header/Header'
import { Toaster } from '@/components/ui/sonner'

const inter = Inter({subsets: ['latin']})

export const metadata = {
  title: 'Đặt bàn ăn',
  description: 'Generated by FINN IT',
}

export default function RootLayout({children}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Header />
        <div className='pt-[8rem] max-md:pt-[5rem]'>{children}</div>
        <Toaster richColors />
      </body>
    </html>
  )
}
