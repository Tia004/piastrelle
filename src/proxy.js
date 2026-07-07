import { NextResponse } from 'next/server'

const locales = ['it', 'en', 'es']
const defaultLocale = 'it'

function getLocale(request) {
  const acceptLanguage = request.headers.get('accept-language') || ''
  
  /* Parse Accept-Language header and find best match */
  const preferred = acceptLanguage
    .split(',')
    .map((lang) => {
      const [code, q] = lang.trim().split(';q=')
      return { code: code.split('-')[0].toLowerCase(), q: q ? parseFloat(q) : 1 }
    })
    .sort((a, b) => b.q - a.q)

  for (const { code } of preferred) {
    if (locales.includes(code)) return code
  }

  return defaultLocale
}

export function proxy(request) {
  const { pathname } = request.nextUrl

  /* Check if a supported locale is already in the path */
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (pathnameHasLocale) return

  /* Redirect to the detected locale */
  const locale = getLocale(request)
  request.nextUrl.pathname = `/${locale}${pathname}`
  return NextResponse.redirect(request.nextUrl)
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
}
