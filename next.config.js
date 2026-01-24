import path from 'path'

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    const projectRoot = path.resolve(process.cwd())
    
    // Get existing aliases
    const existingAlias = config.resolve.alias || {}
    
    // Configure aliases - must match TypeScript paths exactly
    config.resolve.alias = {
      ...existingAlias,
      '@': projectRoot,
      '@components': path.resolve(projectRoot, 'components'),
      '@lib': path.resolve(projectRoot, 'lib'),
      '@contexts': path.resolve(projectRoot, 'contexts'),
    }
    
    // Ensure extensions are resolved (important for .ts/.tsx files)
    if (!config.resolve.extensions) {
      config.resolve.extensions = []
    }
    
    // Prepend our extensions to ensure they're checked first
    const defaultExtensions = ['.tsx', '.ts', '.jsx', '.js', '.json']
    const existingExtensions = config.resolve.extensions.filter(
      (ext) => !defaultExtensions.includes(ext)
    )
    config.resolve.extensions = [...defaultExtensions, ...existingExtensions]
    
    return config
  },
}

export default nextConfig
