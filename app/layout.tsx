import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const viewport = {
  themeColor: '#ffffff',
}

export const metadata = {
  title: 'SkyCarly 🌷',
  description: 'Write your thoughts beautifully.',
  icons: {
    icon: [
      {
        url: '/favicon.ico',
        rel: 'icon',
      },
      {
        url: '/tulip (3).png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        url: '/tulip (3).png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={`${inter.className} bg-base-100 text-base-content`}>
        {children}
      </body>
    </html>
  )
}
