'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function ContactSection({ dict }) {
  const [form, setForm]           = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading]     = useState(false)
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const handleChange = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    await new Promise((r) => setTimeout(r, 900))
    setLoading(false)
    setSubmitted(true)
  }

  const c = dict.contact

  /* Shared scroll-reveal helper */
  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 24 },
    animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
    transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] },
  })

  return (
    <section id="contact" ref={ref} className="contact-section">
      <div className="contact-inner">

        {/* ── Left: dark info panel ── */}
        <div className="contact-info">
          <div className="contact-info__top">
            <motion.span className="contact-info__label" {...fadeUp(0.05)}>
              {c.label}
            </motion.span>
            <motion.h2 className="contact-info__heading" {...fadeUp(0.12)}>
              {c.heading}
            </motion.h2>
            <motion.p className="contact-info__sub" {...fadeUp(0.2)}>
              {c.subheading}
            </motion.p>
          </div>

          <motion.div className="contact-info__email-block" {...fadeUp(0.3)}>
            <span className="contact-info__email-label">{c.or}</span>
            <a
              href="mailto:info@luminaceramiche.it"
              className="contact-info__email-link"
            >
              info@luminaceramiche.it
            </a>
          </motion.div>
        </div>

        {/* ── Right: form panel (cream) ── */}
        <div className="contact-form-panel">
          {!submitted ? (
            <motion.form
              className="contact-form"
              onSubmit={handleSubmit}
              noValidate
              {...fadeUp(0.15)}
            >
              <div className="contact-form__row">
                <div className="contact-form__field">
                  <label className="contact-form__label" htmlFor="cf-name">
                    {c.name_placeholder}
                  </label>
                  <input
                    id="cf-name"
                    type="text"
                    name="name"
                    className="contact-form__input"
                    placeholder={c.name_placeholder}
                    value={form.name}
                    onChange={handleChange}
                    required
                    autoComplete="name"
                  />
                </div>
                <div className="contact-form__field">
                  <label className="contact-form__label" htmlFor="cf-email">
                    {c.email_placeholder}
                  </label>
                  <input
                    id="cf-email"
                    type="email"
                    name="email"
                    className="contact-form__input"
                    placeholder={c.email_placeholder}
                    value={form.email}
                    onChange={handleChange}
                    required
                    autoComplete="email"
                  />
                </div>
              </div>

              <div className="contact-form__field">
                <label className="contact-form__label" htmlFor="cf-message">
                  {c.message_placeholder}
                </label>
                <textarea
                  id="cf-message"
                  name="message"
                  className="contact-form__input contact-form__textarea"
                  placeholder={c.message_placeholder}
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={6}
                />
              </div>

              <button
                type="submit"
                className="contact-form__submit"
                disabled={loading}
              >
                {loading ? '...' : c.send}
              </button>
            </motion.form>
          ) : (
            <motion.div
              className="contact-success"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, type: 'spring', stiffness: 200 }}
            >
              <div className="contact-success__icon">✓</div>
              <p className="contact-success__text">{c.success}</p>
            </motion.div>
          )}
        </div>

      </div>
    </section>
  )
}
