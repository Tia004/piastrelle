'use client'

import { useEffect, useState } from 'react'
import LanguageSwitcher from './LanguageSwitcher'

export default function Navbar({ dict, lang }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 80)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  /* Lock body scroll when menu is open */
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <>
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`} id="navbar">
        <a href={`/${lang}`} className="navbar-logo">
          Lumina Ceramiche
        </a>

        <div className="navbar-links">
          <a href={`/${lang}#collections`} className="navbar-link">{dict.nav.collections}</a>
          <a href={`/${lang}#projects`} className="navbar-link">{dict.nav.projects}</a>
          <a href={`/${lang}#innovation`} className="navbar-link">{dict.nav.innovation}</a>
          <a href={`/${lang}#sustainability`} className="navbar-link">{dict.nav.sustainability}</a>
        </div>

        <div className="navbar-actions">
          <div className="hidden md:block">
            <LanguageSwitcher currentLang={lang} />
          </div>
          <a href={`/${lang}#contact`} className="btn-b2b hidden md:inline-block">
            {dict.nav.b2b}
          </a>
          <button
            className="navbar-mobile-toggle"
            onClick={() => setMenuOpen(true)}
            aria-label={dict.nav.menu}
          >
            <span className="material-symbols-outlined">menu</span>
          </button>
        </div>
      </nav>

      {/* Mobile Fullscreen Menu */}
      <div className={`mobile-menu${menuOpen ? ' open' : ''}`}>
        <button className="mobile-menu-close font-label-technical" onClick={() => setMenuOpen(false)}>
          Close [X]
        </button>
        <a href={`/${lang}#collections`} className="mobile-menu-link" onClick={() => setMenuOpen(false)}>
          {dict.nav.collections}
        </a>
        <a href={`/${lang}#projects`} className="mobile-menu-link" onClick={() => setMenuOpen(false)}>
          {dict.nav.projects}
        </a>
        <a href={`/${lang}#innovation`} className="mobile-menu-link" onClick={() => setMenuOpen(false)}>
          {dict.nav.innovation}
        </a>
        <a href={`/${lang}#sustainability`} className="mobile-menu-link" onClick={() => setMenuOpen(false)}>
          {dict.nav.sustainability}
        </a>
        <div style={{ marginTop: 'auto', paddingTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <LanguageSwitcher currentLang={lang} />
          <a href={`/${lang}#contact`} className="btn-b2b text-center" onClick={() => setMenuOpen(false)}>
            {dict.nav.b2b}
          </a>
        </div>
      </div>
    </>
  )
}
