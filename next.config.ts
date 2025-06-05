// next.config.ts
import withPWA from 'next-pwa'

const baseConfig = {
  reactStrictMode: true,
}

export default withPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
})(baseConfig)
