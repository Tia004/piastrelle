'use client'

import { useEffect, useRef } from 'react'

export default function BentoGrid({ dict }) {
  const sectionRef = useRef(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const targets = el.querySelectorAll('.fade-in')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible')
        })
      },
      { threshold: 0.1 }
    )
    targets.forEach((t) => observer.observe(t))
    return () => observer.disconnect()
  }, [])

  return (
    <section className="section site-container" ref={sectionRef} id="collections">
      {/* Section header */}
      <div className="section-header fade-in">
        <div className="eyebrow">
          <div className="eyebrow-dot" />
          <span className="eyebrow-text">{dict.integrity.spec_label}</span>
        </div>
      </div>

      {/* Large section title */}
      <div className="fade-in" style={{ marginBottom: 'var(--space-4xl)' }}>
        <div className="text-display">{dict.integrity.title_line1}</div>
        <div className="text-display" style={{ marginLeft: '12vw', fontStyle: 'italic' }}>{dict.integrity.title_line2}</div>
      </div>

      {/* Bento grid */}
      <div className="bento-grid">
        {/* Large image card */}
        <div className="bento-card bento-card-large fade-in">
          <div className="bento-card-image">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDdVhH-LGcbr3U_0e1vqt-nHrAbW18pZcJ0kzLYT4sF2oJq6Xvk3EFkjYLuG5MeR5CsFCLyYHCi_E6BdyY4CDDXS68Mzz3L3kIUJqPJnpJTJibpfnOJi2MO87vl8H0YuUhVxZnz8VmY7QFbKGiGJW-C3TZCxYfPcyoaEIeVHUJaJCLqAkFEUcqYZA_uBQ0bUNhZZ9m_tB3GBxpfrPHpHNljEBUWU1nkGS4X7UfGaVPEBpWPtqj3cNLqh0vGLPdWMeZKIR2qVbcD"
              alt="Monolithic stone slab installation"
              className="img-cover img-greyscale"
              loading="lazy"
            />
          </div>
          <div className="bento-card-overlay">
            <div className="text-h2" style={{ color: 'var(--beige-100)', marginBottom: 'var(--space-md)' }}>
              {dict.integrity.monolithic_title_line1}<br />
              <span style={{ fontStyle: 'italic' }}>{dict.integrity.monolithic_title_line2}</span>
            </div>
            <p className="text-body" style={{ color: 'var(--grey-100)', maxWidth: '35ch' }}>
              {dict.integrity.monolithic_desc}
            </p>
          </div>
        </div>

        {/* Thickness profile card */}
        <div className="bento-card bento-card-medium fade-in" style={{ transitionDelay: '0.15s' }}>
          <div>
            <div className="eyebrow" style={{ marginBottom: 'var(--space-xl)' }}>
              <div className="eyebrow-dot" />
              <span className="eyebrow-text">{dict.integrity.spec_label}</span>
            </div>
            {/* Thickness icon */}
            <div style={{ marginBottom: 'var(--space-xl)' }}>
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" style={{ color: 'var(--beige-100)' }}>
                <rect x="8" y="16" width="32" height="2" fill="currentColor" />
                <rect x="8" y="22" width="32" height="4" fill="currentColor" opacity="0.6" />
                <rect x="8" y="30" width="32" height="8" fill="currentColor" opacity="0.3" />
              </svg>
            </div>
          </div>
          <div>
            <h3 className="text-h3" style={{ color: 'var(--beige-100)', marginBottom: 'var(--space-sm)' }}>
              {dict.integrity.thickness_title}
            </h3>
            <p className="text-body">{dict.integrity.thickness_desc}</p>
          </div>
        </div>

        {/* Downloads card */}
        <div
          className="bento-card bento-card-medium fade-in"
          style={{
            transitionDelay: '0.3s',
            backgroundColor: 'var(--beige-100)',
            cursor: 'pointer',
            transition: 'background-color 0.4s cubic-bezier(0.16, 1, 0.3, 1), transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--white)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--beige-100)'
          }}
        >
          <div>
            <div className="eyebrow" style={{ marginBottom: 'var(--space-xl)' }}>
              <div className="eyebrow-dot" style={{ backgroundColor: 'var(--black-400)' }} />
              <span className="eyebrow-text" style={{ color: 'var(--grey-400)' }}>{dict.integrity.downloads_label}</span>
            </div>
          </div>
          <div>
            <div className="text-h2" style={{ color: 'var(--black-400)', marginBottom: 'var(--space-md)' }}>
              {dict.integrity.downloads_title_line1}<br />
              <span style={{ fontStyle: 'italic' }}>{dict.integrity.downloads_title_line2}</span>
            </div>
            <span
              className="font-mono"
              style={{ color: 'var(--grey-400)', fontSize: '0.7rem', letterSpacing: '0.1em' }}
            >
              {dict.integrity.downloads_link}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
