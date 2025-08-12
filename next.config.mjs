
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['res.cloudinary.com', 'imagedelivery.net'],
  },
  env: {
    NEXT_PUBLIC_ONCHAINKIT_API_KEY: process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY || 'demo-key',
    NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME: 'SocialBet Arena',
    NEXT_PUBLIC_ICON_URL: '/icon.png',
  },
}

export default nextConfig
