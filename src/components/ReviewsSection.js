'use client'

import React, { useEffect, useState, useRef } from 'react'
import { Star } from 'lucide-react'

export default function ReviewsSection({ dict }) {
  const [reviews, setReviews] = useState([])
  const sectionRef = useRef(null)

  useEffect(() => {
    async function getReviews() {
      try {
        const res = await fetch('/api/reviews')
        if (res.ok) {
          const data = await res.json()
          setReviews(data)
        }
      } catch (err) {
        console.error('Error fetching reviews:', err)
      }
    }
    getReviews()
  }, [])

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
  }, [reviews])

  if (reviews.length === 0) return null

  return (
    <section className="reviews-section theme-dark brutal-grid site-container" ref={sectionRef} id="testimonials">
      <div className="reviews-header-row fade-in">
        <h2 className="font-display-hero" style={{ fontSize: 'clamp(2.5rem, 8vw, 8rem)' }}>
          {dict.reviews.title}
        </h2>
        <p className="reviews-subtitle font-label-technical">
          {dict.reviews.subtitle}
        </p>
      </div>

      <div className="reviews-grid">
        {reviews.map((review, idx) => (
          <div 
            key={review.id} 
            className="review-card solid-block fade-in" 
            style={{ transitionDelay: `${idx * 0.1}s` }}
          >
            <div className="review-card-header">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={review.avatar} 
                alt={review.name} 
                className="review-card-avatar"
                loading="lazy" 
              />
              <div className="review-card-meta">
                <span className="review-card-name font-label-technical">{review.name}</span>
                <div className="review-card-stars">
                  {Array.from({ length: 5 }).map((_, i) => {
                    const diff = review.rating - i
                    return (
                      <span key={i} className="review-star-container">
                        {diff >= 1 ? (
                          <Star size={16} fill="#EAB308" color="#EAB308" />
                        ) : diff >= 0.5 ? (
                          <div className="relative-star-display">
                            <Star size={16} color="#EAB308" />
                            <div className="half-star-display-fill">
                              <Star size={16} fill="#EAB308" color="#EAB308" />
                            </div>
                          </div>
                        ) : (
                          <Star size={16} color="#4B5563" />
                        )}
                      </span>
                    )
                  })}
                </div>
              </div>
            </div>
            
            <div className="review-card-body">
              <h3 className="review-card-title font-headline-sm">{review.title}</h3>
              <p className="review-card-text">{review.text}</p>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .reviews-section {
          padding-top: 120px;
          padding-bottom: 120px;
          background-color: #000;
          color: #fff;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .reviews-header-row {
          margin-bottom: 60px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .reviews-subtitle {
          color: #a1a1aa;
          max-width: 600px;
          font-size: 16px;
          line-height: 1.6;
        }

        .reviews-grid {
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          gap: 24px;
        }

        .review-card {
          grid-column: span 4;
          background: rgba(24, 24, 27, 0.5);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          padding: 32px;
          display: flex;
          flex-direction: column;
          gap: 24px;
          transition: transform 0.3s ease, border-color 0.3s ease;
        }

        .review-card:hover {
          transform: translateY(-4px);
          border-color: rgba(255, 255, 255, 0.2);
        }

        @media (max-width: 1024px) {
          .review-card {
            grid-column: span 6;
          }
        }

        @media (max-width: 640px) {
          .review-card {
            grid-column: span 12;
          }
        }

        .review-card-header {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .review-card-avatar {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          object-fit: cover;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .review-card-meta {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .review-card-name {
          color: #fff;
          font-weight: 600;
          font-size: 14px;
        }

        .review-card-stars {
          display: flex;
          align-items: center;
          gap: 2px;
        }

        .review-star-container {
          display: inline-flex;
          align-items: center;
        }

        .relative-star-display {
          position: relative;
          display: inline-block;
          width: 16px;
          height: 16px;
        }

        .half-star-display-fill {
          position: absolute;
          top: 0;
          left: 0;
          width: 50%;
          overflow: hidden;
        }

        .review-card-body {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .review-card-title {
          font-size: 18px;
          font-weight: 600;
          color: #f3f4f6;
          margin: 0;
        }

        .review-card-text {
          font-size: 15px;
          color: #a1a1aa;
          line-height: 1.6;
          margin: 0;
        }
      `}</style>
    </section>
  )
}
