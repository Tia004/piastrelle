'use client'

import { usePathname, useRouter } from 'next/navigation'

const locales = ['it', 'en', 'es']

export default function LanguageSwitcher({ currentLang }) {
  const pathname = usePathname()
  const router = useRouter()

  function switchLocale(locale) {
    /* Replace the current locale prefix with the new one */
    const segments = pathname.split('/')
    segments[1] = locale
    router.push(segments.join('/'))
  }

  return (
    <div className="lang-switcher">
      {locales.map((locale) => (
        <button
          key={locale}
          className={`lang-btn${currentLang === locale ? ' active' : ''}`}
          onClick={() => switchLocale(locale)}
          aria-label={`Switch to ${locale.toUpperCase()}`}
        >
          {locale.toUpperCase()}
        </button>
      ))}
    </div>
  )
}
