'use client'

import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'

/* ─── Nav links ─── */
const NAV_LINKS = (lang, dict) => [
  { label: dict.nav.collections,    href: `/${lang}#collections`    },
  { label: dict.nav.projects,       href: `/${lang}#projects`       },
  { label: dict.nav.innovation,     href: `/${lang}#innovation`     },
  { label: dict.nav.sustainability, href: `/${lang}#sustainability`  },
  { label: dict.nav.contact,        href: `/${lang}#contact`        },
]

const LANGS = [
  { code: 'it', label: 'Italiano', flag: '🇮🇹' },
  { code: 'en', label: 'English',  flag: '🇬🇧' },
  { code: 'es', label: 'Español',  flag: '🇪🇸' },
]

/* ─── Animation variants (no y/x transforms — only opacity/scale on inner elements) ─── */
const backdropVariants = {
  closed: { opacity: 0, transition: { duration: 0.3, ease: 'easeIn' } },
  open:   { opacity: 1, transition: { duration: 0.35, ease: 'easeOut' } },
}

const panelVariants = {
  closed: {
    clipPath: 'inset(0 0 100% 0)',
    transition: { duration: 0.45, ease: [0.76, 0, 0.24, 1] },
  },
  open: {
    clipPath: 'inset(0 0 0% 0)',
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  },
}

const linkVariants = {
  closed: { opacity: 0, x: -24 },
  open: (i) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: 0.15 + i * 0.07,
      duration: 0.5,
      type: 'spring',
      stiffness: 260,
      damping: 22,
    },
  }),
}

const footerItemVariants = {
  closed: { opacity: 0 },
  open: { opacity: 1, transition: { delay: 0.55, duration: 0.35 } },
}

/* ─── Portal wrapper — renders into document.body ─── */
function MenuPortal({ children }) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])
  if (!mounted) return null
  return createPortal(children, document.body)
}

/* ─── Language switcher dropdown ─── */
function LangSwitcher({ lang, scrolled }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const router = useRouter()

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const currentLang = LANGS.find((l) => l.code === lang) || LANGS[0]

  return (
    <div className="lang-switcher" ref={ref}>
      <button
        className={`lang-switcher__trigger${scrolled ? ' lang-switcher__trigger--light' : ''}`}
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className="lang-switcher__flag">{currentLang.flag}</span>
        <span className="lang-switcher__code">{currentLang.code.toUpperCase()}</span>
        <svg
          className={`lang-switcher__caret${open ? ' open' : ''}`}
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
        >
          <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            className="lang-switcher__dropdown"
            role="listbox"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            {LANGS.map((l) => (
              <li key={l.code} role="option" aria-selected={l.code === lang}>
                <button
                  className={`lang-switcher__option${l.code === lang ? ' active' : ''}`}
                  onClick={() => {
                    setOpen(false)
                    router.push(`/${l.code}`)
                  }}
                >
                  <span className="lang-switcher__flag">{l.flag}</span>
                  <span className="lang-switcher__option-label">{l.label}</span>
                  {l.code === lang && (
                    <span className="lang-switcher__check">✓</span>
                  )}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ─── Main Navbar ─── */
export default function Navbar({ dict, lang }) {
  const [scrolled,  setScrolled]  = useState(false)
  const [menuOpen,  setMenuOpen]  = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  /* Lock body scroll when menu is open */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  /* Close on Escape */
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setMenuOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const links = NAV_LINKS(lang, dict)

  return (
    <>
      {/* ─── Top bar ─── */}
      <nav
        className={`navbar${scrolled ? ' scrolled' : ''}`}
        id="navbar"
        style={{ zIndex: 10000 }}
      >
        <a href={`/${lang}`} className="navbar-logo">
          Lumina Ceramiche
        </a>


        {/* Right controls: lang switcher + hamburger */}
        <div className="navbar-controls">
          <LangSwitcher lang={lang} scrolled={scrolled} />
          <button
            className={`hamburger${menuOpen ? ' hamburger--open' : ''}${scrolled ? ' hamburger--scrolled' : ''}`}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? dict.nav.close : dict.nav.menu}
            aria-expanded={menuOpen}
          >
            <span className="hamburger__line" />
            <span className="hamburger__line" />
            <span className="hamburger__line" />
          </button>
        </div>
      </nav>

      {/* ─── Fullscreen menu — mounted via Portal on document.body ─── */}
      <MenuPortal>
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              className="fullmenu"
              initial="closed"
              animate="open"
              exit="closed"
              variants={panelVariants}
              aria-modal="true"
              role="dialog"
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 9999,
              }}
            >
              {/* Close button (X) inside overlay */}
              <button
                className="fullmenu__close"
                onClick={() => setMenuOpen(false)}
                aria-label={dict.nav.close}
              >
                <span className="fullmenu__close-line" />
                <span className="fullmenu__close-line" />
              </button>

              {/* Nav links */}
              <nav className="fullmenu__links">
                {links.map((l, i) => (
                  <motion.a
                    key={l.label}
                    href={l.href}
                    className="fullmenu__link"
                    custom={i}
                    variants={linkVariants}
                    initial="closed"
                    animate="open"
                    exit={{ opacity: 0, transition: { duration: 0.1 } }}
                    onClick={() => setMenuOpen(false)}
                  >
                    <span className="fullmenu__link-index">
                      {String(i + 1).padStart(2, '0')} —
                    </span>
                    {l.label}
                  </motion.a>
                ))}
              </nav>

              {/* Footer: language + tagline */}
              <motion.div
                className="fullmenu__footer"
                variants={footerItemVariants}
                initial="closed"
                animate="open"
                exit={{ opacity: 0, transition: { duration: 0.1 } }}
              >
                <div className="fullmenu__langs">
                  {LANGS.map((l) => (
                    <button
                      key={l.code}
                      className={`fullmenu__lang-btn${lang === l.code ? ' active' : ''}`}
                      onClick={() => {
                        setMenuOpen(false)
                        /* navigate using window.location to avoid portal/router issues */
                        window.location.href = `/${l.code}`
                      }}
                    >
                      <span className="fullmenu__lang-flag">{l.flag}</span>
                      <span className="fullmenu__lang-code">{l.code.toUpperCase()}</span>
                    </button>
                  ))}
                </div>
                <p className="fullmenu__tagline">Lumina Ceramiche — Milano, Italia</p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </MenuPortal>
    </>
  )
}
