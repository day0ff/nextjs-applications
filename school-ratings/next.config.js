/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_API_KEY: process.env.GOOGLE_MAPS_API_KEY,
    NEXT_PRIVATE_SPREADSHEET_ID: process.env.SPREADSHEET_ID
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [{ loader: '@svgr/webpack', options: { icon: true } }]
    });

    return config;
  }
}

module.exports = nextConfig
