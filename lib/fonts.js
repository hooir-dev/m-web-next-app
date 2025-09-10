import { Inter, Noto_Sans_SC } from 'next/font/google'

// 主字体 - Inter (支持拉丁字符)
export const fontSans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial'],
})

// 中文字体 - Noto Sans SC
export const fontChinese = Noto_Sans_SC({
  subsets: ['latin'],
  variable: '--font-chinese',
  display: 'swap',
  preload: false, // 按需加载
  weight: ['300', '400', '500', '700'],
  fallback: ['PingFang SC', 'Microsoft YaHei', 'sans-serif'],
})

// 获取字体类名的工具函数
export function getFontClassName(locale) {
  const baseClasses = fontSans.variable
  
  // 为中文添加中文字体支持
  if (locale === 'zh') {
    return `${baseClasses} ${fontChinese.variable}`
  }
  
  return baseClasses
}

// 字体预加载配置
export const fontPreloadLinks = [
  {
    rel: 'preconnect',
    href: 'https://fonts.googleapis.com',
  },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  },
]
