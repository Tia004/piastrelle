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
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
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
          <LanguageSwitcher currentLang={lang} />
          <a href={`/${lang}#contact`} className="btn btn-solid" style={{ padding: '0.5em 1.2em' }}>
            {dict.nav.b2b}
          </a>
          <button
            className="hamburger"
            onClick={() => setMenuOpen(true)}
            aria-label={dict.nav.menu}
          >
            <span className="hamburger-line" />
            <span className="hamburger-line" />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={`mobile-menu${menuOpen ? ' open' : ''}`}>
        <button className="mobile-menu-close" onClick={() => setMenuOpen(false)}>
          Close
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
        <div style={{ marginTop: 'auto', paddingTop: '2rem' }}>
          <LanguageSwitcher currentLang={lang} />
        </div>
      </div>
    </>
  )
}
