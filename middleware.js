import { NextResponse } from 'next/server'
import acceptLanguage from 'accept-language'
import { fallbackLng, languages, cookieName, headerName } from './app/i18n/settings'

acceptLanguage.languages(languages)

export const config = {
  // 排除 API 路径、静态资源、SEO 文件等，避免国际化处理
  matcher: ['/((?!api|prod-api|_next/static|_next/image|assets|images|favicon.ico|sw.js|site.webmanifest|sitemap.xml|robots.txt|manifest.json).*)']
}

export function middleware(req) {
  if (req.nextUrl.pathname.indexOf('icon') > -1 || req.nextUrl.pathname.indexOf('chrome') > -1) return NextResponse.next()
  
  let lng
  if (req.cookies.has(cookieName)) lng = acceptLanguage.get(req.cookies.get(cookieName).value)
  if (!lng) lng = acceptLanguage.get(req.headers.get('Accept-Language'))
  if (!lng) lng = fallbackLng

  const lngInPath = languages.find(loc => req.nextUrl.pathname.startsWith(`/${loc}`))
  const headers = new Headers(req.headers)
  headers.set(headerName, lngInPath || lng)

  // 如果是根路径且没有语言前缀，重写到默认语言路径（不重定向）
  if (req.nextUrl.pathname === '/') {
    return NextResponse.rewrite(new URL(`/${lng}`, req.url), { headers })
  }

  // 如果路径没有语言前缀且不是 _next 路径，重写到默认语言路径
  if (
    !lngInPath &&
    !req.nextUrl.pathname.startsWith('/_next') &&
    !req.nextUrl.pathname.startsWith('/api')
  ) {
    return NextResponse.rewrite(new URL(`/${lng}${req.nextUrl.pathname}${req.nextUrl.search}`, req.url), { headers })
  }

  if (req.headers.has('referer')) {
    const refererUrl = new URL(req.headers.get('referer'))
    const lngInReferer = languages.find((l) => refererUrl.pathname.startsWith(`/${l}`))
    const response = NextResponse.next({ headers })
    if (lngInReferer) response.cookies.set(cookieName, lngInReferer)
    return response
  }

  return NextResponse.next({ headers })
}
