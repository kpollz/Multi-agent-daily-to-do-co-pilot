import path from 'path'

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    const projectRoot = path.resolve(process.cwd())
    
    // Configure aliases to match TypeScript paths
    // Always preserve existing aliases first
    const existingAlias = config.resolve.alias || {}
    
    config.resolve.alias = {
      ...existingAlias,
      '@': projectRoot,
      '@components': path.resolve(projectRoot, 'components'),
      '@lib': path.resolve(projectRoot, 'lib'),
      '@contexts': path.resolve(projectRoot, 'contexts'),
    }
    
    return config
  },
}

export default nextConfig
