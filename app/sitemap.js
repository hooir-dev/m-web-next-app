import { languages } from './i18n/settings'
import { siteConfig } from '../config/site.js'

export default function sitemap() {
  const baseUrl = siteConfig.url

  // 基础路由
  const routes = [
    ''
  ]

  // 为每种语言生成 URL
  const urls = []

  languages.forEach(lng => {
    routes.forEach(route => {
      urls.push({
        url: `${baseUrl}/${lng}${route}`,
        lastModified: new Date().toISOString(),
        changeFrequency: route === '' ? 'weekly' : 'monthly',
        priority: route === '' ? 1.0 : 0.8,
      })
    })
  })

  return urls
}
