import Head from 'next/head'
import { siteConfig } from '@/config/site'

export function SEOHead({ 
  title, 
  description, 
  keywords = [], 
  image, 
  url,
  locale = 'en',
  type = 'website',
  noIndex = false 
}) {
  const siteTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.name
  const siteDescription = description || siteConfig.seo.defaultDescription
  const siteImage = image || `${siteConfig.url}/images/og-image-${locale}.jpg`
  const siteUrl = url || siteConfig.url

  return (
    <Head>
      {/* 基础 Meta 标签 */}
      <title>{siteTitle}</title>
      <meta name="description" content={siteDescription} />
      {keywords.length > 0 && (
        <meta name="keywords" content={keywords.join(', ')} />
      )}
      
      {/* 机器人指令 */}
      <meta 
        name="robots" 
        content={noIndex ? 'noindex,nofollow' : 'index,follow'} 
      />
      
      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={siteDescription} />
      <meta property="og:image" content={siteImage} />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:site_name" content={siteConfig.name} />
      <meta property="og:locale" content={locale} />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={siteDescription} />
      <meta name="twitter:image" content={siteImage} />
      <meta name="twitter:site" content={siteConfig.creator} />
      <meta name="twitter:creator" content={siteConfig.creator} />
      
      {/* 规范链接 */}
      <link rel="canonical" href={siteUrl} />
      
      {/* 主题颜色 */}
      <meta name="theme-color" content={siteConfig.themeColors[0].color} />
      <meta name="msapplication-TileColor" content={siteConfig.themeColors[1].color} />
      
      {/* 移动设备优化 */}
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="format-detection" content="telephone=no" />
      
      {/* 安全和隐私 */}
      <meta name="referrer" content="origin-when-cross-origin" />
    </Head>
  )
}
