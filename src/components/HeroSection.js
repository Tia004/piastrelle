'use client'

import { useEffect, useRef } from 'react'
import ShaderBackground from './ShaderBackground'

export default function HeroSection({ dict }) {
  const sectionRef = useRef(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const targets = el.querySelectorAll('.fade-in')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1 }
    )
    targets.forEach((t) => observer.observe(t))
    return () => observer.disconnect()
  }, [])

  return (
    <section className="hero" ref={sectionRef} id="hero">
      {/* WebGL marble shader background */}
      <div className="hero-bg">
        <ShaderBackground />
      </div>

      {/* Gradient overlay */}
      <div className="hero-overlay" />

      {/* Main content */}
      <div className="hero-content">
        <div className="hero-title fade-in">
          <div className="text-hero">{dict.hero.line1}</div>
          <div className="text-hero" style={{ marginLeft: '8vw' }}>{dict.hero.line2}</div>
          <div className="text-hero">{dict.hero.line3}</div>
        </div>

        <div className="hero-specs fade-in" style={{ transitionDelay: '0.2s' }}>
          <span className="font-mono" style={{ color: 'var(--text-muted)' }}>{dict.hero.spec_dim}</span>
          <span className="font-mono" style={{ color: 'var(--text-muted)' }}>{dict.hero.spec_material}</span>
          <span className="font-mono" style={{ color: 'var(--text-muted)' }}>{dict.hero.spec_application}</span>
        </div>

        <p className="hero-tagline fade-in" style={{ transitionDelay: '0.4s' }}>
          {dict.hero.tagline}
        </p>
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll-indicator">
        <span>Scroll</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </div>
    </section>
  )
}
