import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  formatPrice,
  getProduct,
  products,
  whatsappOrderUrl,
} from '../data'
import { useShop } from '../context/ShopContext'
import { ProductCard } from '../components/ProductCard'
import { ProductImage } from '../components/ProductImage'
import { IconHeart } from '../components/Icons'

export function Product() {
  const { id } = useParams()
  const product = getProduct(id ?? '')
  const { addToCart, wishlist, toggleWishlist } = useShop()
  const [size, setSize] = useState('M')
  const [added, setAdded] = useState(false)
  const [activeImg, setActiveImg] = useState(0)

  useEffect(() => {
    if (!product) return
    setSize(product.sizes.includes('M') ? 'M' : product.sizes[0])
    setAdded(false)
    setActiveImg(0)
  }, [product?.id])

  if (!product) {
    return (
      <div className="page">
        <header className="page__hero">
          <h1>Kit not found</h1>
          <Link to="/shop" className="btn btn--accent">
            Back to shop
          </Link>
        </header>
      </div>
    )
  }

  const loved = wishlist.includes(product.id)
  const gallery = product.gallery?.length ? product.gallery : [product.image]
  const related = products
    .filter((p) => p.id !== product.id && p.collection === product.collection)
    .slice(0, 3)

  const onAdd = () => {
    addToCart(product.id, size)
    setAdded(true)
    window.setTimeout(() => setAdded(false), 1600)
  }

  return (
    <div className="page product-page">
      <div className="pdp">
        <div className="pdp__gallery">
          <div className={`pdp__visual pdp__visual--photo pdp__visual--${product.theme}`}>
            {product.badge && <span className="pcard__badge">{product.badge}</span>}
            <ProductImage
              src={gallery[activeImg]}
              alt={`${product.name} ${product.color}`}
              className="pdp__img"
              priority
              sizes="(max-width: 900px) 100vw, 50vw"
            />
          </div>
          {gallery.length > 1 && (
            <div className="pdp__thumbs" role="list">
              {gallery.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  role="listitem"
                  className={i === activeImg ? 'is-active' : ''}
                  onClick={() => setActiveImg(i)}
                  aria-label={`View photo ${i + 1}`}
                >
                  <ProductImage src={src} alt="" className="pdp__thumb-img" sizes="80px" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="pdp__info">
          <p className="page__eyebrow">{product.collection} collection</p>
          <h1>
            {product.name}
            <span> · {product.color}</span>
          </h1>
          <p className="pdp__price">{formatPrice(product.price, product.currency)}</p>
          <p className="pdp__desc">{product.description}</p>
          <p className="pdp__fit">{product.fit}</p>

          <fieldset className="pdp__sizes">
            <legend>Select size</legend>
            <div className="pdp__size-row">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  type="button"
                  className={size === s ? 'is-active' : ''}
                  onClick={() => setSize(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          </fieldset>

          <div className="pdp__actions">
            <button type="button" className="btn btn--accent" onClick={onAdd}>
              {added ? 'Added to bag' : 'Add to bag'}
            </button>
            <a
              className="btn btn--outline"
              href={whatsappOrderUrl(product, size)}
              target="_blank"
              rel="noreferrer"
            >
              Buy on WhatsApp
            </a>
            <button
              type="button"
              className={`icon-btn pdp__wish ${loved ? 'is-active' : ''}`}
              aria-label={loved ? 'Remove from wishlist' : 'Save to wishlist'}
              onClick={() => toggleWishlist(product.id)}
            >
              <IconHeart filled={loved} />
            </button>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="related">
          <h2>More from this collection</h2>
          <div className="product-grid product-grid--3">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
