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
    <section className="section site-container" ref={sectionRef} id="projects">
      {/* Section header */}
      <div className="section-header fade-in">
        <div className="eyebrow">
          <div className="eyebrow-dot" />
          <span className="text-display">{dict.journal.title}</span>
        </div>
        <a href="#" className="btn">{dict.journal.archive}</a>
      </div>

      {/* Articles grid */}
      <div className="journal-grid">
        {/* Article 1 */}
        <article className="journal-article fade-in">
          <div className="font-mono" style={{ color: 'var(--text-muted)', marginBottom: 'var(--space-lg)' }}>
            {dict.journal.article1_vol}
          </div>
          <div className="journal-image-wrap">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCO_PVAkCfP-Oi3-cevL9h5uR4mKS8ZZUFU-a3lLG3f3wIYQPt-d9RwBRSvb3Jqcx0IrEnkZACnhHkVlX2VpI-FfxWLBLHBGbwzIE5cFkFOxLBzqLf3BhNl8VCb3F_h8mh59nDH-YrqgHiAnbk9iA9nT2Ax0C2rrMmJ_jJaW3LQ-KuHFX-bflqFjT3BxPHECvk8fVRPpxf_FaUoVR_UGWe3Kkbx-6yYL2j8PSvJGQnZxIfb_Nb9A9JVCRrRw0sY7ooUVfVhZEbxU"
              alt="Residential cladding case study"
              loading="lazy"
            />
          </div>
          <div className="journal-meta">
            <span className="journal-tag">{dict.journal.article1_tag}</span>
            <span className="journal-location">{dict.journal.article1_location}</span>
          </div>
          <h3 className="journal-title">{dict.journal.article1_title}</h3>
        </article>

        {/* Article 2 — offset */}
        <article className="journal-article fade-in" style={{ transitionDelay: '0.2s' }}>
          <div className="font-mono" style={{ color: 'var(--text-muted)', marginBottom: 'var(--space-lg)' }}>
            {dict.journal.article2_vol}
          </div>
          <div className="journal-image-wrap">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDXC3-YTr6bFc6bE08Mhq3R7lxGPj0O-ZRNJuYshGnbK7DFw8jxS1ks3MwMVL3w8qB8vKP-j1lIlQHT9Zj2PpZf0OFJnJPnXjcLyoJGGvZ5nD4rlVjvPZcNdAkRWqkHDDPm7mrrIHSqnE9rnLlPz9iI6AabRf7oLWuhw8pzCv7PxUkp-bZGi6j7D4OKc0ZNH1L2N4wWbxEjjcIYBpFLz8KYaevbGxDqF18P5R5jkHn_L2k8Tl5C0j-GNWpS-50FEyYLgsjkN5tJ4"
              alt="Surface tension R&D lab"
              loading="lazy"
            />
          </div>
          <div className="journal-meta">
            <span className="journal-tag">{dict.journal.article2_tag}</span>
            <span className="journal-location">{dict.journal.article2_location}</span>
          </div>
          <h3 className="journal-title">{dict.journal.article2_title}</h3>
        </article>
      </div>
    </section>
  )
}
