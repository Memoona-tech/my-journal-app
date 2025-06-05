// next.config.ts
import withPWA from 'next-pwa'

const nextConfig = {
  reactStrictMode: true,
  // any other config
}

export default withPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
})(nextConfig)
