'use client'
import '@/globals.css'
import {useState, useEffect, useContext, createContext} from 'react';
import {useRouter} from 'next/navigation';
import Header from '@/components/header'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

// export const metadata = {
//   title: 'Scheduler',
//   description: 'Look at the time, create plans, see your analytics, all in the Scheduler app',
// }
// export const newContext = createContext(null)

export default function RootLayout({ children }) {

// console.log('Email: ', email)
  return (
    // <newContext.Provider value={{username, register, registerWithGoogle, errorState, email, password}} >
      <html lang="en">
        <body className={inter.className}>
          <div className='w-screen h-screen'>
              <Header className='z-40'/>
              <div className='w-screen h-[92%] z-30'>
                {children}
              </div>
          </div>
        </body>
      </html>
    // </newContext.Provider>
  )
}
