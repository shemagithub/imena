import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { collections, formatPrice, products } from '../data'
import { ProductCard } from '../components/ProductCard'
import { ProductImage } from '../components/ProductImage'
import { IconCheck, IconChevron } from '../components/Icons'

const heroSlides = [
  {
    id: 'intore-black',
    eyebrow: '2026 Intoré Collection',
    title: 'Wear the pride.',
    productLabel: 'Intore Black Kit 2026',
  },
  {
    id: 'pride-navy',
    eyebrow: 'Pride Colors',
    title: 'Own the game.',
    productLabel: 'Rwanda Iziza Navy',
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
          <ProductImage
            src={heroProduct.image}
            alt=""
            className="hero-kit__bg-img"
            priority={slide === 0}
            sizes="100vw"
          />
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
            <Link
              to={`/product/${heroProduct.id}`}
              className="hero-kit__photo-wrap"
            >
              <ProductImage
                src={heroProduct.image}
                alt={`${heroProduct.name} ${heroProduct.color}`}
                className="hero-kit__photo"
                priority
                sizes="(max-width: 900px) 80vw, 420px"
              />
            </Link>
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

      <section className="home-collections">
        <div className="featured__head">
          <h2>Shop by collection</h2>
          <Link to="/collections" className="home-collections__all">
            View all →
          </Link>
        </div>
        <div className="home-collections__grid">
          {collections.map((c, i) => (
            <Link key={c.id} to={`/collections/${c.id}`} className="home-col">
              <ProductImage
                src={c.image}
                alt={c.name}
                className="home-col__img"
                priority={i === 0}
                sizes="(max-width: 700px) 50vw, 25vw"
              />
              <span className="home-col__label">{c.name}</span>
            </Link>
          ))}
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
          {featured.map((p, i) => (
            <div key={p.id} className="featured__item">
              <ProductCard product={p} priority={i < 2} />
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
          <ProductImage
            src="/images/products/collection-trio.jpg"
            alt="IMENA Brand Rwanda jersey collection on display"
            sizes="(max-width: 900px) 100vw, 50vw"
          />
        </figure>
      </section>
    </>
  )
}
