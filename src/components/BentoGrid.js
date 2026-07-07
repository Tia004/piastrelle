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
    <section className="bento-section theme-light brutal-grid site-container" ref={sectionRef} id="collections">
      {/* Huge Display Heading */}
      <h2 className="font-display-hero bento-heading fade-in" style={{ fontSize: 'clamp(3rem, 10vw, 10rem)' }}>
        {dict.integrity.title_line1}<br />
        {dict.integrity.title_line2}
      </h2>

      {/* Bento grid layout */}
      <div className="bento-cards-container">
        {/* Bento Item 1 (Large Image Card) */}
        <div className="bento-card-1 white-block fade-in image-container">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="absolute inset-0 w-full h-full object-cover image-grayscale z-0"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBsusty_ho58SGg9XY9canbqeqjTmV3pPcMDqpjilamgVb-4iWBE5IvOL5zrLEGw-YZvi0XXlWR7MiGGsJtjEpqWS-S-s9er0oqpkwY27ss5qhBwyhNlBUMKEI3rb9LE2wSo6tznsx6BHAP7wsjiVVJfkGvHiLphCOBfwCdfc7h7gKmNcWG-a7mhgNlTgye4NzcnF_rCEDQ4GTHyXR4fPzOUVRMgBVQmxVvWAuxKHZmHvbCpOCdn4A"
            alt="Monolithic stone slab installation"
            loading="lazy"
          />
          <div className="bento-badge">
            <h3 className="font-display-hero uppercase mb-4 leading-none" style={{ fontSize: 'clamp(1.5rem, 4vw, 4rem)' }}>
              {dict.integrity.monolithic_title_line1}<br />
              {dict.integrity.monolithic_title_line2}
            </h3>
            <p className="font-label-technical">
              {dict.integrity.monolithic_desc}
            </p>
          </div>
        </div>

        {/* Bento Item 2 (Thickness Profile) */}
        <div className="bento-card-2 white-block fade-in" style={{ transitionDelay: '0.15s' }}>
          <div className="font-label-technical border-b-2 border-[#1A1A1A] pb-2 mb-8">
            {dict.integrity.spec_label}
          </div>
          <span className="material-symbols-outlined text-[96px]" style={{ color: '#1A1A1A' }}>layers</span>
          <div className="mt-8">
            <h3 className="font-body-large mb-2 font-bold uppercase" style={{ color: '#1A1A1A' }}>
              {dict.integrity.thickness_title}
            </h3>
            <p className="font-label-technical" style={{ color: '#6B6B67' }}>
              {dict.integrity.thickness_desc}
            </p>
          </div>
        </div>

        {/* Bento Item 3 (Downloads / Solid Block) */}
        <div className="bento-card-3 solid-block fade-in" style={{ transitionDelay: '0.3s', cursor: 'pointer' }}>
          <div className="font-label-technical border-b-2 border-current pb-2 mb-8 opacity-50">
            {dict.integrity.downloads_label}
          </div>
          <div>
            <h3 className="font-display-hero uppercase mb-8 leading-none" style={{ fontSize: 'clamp(1.5rem, 4vw, 4rem)' }}>
              {dict.integrity.downloads_title_line1}<br />
              {dict.integrity.downloads_title_line2}
            </h3>
            <a className="font-label-technical border-b-2 border-current pb-1" href="#">
              {dict.integrity.downloads_link}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
