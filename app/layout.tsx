// app/layout.tsx
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

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
        url: '/public/tulip (3).png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        url: '/public/tulip (3).png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  },
  themeColor: '#ffffff',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body className={`${inter.className} bg-base-100 text-base-content`}>
        {children}
      </body>
    </html>
  )
}
