'use client'

import React, { useState, useEffect } from 'react'
import { Star, Upload, Trash2, Check, AlertCircle, ArrowLeft, MessageSquare } from 'lucide-react'
import Link from 'next/link'

export default function ReviewsAdminPage({ params }) {
  const [lang, setLang] = useState('it')
  const [reviews, setReviews] = useState([])
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    rating: 5,
    text: '',
    avatar: ''
  })
  const [avatarPreview, setAvatarPreview] = useState('')
  const [status, setStatus] = useState({ type: '', message: '' })
  const [loading, setLoading] = useState(false)

  // Unwrap params asynchronously
  useEffect(() => {
    params.then(p => {
      if (p.lang) setLang(p.lang)
    })
  }, [params])

  // Fetch existing reviews
  useEffect(() => {
    fetchReviews()
  }, [])

  const fetchReviews = async () => {
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

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (!file) return

    if (file.size > 2 * 1024 * 1024) {
      setStatus({ type: 'error', message: 'La foto profilo deve essere inferiore a 2MB' })
      return
    }

    const reader = new FileReader()
    reader.onloadend = () => {
      setFormData(prev => ({ ...prev, avatar: reader.result }))
      setAvatarPreview(reader.result)
    }
    reader.readAsDataURL(file)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.name || !formData.title || !formData.text) {
      setStatus({ type: 'error', message: 'Tutti i campi testuali sono obbligatori' })
      return
    }

    setLoading(true)
    setStatus({ type: '', message: '' })

    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (res.ok) {
        setStatus({ type: 'success', message: 'Recensione pubblicata con successo!' })
        setFormData({
          name: '',
          title: '',
          rating: 5,
          text: '',
          avatar: ''
        })
        setAvatarPreview('')
        fetchReviews()
      } else {
        const errData = await res.json()
        setStatus({ type: 'error', message: errData.error || 'Errore durante il salvataggio' })
      }
    } catch (err) {
      setStatus({ type: 'error', message: 'Errore di connessione al server' })
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Sei sicuro di voler eliminare questa recensione?')) return

    try {
      const res = await fetch(`/api/reviews?id=${id}`, {
        method: 'DELETE'
      })

      if (res.ok) {
        fetchReviews()
      } else {
        alert('Impossibile eliminare la recensione')
      }
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="admin-container">
      <header className="admin-header">
        <Link href={`/${lang}`} className="back-link">
          <ArrowLeft size={16} /> Torna al sito
        </Link>
        <h1>Pannello Amministrazione Recensioni</h1>
        <p className="subtitle">Aggiungi e gestisci le testimonianze dei clienti Lumina Ceramiche</p>
      </header>

      <div className="admin-grid">
        {/* Form Section */}
        <section className="admin-card form-section">
          <h2>Nuova Recensione</h2>
          
          {status.message && (
            <div className={`status-banner ${status.type}`}>
              {status.type === 'success' ? <Check size={18} /> : <AlertCircle size={18} />}
              <span>{status.message}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="admin-form">
            <div className="form-group">
              <label htmlFor="name">Nome e Cognome</label>
              <input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(p => ({ ...p, name: e.target.value }))}
                placeholder="Es. Mario Rossi"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="title">Titolo della Recensione</label>
              <input
                id="title"
                type="text"
                value={formData.title}
                onChange={(e) => setFormData(p => ({ ...p, title: e.target.value }))}
                placeholder="Es. Servizio eccezionale e finiture perfette"
                required
              />
            </div>

            <div className="form-group">
              <label>Valutazione (Stelle)</label>
              <div className="rating-selector-wrapper">
                <div className="rating-buttons">
                  {[0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5].map((val) => (
                    <button
                      key={val}
                      type="button"
                      className={`rating-btn ${formData.rating === val ? 'active' : ''}`}
                      onClick={() => setFormData(p => ({ ...p, rating: val }))}
                    >
                      {val}
                    </button>
                  ))}
                </div>
                <div className="stars-preview">
                  {Array.from({ length: 5 }).map((_, i) => {
                    const diff = formData.rating - i
                    return (
                      <span key={i} className="star-span">
                        {diff >= 1 ? (
                          <Star size={20} fill="#EAB308" color="#EAB308" />
                        ) : diff >= 0.5 ? (
                          <div className="relative-star">
                            <Star size={20} color="#EAB308" className="absolute-star-bg" />
                            <div className="half-star-fill">
                              <Star size={20} fill="#EAB308" color="#EAB308" />
                            </div>
                          </div>
                        ) : (
                          <Star size={20} color="#4B5563" />
                        )}
                      </span>
                    )
                  })}
                </div>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="text">Testo della Recensione</label>
              <textarea
                id="text"
                rows={4}
                value={formData.text}
                onChange={(e) => setFormData(p => ({ ...p, text: e.target.value }))}
                placeholder="Scrivi qui la recensione del cliente..."
                required
              />
            </div>

            <div className="form-group">
              <label>Foto Profilo</label>
              <div className="avatar-upload-zone">
                <div className="avatar-preview-container">
                  {avatarPreview ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={avatarPreview} alt="Preview avatar" className="avatar-preview-img" />
                  ) : (
                    <div className="avatar-placeholder">
                      <Upload size={24} />
                    </div>
                  )}
                </div>
                <div className="upload-controls">
                  <input
                    type="file"
                    id="avatar-upload"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden-file-input"
                  />
                  <label htmlFor="avatar-upload" className="upload-btn">
                    Scegli immagine
                  </label>
                  <p className="upload-tip">PNG o JPG, max 2MB. Verrà convertita in formato ottimizzato.</p>
                </div>
              </div>
            </div>

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? 'Salvataggio...' : 'Pubblica Recensione'}
            </button>
          </form>
        </section>

        {/* List Section */}
        <section className="admin-card list-section">
          <h2>Recensioni Pubblicate ({reviews.length})</h2>
          
          {reviews.length === 0 ? (
            <div className="empty-state">
              <MessageSquare size={48} />
              <p>Nessuna recensione pubblicata. Compila il modulo a sinistra per aggiungere la prima.</p>
            </div>
          ) : (
            <div className="reviews-list">
              {reviews.map((review) => (
                <div key={review.id} className="review-admin-card">
                  <div className="review-header">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={review.avatar} alt={review.name} className="review-list-avatar" />
                    <div className="review-meta">
                      <h3>{review.name}</h3>
                      <div className="stars-preview mini">
                        {Array.from({ length: 5 }).map((_, i) => {
                          const diff = review.rating - i
                          return (
                            <span key={i}>
                              {diff >= 1 ? (
                                <Star size={14} fill="#EAB308" color="#EAB308" />
                              ) : diff >= 0.5 ? (
                                <span className="relative-star mini">
                                  <Star size={14} color="#EAB308" />
                                  <span className="half-star-fill mini">
                                    <Star size={14} fill="#EAB308" color="#EAB308" />
                                  </span>
                                </span>
                              ) : (
                                <Star size={14} color="#4B5563" />
                              )}
                            </span>
                          )
                        })}
                      </div>
                    </div>
                    <button
                      onClick={() => handleDelete(review.id)}
                      className="delete-btn"
                      title="Elimina recensione"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <div className="review-body">
                    <h4>{review.title}</h4>
                    <p>{review.text}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      <style jsx global>{`
        .admin-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 40px 20px;
          min-height: 100vh;
          font-family: system-ui, -apple-system, sans-serif;
          color: #f3f4f6;
        }

        .admin-header {
          margin-bottom: 40px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          padding-bottom: 20px;
        }

        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: #9ca3af;
          text-decoration: none;
          font-size: 14px;
          margin-bottom: 16px;
          transition: color 0.2s;
        }

        .back-link:hover {
          color: #f3f4f6;
        }

        .admin-header h1 {
          font-size: 32px;
          font-weight: 700;
          margin: 0 0 8px 0;
          letter-spacing: -0.5px;
          background: linear-gradient(135deg, #fff 0%, #a1a1aa 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .admin-header .subtitle {
          color: #9ca3af;
          margin: 0;
          font-size: 16px;
        }

        .admin-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 32px;
        }

        @media (max-width: 900px) {
          .admin-grid {
            grid-template-columns: 1fr;
          }
        }

        .admin-card {
          background: rgba(24, 24, 27, 0.7);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          padding: 32px;
        }

        .admin-card h2 {
          font-size: 20px;
          font-weight: 600;
          margin: 0 0 24px 0;
          color: #fff;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          padding-bottom: 12px;
        }

        .status-banner {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          border-radius: 8px;
          margin-bottom: 24px;
          font-size: 14px;
        }

        .status-banner.success {
          background: rgba(16, 185, 129, 0.15);
          border: 1px solid rgba(16, 185, 129, 0.3);
          color: #34d399;
        }

        .status-banner.error {
          background: rgba(239, 68, 68, 0.15);
          border: 1px solid rgba(239, 68, 68, 0.3);
          color: #f87171;
        }

        .admin-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .form-group label {
          font-size: 14px;
          font-weight: 500;
          color: #d1d5db;
        }

        .form-group input[type="text"],
        .form-group textarea {
          background: rgba(0, 0, 0, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          padding: 12px 16px;
          color: #fff;
          font-size: 15px;
          outline: none;
          transition: border-color 0.2s;
        }

        .form-group input[type="text"]:focus,
        .form-group textarea:focus {
          border-color: rgba(255, 255, 255, 0.3);
        }

        .rating-selector-wrapper {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .rating-buttons {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }

        .rating-btn {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: #9ca3af;
          padding: 8px 12px;
          border-radius: 6px;
          cursor: pointer;
          font-size: 13px;
          font-weight: 500;
          transition: all 0.2s;
        }

        .rating-btn:hover {
          background: rgba(255, 255, 255, 0.1);
          color: #fff;
        }

        .rating-btn.active {
          background: #fff;
          color: #000;
          border-color: #fff;
        }

        .stars-preview {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .star-span {
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        .relative-star {
          position: relative;
          display: inline-block;
          width: 20px;
          height: 20px;
        }

        .absolute-star-bg {
          position: absolute;
          top: 0;
          left: 0;
        }

        .half-star-fill {
          position: absolute;
          top: 0;
          left: 0;
          width: 50%;
          overflow: hidden;
        }

        .avatar-upload-zone {
          display: flex;
          align-items: center;
          gap: 20px;
          background: rgba(0, 0, 0, 0.15);
          padding: 16px;
          border-radius: 8px;
          border: 1px dashed rgba(255, 255, 255, 0.1);
        }

        .avatar-preview-container {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          overflow: hidden;
          background: rgba(255, 255, 255, 0.05);
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(255, 255, 255, 0.1);
          flex-shrink: 0;
        }

        .avatar-preview-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .avatar-placeholder {
          color: #6b7280;
        }

        .upload-controls {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .hidden-file-input {
          display: none;
        }

        .upload-btn {
          display: inline-block;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.12);
          color: #fff;
          padding: 8px 16px;
          border-radius: 6px;
          cursor: pointer;
          font-size: 13px;
          font-weight: 500;
          text-align: center;
          transition: background 0.2s;
        }

        .upload-btn:hover {
          background: rgba(255, 255, 255, 0.15);
        }

        .upload-tip {
          font-size: 11px;
          color: #6b7280;
          margin: 0;
        }

        .submit-btn {
          background: #fff;
          color: #000;
          border: none;
          padding: 14px;
          border-radius: 8px;
          font-weight: 600;
          font-size: 15px;
          cursor: pointer;
          transition: opacity 0.2s;
          margin-top: 10px;
        }

        .submit-btn:hover:not(:disabled) {
          opacity: 0.9;
        }

        .submit-btn:disabled {
          background: #4b5563;
          color: #9ca3af;
          cursor: not-allowed;
        }

        .empty-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 60px 20px;
          text-align: center;
          color: #6b7280;
          gap: 16px;
        }

        .empty-state p {
          max-width: 300px;
          margin: 0;
          font-size: 14px;
          line-height: 1.5;
        }

        .reviews-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
          max-height: 700px;
          overflow-y: auto;
          padding-right: 8px;
        }

        .review-admin-card {
          background: rgba(0, 0, 0, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 12px;
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .review-header {
          display: flex;
          align-items: center;
          gap: 12px;
          position: relative;
        }

        .review-list-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          object-fit: cover;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .review-meta {
          flex: 1;
        }

        .review-meta h3 {
          font-size: 15px;
          font-weight: 600;
          margin: 0 0 4px 0;
          color: #fff;
        }

        .stars-preview.mini {
          display: flex;
          gap: 2px;
        }

        .relative-star.mini {
          position: relative;
          display: inline-block;
          width: 14px;
          height: 14px;
        }

        .half-star-fill.mini {
          position: absolute;
          top: 0;
          left: 0;
          width: 50%;
          overflow: hidden;
        }

        .delete-btn {
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.2);
          color: #ef4444;
          width: 32px;
          height: 32px;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
        }

        .delete-btn:hover {
          background: #ef4444;
          color: #fff;
        }

        .review-body h4 {
          font-size: 14px;
          font-weight: 600;
          margin: 0 0 6px 0;
          color: #e5e7eb;
        }

        .review-body p {
          font-size: 13px;
          color: #9ca3af;
          margin: 0;
          line-height: 1.6;
        }
      `}</style>
    </div>
  )
}
