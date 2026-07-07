'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useState, useRef, useEffect } from 'react'

const languageMap = {
  it: { label: 'IT', name: 'Italiano', flag: '🇮🇹' },
  en: { label: 'EN', name: 'English', flag: '🇬🇧' },
  es: { label: 'ES', name: 'Español', flag: '🇪🇸' }
}

export default function LanguageSwitcher({ currentLang }) {
  const pathname = usePathname()
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  function switchLocale(locale) {
    const segments = pathname.split('/')
    segments[1] = locale
    router.push(segments.join('/'))
    setIsOpen(false)
  }

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const current = languageMap[currentLang] || languageMap.it

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 border-2 border-[#F5F0E8] text-[#F5F0E8] font-mono text-[11px] uppercase tracking-wider hover:bg-[#F5F0E8] hover:text-[#1A1A1A] transition-colors"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span>{current.flag}</span>
        <span>{current.label}</span>
        <span 
          className="material-symbols-outlined text-[12px] transition-transform duration-200" 
          style={{ transform: isOpen ? 'rotate(180deg)' : 'none', fontSize: '12px', display: 'inline-block' }}
        >
          expand_more
        </span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-[#1A1A1A] border-2 border-[#F5F0E8] z-[1100]">
          <div className="py-1">
            {Object.entries(languageMap).map(([locale, info]) => (
              <button
                key={locale}
                onClick={() => switchLocale(locale)}
                className={`flex items-center gap-3 w-full px-4 py-3 text-left font-mono text-[11px] uppercase tracking-wider transition-colors ${
                  currentLang === locale
                    ? 'bg-[#F5F0E8] text-[#1A1A1A]'
                    : 'text-[#F5F0E8] hover:bg-[#2A2A28]'
                }`}
              >
                <span>{info.flag}</span>
                <span>{info.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
