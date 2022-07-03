/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_API_KEY: process.env.GOOGLE_MAPS_API_KEY,
    NEXT_PRIVATE_SPREADSHEET_ID: process.env.SPREADSHEET_ID
  },
}

module.exports = nextConfig
