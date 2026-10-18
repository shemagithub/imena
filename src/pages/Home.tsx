import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { formatPrice, products } from '../data'
import { ProductCard } from '../components/ProductCard'
import { JerseyVisual } from '../components/JerseyVisual'
import { IconCheck, IconChevron } from '../components/Icons'

const heroSlides = [
  {
    id: 'intore-black',
    eyebrow: '2026 Intoré Collection',
    title: 'Wear the pride.',
    productLabel: 'Intore Black Kit 2026',
  },
  {
    id: 'intore-white',
    eyebrow: '2026 Match Drop',
    title: 'Own the streets.',
    productLabel: 'Intore White Kit 2026',
  },
  {
    id: 'intore-crop',
    eyebrow: 'Crop Collection',
    title: 'Cut for motion.',
    productLabel: 'Intore Crop Black',
  },
] as const

export function Home() {
  const [slide, setSlide] = useState(0)
  const railRef = useRef<HTMLDivElement>(null)
  const current = heroSlides[slide]
  const heroProduct = products.find((p) => p.id === current.id)!
  const featured = products.filter((p) => p.featured)

  const prev = () => setSlide((s) => (s === 0 ? heroSlides.length - 1 : s - 1))
  const next = () => setSlide((s) => (s === heroSlides.length - 1 ? 0 : s + 1))

  const scrollRail = (dir: -1 | 1) => {
    railRef.current?.scrollBy({ left: dir * 280, behavior: 'smooth' })
  }

  return (
    <>
      <section className="hero-kit">
        <div className="hero-kit__bg" aria-hidden>
          <img src="/images/lookbook-grid.jpg" alt="" />
          <div className="hero-kit__wash" />
        </div>

        <div className="hero-kit__grid">
          <div className="hero-kit__copy">
            <p className="hero-kit__eyebrow animate-in">{current.eyebrow}</p>
            <h1 className="hero-kit__title animate-in delay-1" key={current.title}>
              {current.title}
            </h1>
            <div className="hero-kit__actions animate-in delay-2">
              <Link to="/shop" className="btn btn--accent">
                Shop new kits →
              </Link>
              <Link to="/collections" className="btn btn--outline">
                Explore collection
              </Link>
            </div>
            <ul className="hero-kit__tags animate-in delay-3">
              <li>
                <IconCheck /> Official print
              </li>
              <li>
                <IconCheck /> 2026
              </li>
              <li>
                <IconCheck /> New drop
              </li>
            </ul>
          </div>

          <div className="hero-kit__stage" key={heroProduct.id}>
            {heroProduct.badge && (
              <span className="hero-kit__pill">{heroProduct.badge}</span>
            )}
            <div className={`hero-kit__jersey hero-kit__jersey--${heroProduct.theme}`}>
              <JerseyVisual
                theme={heroProduct.theme}
                crop={heroProduct.collection === 'crop'}
                className="jersey-visual jersey-visual--hero"
              />
            </div>
            <div className="hero-kit__price">
              <span className="hero-kit__price-line" />
              <span className="hero-kit__price-tag">
                {formatPrice(heroProduct.price, heroProduct.currency)}
              </span>
            </div>
            <p className="hero-kit__kitname">{current.productLabel}</p>
          </div>
        </div>

        <div className="hero-kit__foot">
          <p>More than a jersey — it’s pride you wear.</p>
          <div className="hero-kit__controls">
            <button type="button" className="circle-btn" onClick={prev} aria-label="Previous slide">
              <IconChevron dir="left" />
            </button>
            <button type="button" className="circle-btn" onClick={next} aria-label="Next slide">
              <IconChevron dir="right" />
            </button>
          </div>
        </div>
      </section>

      <section className="featured">
        <div className="featured__head">
          <h2>Featured kits</h2>
          <div className="featured__controls">
            <button type="button" className="circle-btn" onClick={() => scrollRail(-1)} aria-label="Scroll left">
              <IconChevron dir="left" />
            </button>
            <button type="button" className="circle-btn" onClick={() => scrollRail(1)} aria-label="Scroll right">
              <IconChevron dir="right" />
            </button>
          </div>
        </div>
        <div className="featured__rail" ref={railRef}>
          {featured.map((p) => (
            <div key={p.id} className="featured__item">
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </section>

      <section className="promo">
        <div className="promo__copy">
          <h2>Custom prints for teams & events</h2>
          <p>
            IMENA designs and prints on clothes, bags, and caps. Tell us your idea —
            we deliver the kit.
          </p>
          <Link to="/contact" className="btn btn--accent">
            Request a custom print
          </Link>
        </div>
        <figure className="promo__media">
          <img
            src="/images/lookbook-grid.jpg"
            alt="Community wearing IMENA Brand Rwanda jerseys"
          />
        </figure>
      </section>
    </>
  )
}
