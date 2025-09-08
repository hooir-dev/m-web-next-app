/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // 生产环境配置
  output: 'standalone',
  experimental: {
    serverComponentsExternalPackages: []
  },

  // 开发环境 API 代理配置
  async rewrites() {
    return [
      {
        // 代理所有 /prod-api/* 请求到后端 Java API
        source: '/prod-api/:path*',
        destination: process.env.API_BASE_URL || 'http://admin.manetmesh.com/prod-api/:path*'
      }
    ]
  },

  // 开发环境配置
  ...(process.env.NODE_ENV === 'development' && {
    // 开发环境下禁用一些优化以提升开发体验
    swcMinify: false,
    // 启用更详细的错误信息
    productionBrowserSourceMaps: true
  })
}

module.exports = nextConfig
