import { siteConfig } from '@/config/site'
import { languages, localeMapping } from '@/app/i18n/settings'
import { getT } from '@/app/i18n'

/**
 * 构建页面元数据
 * @param {Object} params - 元数据参数
 * @param {string} params.page - 页面名称
 * @param {string} params.title - 页面标题
 * @param {string} params.description - 页面描述
 * @param {string[]} params.images - 图片数组
 * @param {boolean} params.noIndex - 是否禁止索引
 * @param {string} params.locale - 语言代码
 * @param {string} params.path - 页面路径
 * @param {string} params.canonicalUrl - 规范链接
 * @returns {Promise<Object>} Next.js Metadata 对象
 */
export async function constructMetadata({
  page = 'Home',
  title,
  description,
  images = [],
  noIndex = false,
  locale,
  path = '/',
  canonicalUrl,
}) {
  const { t } = await getT('translation', { lng: locale })

  const pageTitle = title || t('title')
  const pageDescription = description || t('description')

  // 构建最终标题
  const finalTitle = page === 'Home'
    ? pageTitle
    : `${pageTitle} | ${siteConfig.name}`

  // 构建规范链接
  const finalCanonicalUrl = canonicalUrl || path
  const fullCanonicalUrl = `${siteConfig.url}/${locale}${finalCanonicalUrl === '/' ? '' : finalCanonicalUrl}`

  // 构建语言替代链接
  const alternateLanguages = {}
  languages.forEach(lang => {
    const langPath = finalCanonicalUrl === '/' ? '' : finalCanonicalUrl
    alternateLanguages[localeMapping[lang]] = `${siteConfig.url}/${lang}${langPath}`
  })

  // 构建 Open Graph 图片
  const imageUrls = images.length > 0
    ? images.map(img => ({
        url: img.startsWith('http') ? img : `${siteConfig.url}${img}`,
        width: 1200,
        height: 630,
        alt: pageTitle,
      }))
    : [{
        url: `${siteConfig.url}/images/og-image-${locale}.jpg`,
        width: 1200,
        height: 630,
        alt: pageTitle,
      }]

  // 构建页面 URL
  const pageURL = `/${locale}${path === '/' ? '' : path}`

  // 构建结构化数据
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": t('company.name'),
    "url": siteConfig.url,
    "logo": `${siteConfig.url}/images/logo.png`,
    "description": pageDescription,
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
      "availableLanguage": languages.map(lang => {
        const langNames = {
          'en': 'English',
          'de': 'German',
          'fr': 'French',
          'zh': 'Chinese'
        }
        return langNames[lang]
      })
    }
  }

  return {
    title: finalTitle,
    description: pageDescription,
    authors: siteConfig.authors,
    creator: siteConfig.creator,
    publisher: siteConfig.name,
    metadataBase: new URL(siteConfig.url),
    
    // 规范链接和语言替代
    alternates: {
      canonical: fullCanonicalUrl,
      languages: alternateLanguages,
    },

    // Open Graph 标签
    openGraph: {
      type: 'website',
      locale: localeMapping[locale],
      url: `${siteConfig.url}${pageURL}`,
      title: finalTitle,
      description: pageDescription,
      siteName: t('company.name'),
      images: imageUrls,
    },

    // Twitter Card 标签
    twitter: {
      card: 'summary_large_image',
      title: finalTitle,
      description: pageDescription,
      site: siteConfig.socialLinks.twitter,
      images: imageUrls.map(img => img.url),
      creator: siteConfig.creator,
    },

    // 机器人指令
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },

    // 其他元标签
    other: {
      'theme-color': siteConfig.themeColors[0].color,
      'msapplication-TileColor': siteConfig.themeColors[1].color,
      'apple-mobile-web-app-capable': 'yes',
      'apple-mobile-web-app-status-bar-style': 'default',
      'format-detection': 'telephone=no',
      'application/ld+json': JSON.stringify(structuredData),
    },

    // 图标配置
    icons: siteConfig.icons,
  }
}

/**
 * 构建视窗配置
 * @returns {Object} Next.js Viewport 对象
 */
export function constructViewport() {
  return {
    themeColor: siteConfig.themeColors,
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  }
}
