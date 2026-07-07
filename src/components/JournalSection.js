'use client'

import { useEffect, useRef } from 'react'

export default function JournalSection({ dict }) {
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
      { threshold: 0.05 }
    )
    targets.forEach((t) => observer.observe(t))
    return () => observer.disconnect()
  }, [])

  return (
    <section className="journal-section theme-light brutal-grid site-container" ref={sectionRef} id="projects">
      {/* Header Row */}
      <div className="journal-header-row fade-in">
        <h2 className="font-display-hero" style={{ fontSize: 'clamp(3rem, 10vw, 10rem)' }}>
          {dict.journal.title}
        </h2>
        <a className="btn-brutal" href="#">
          {dict.journal.archive}
        </a>
      </div>

      {/* Articles Grid */}
      <div className="journal-layout-grid">
        {/* Article 1 */}
        <article className="journal-card white-block fade-in">
          <div className="image-container aspect-square mb-8">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="image-grayscale"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuArqU8hj1c7DWBh3KrLHb56V1v7bEr-oBRPRteqRbN_j1XeYgaHTK2O2f6JrLFw4TyQ_JdPP6tCH7Cb2B7gY7xVctriECXN5NCBfYUOyHjD10Be6isXK0gJHfojuu7gzP8ck23J3Twefcr7g7iroTJBgW2iN-geqL6GKaIu1lbxEZPehiiE__-gAzP9lNXY0CRsDvoZYyTp_2GvmLV2i6TyDaccVS14oQm_TMzsYHTNLaraBbaQ9D0"
              alt="Residential cladding case study"
              loading="lazy"
            />
            <div className="absolute top-4 left-4 solid-block font-label-technical" style={{ padding: '8px 12px' }}>
              {dict.journal.article1_vol}
            </div>
          </div>
          <div className="journal-badge-container">
            <span className="journal-meta-tag font-label-technical">
              {dict.journal.article1_tag}
            </span>
            <span className="font-label-technical" style={{ color: '#1A1A1A' }}>
              {dict.journal.article1_location}
            </span>
          </div>
          <h3 className="font-display-hero font-headline-lg" style={{ fontSize: 'clamp(1.5rem, 3.5vw, 3.5rem)', color: '#1A1A1A' }}>
            {dict.journal.article1_title}
          </h3>
        </article>

        {/* Article 2 (Staggered / Offset layout) */}
        <article className="journal-card white-block fade-in" style={{ transitionDelay: '0.2s' }}>
          <div className="image-container aspect-square mb-8">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="image-grayscale"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCDRWXIe7fvVHzvntyTPEEzA42TP8nUDtD2TtoB9HvPgNFSravMiZRxqO9V31N7cCQE3icSNpQBcFhWinvrpcCZNAJiu21J8XZonPzwEu0nMfbTShxkmMMr3q1p5FKr7d9RysUs9Oc0ZGQ3ikJ3DA7cKCgv5kjh-41jyGmjMPWKsDuAnzAMjIV2EIYNgGNY4TnlHNAshzevtmuA6P7cUyOQVye5xdQ6uZDBDqd4ipJtIvIfjz3QVto"
              alt="Surface tension R&D lab"
              loading="lazy"
            />
            <div className="absolute top-4 left-4 solid-block font-label-technical" style={{ padding: '8px 12px' }}>
              {dict.journal.article2_vol}
            </div>
          </div>
          <div className="journal-badge-container">
            <span className="journal-meta-tag font-label-technical">
              {dict.journal.article2_tag}
            </span>
            <span className="font-label-technical" style={{ color: '#1A1A1A' }}>
              {dict.journal.article2_location}
            </span>
          </div>
          <h3 className="font-display-hero font-headline-lg" style={{ fontSize: 'clamp(1.5rem, 3.5vw, 3.5rem)', color: '#1A1A1A' }}>
            {dict.journal.article2_title}
          </h3>
        </article>
      </div>
    </section>
  )
}
