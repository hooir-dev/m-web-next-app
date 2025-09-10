import './global.css'

import { dir } from 'i18next'
import { languages } from '../i18n/settings'
import { constructMetadata, constructViewport } from '@/lib/metadata'
import { fontSans, getFontClassName, fontPreloadLinks } from '@/lib/fonts'
import { cn, generateStructuredData, isDevelopment } from '@/lib/utils'
import { siteConfig } from '@/config/site'
import GoogleAnalytics from "@/app/GoogleAnalytics"
import CrispChat from "@/app/CrispChat"
import { getT } from '../i18n'

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }))
}

export async function generateMetadata({ params }) {
  const { lng } = await params

  return await constructMetadata({
    page: 'Home',
    locale: lng,
    path: '/',
  })
}

export const viewport = constructViewport()

export default async function RootLayout({
  children,
  params
}) {
  const { lng } = await params
  const { t } = await getT('translation', { lng })

  // 生成结构化数据
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": t('company.name'),
    "url": siteConfig.url,
    "logo": `${siteConfig.url}/images/logo.png`,
    "description": t('description'),
    "foundingDate": siteConfig.company.foundingDate,
    "industry": siteConfig.company.industry,
    "address": {
      "@type": "PostalAddress",
      "addressCountry": siteConfig.company.address.country
    },
    "sameAs": [
      siteConfig.socialLinks.linkedin,
      siteConfig.socialLinks.twitter,
      siteConfig.socialLinks.github
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Customer Service",
      "availableLanguage": ["English", "German", "French", "Chinese"]
    }
  }

  return (
    <html
      lang={lng}
      dir={dir(lng)}
      className={getFontClassName(lng)}
      suppressHydrationWarning
    >
      <head>
        {/* 字体预加载 */}
        {fontPreloadLinks.map((link, index) => (
          <link key={index} {...link} />
        ))}

        {/* Favicon 和 App Icons */}
        <link rel="icon" href={siteConfig.icons.icon} sizes="any" />
        <link rel="icon" href={siteConfig.icons.shortcut} type="image/svg+xml" />
        <link rel="apple-touch-icon" href={siteConfig.icons.apple} />
        <link rel="manifest" href="/manifest.json" />

        {/* 结构化数据 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={generateStructuredData(structuredData)}
        />

        {/* DNS 预取和预连接 */}
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />

        {/* 性能提示 */}
        <meta httpEquiv="x-dns-prefetch-control" content="on" />

        {/* 安全和隐私 */}
        <meta name="referrer" content="origin-when-cross-origin" />
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          "flex flex-col"
        )}
      >
        {/* 跳转到主要内容的链接（无障碍访问） */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-primary-foreground px-4 py-2 rounded-md z-50 transition-all"
          aria-label={t('navigation.skipToContent', 'Skip to main content')}
        >
          {t('navigation.skipToContent', 'Skip to main content')}
        </a>

        {/* 主要内容容器 */}
        <div className="flex-1 flex flex-col">
          <main id="main-content" role="main" className="flex-1">
            {children}
          </main>
        </div>

        {/* 分析和追踪脚本 */}
        {!isDevelopment() && (
          <>
            <GoogleAnalytics />
            <CrispChat />
          </>
        )}
      </body>
    </html>
  )
}
