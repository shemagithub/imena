import { Link } from 'react-router-dom'
import { INSTAGRAM } from '../data'

export function Heritage() {
  return (
    <div className="page">
      <header className="page__hero">
        <p className="page__eyebrow">Heritage</p>
        <h1>Pride in every stitch</h1>
        <p className="page__lead">
          IMENA Brand designs and prints clothing that carries Rwandan identity —
          Intore spirit, modern street cut.
        </p>
      </header>

      <div className="heritage-layout">
        <div className="heritage-copy">
          <h2>Why IMENA</h2>
          <p>
            Geometric trim and the RWANDA wordmark honor tradition with a clean
            athletic silhouette. We print on clothes, bags, and caps — from
            signature kits to custom team orders.
          </p>
          <p>
            Based in Rwanda. Built for people who wear their roots with confidence
            on the pitch, in the city, and beyond.
          </p>
          <div className="heritage-actions">
            <Link to="/shop" className="btn btn--accent">
              Shop the kits
            </Link>
            <a
              className="btn btn--outline"
              href={INSTAGRAM}
              target="_blank"
              rel="noreferrer"
            >
              @imena_luxe_prints
            </a>
          </div>
        </div>
        <figure className="heritage-media">
          <img
            src="/images/products/lookbook-duo-bw.jpg"
            alt="IMENA Brand community lookbook"
            loading="lazy"
            decoding="async"
            width="1000"
            height="1250"
          />
        </figure>
      </div>

      <section className="look-strip">
        <h2>Worn by the community</h2>
        <p>Street, studio, and hills — how IMENA moves with Rwanda.</p>
        <figure>
          <img
            src="/images/products/collection-trio.jpg"
            alt="IMENA Brand jersey collection on display"
            loading="lazy"
            decoding="async"
            width="1000"
            height="1250"
          />
        </figure>
      </section>
    </div>
  )
}
