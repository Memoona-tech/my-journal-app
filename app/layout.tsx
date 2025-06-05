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
    ],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-base-100 text-base-content`}>
        {children}
      </body>
    </html>
  )
}
