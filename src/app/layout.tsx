import { ChakraProvider } from '@/components/ui/provider'
import { MainSocketServiceContextProvider } from '@/contexts/MainSocketServiceContext'
import type { Metadata } from 'next'
import { Geist_Mono } from 'next/font/google'

import './global.css'
import { Toaster } from '@/components/ui/toaster'

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Termina.ai',
  description: 'O fim do amor com apoio técnico',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='pt-BR' suppressHydrationWarning>
      <body className={`${geistMono.variable}`}>
        <ChakraProvider>
          <MainSocketServiceContextProvider>
            {children}

            <Toaster />
          </MainSocketServiceContextProvider>
        </ChakraProvider>
      </body>
    </html>
  )
}
