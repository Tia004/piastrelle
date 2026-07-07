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
    <section className="hero-section theme-dark brutal-grid" ref={sectionRef} id="hero">
      {/* WebGL marble shader background */}
      <div className="hero-canvas-container">
        <ShaderBackground />
      </div>

      {/* Typography Grid */}
      <div className="hero-grid-layout">
        <div className="hero-text-block">
          {/* Metadata Specs Badge */}
          <div className="hero-meta-badge font-label-technical fade-in">
            {dict.hero.spec_dim} | {dict.hero.spec_thickness}<br />
            {dict.hero.spec_material}<br />
            {dict.hero.spec_application}
          </div>

          {/* Huge Display Hero Title */}
          <h1 className="font-display-hero hero-heading fade-in" style={{ color: 'var(--text-color)' }}>
            {dict.hero.line1}<br />
            {dict.hero.line2}<br />
            {dict.hero.line3}
          </h1>

          {/* Slogan & Scroll Row */}
          <div className="hero-bottom-row fade-in">
            <p className="hero-slogan-box">
              {dict.hero.tagline}
            </p>
            <div className="hero-scroll-btn">
              <span className="material-symbols-outlined" style={{ fontSize: '36px' }}>arrow_downward</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
