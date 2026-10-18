import { useState, type FormEvent } from 'react'
import { PHONE_DISPLAY, WHATSAPP, whatsappGeneralUrl } from '../data'

export function Contact() {
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [sentHint, setSentHint] = useState(false)

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    const text = encodeURIComponent(
      `Muraho! I'm ${name || 'a customer'}.\n\n${message || 'I want to order / ask about custom prints.'}\n\nFrom the IMENA website contact form.`,
    )
    setSentHint(true)
    window.open(`https://wa.me/${WHATSAPP}?text=${text}`, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="page">
      <header className="page__hero">
        <p className="page__eyebrow">Contact</p>
        <h1>Order yours</h1>
        <p className="page__lead">
          Message us for sizes, custom prints, and delivery across Rwanda.
        </p>
      </header>

      <div className="contact-layout">
        <form className="contact-form" onSubmit={onSubmit}>
          <label>
            Your name
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Alain"
              autoComplete="name"
            />
          </label>
          <label>
            How can we help?
            <textarea
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Kit, size, color, or custom print details…"
              required
            />
          </label>
          <button type="submit" className="btn btn--accent">
            Send via WhatsApp
          </button>
          {sentHint && (
            <p className="contact-hint">WhatsApp should open with your message ready to send.</p>
          )}
        </form>

        <aside className="contact-aside">
          <h2>Direct lines</h2>
          <a className="contact-line" href={whatsappGeneralUrl()} target="_blank" rel="noreferrer">
            <strong>WhatsApp</strong>
            <span>{PHONE_DISPLAY}</span>
          </a>
          <a className="contact-line" href={`tel:+${WHATSAPP}`}>
            <strong>Call</strong>
            <span>{PHONE_DISPLAY}</span>
          </a>
          <div className="contact-hours">
            <strong>Response time</strong>
            <span>Usually within a few hours · Kigali time</span>
          </div>
        </aside>
      </div>
    </div>
  )
}
