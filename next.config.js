import path from 'path'

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.alias['@'] = path.resolve(process.cwd())
    config.resolve.alias['@components'] = path.resolve(process.cwd(), 'components')
    config.resolve.alias['@lib'] = path.resolve(process.cwd(), 'lib')
    config.resolve.alias['@contexts'] = path.resolve(process.cwd(), 'contexts')
    return config
  },
}

export default nextConfig
