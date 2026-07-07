import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { BBH_Bartle, DM_Sans } from 'next/font/google'
import './globals.css'

const heading = BBH_Bartle({
  subsets: ['latin'],
  variable: '--font-heading',
})

const body = DM_Sans({
  subsets: ['latin'],
  variable: '--font-body',
})

export const metadata: Metadata = {
  title: 'Robotics Club UCE',
  description:
    'The premier collegiate engineering club at UCE. Technical workshops, coding competitions, gaming tournaments, and innovative hardware/software projects.',
  generator: 'v0.app',
  icons: {
    icon: [{ url: '/images/logo.png' }],
    apple: '/images/logo.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#8b7bd8',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`bg-background ${heading.variable} ${body.variable}`}>
      <body className="antialiased font-sans">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
