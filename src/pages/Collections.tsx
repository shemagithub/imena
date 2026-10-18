import { Link, useParams } from 'react-router-dom'
import {
  collections,
  getCollection,
  productsByCollection,
  type CollectionId,
} from '../data'
import { ProductCard } from '../components/ProductCard'
import { ProductImage } from '../components/ProductImage'

export function CollectionsIndex() {
  return (
    <div className="page">
      <header className="page__hero">
        <p className="page__eyebrow">Collections</p>
        <h1>Find your kit</h1>
        <p className="page__lead">
          Real IMENA drops — Intore, crop, pride colors, and heritage looks.
        </p>
      </header>

      <div className="collection-mosaic">
        {collections.map((c, i) => {
          const count = productsByCollection(c.id).length
          return (
            <Link
              key={c.id}
              to={`/collections/${c.id}`}
              className={`collection-tile ${i === 0 ? 'collection-tile--wide' : ''}`}
            >
              <ProductImage
                src={c.image}
                alt={c.name}
                className="collection-tile__img"
                priority={i < 2}
                sizes="(max-width: 700px) 100vw, 50vw"
              />
              <div className="collection-tile__veil" />
              <div className="collection-tile__copy">
                <p className="collection-tile__tag">{c.tagline}</p>
                <h2>{c.name}</h2>
                <p className="collection-tile__desc">{c.description}</p>
                <span className="collection-tile__cta">
                  {count} kits →
                </span>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export function CollectionDetail() {
  const { id } = useParams()
  const collection = getCollection(id ?? '')

  if (!collection) {
    return (
      <div className="page">
        <header className="page__hero">
          <h1>Collection not found</h1>
          <p className="page__lead">That collection doesn’t exist.</p>
          <Link to="/collections" className="btn btn--accent">
            Browse collections
          </Link>
        </header>
      </div>
    )
  }

  const items = productsByCollection(collection.id as CollectionId)

  return (
    <div className="page">
      <header className="collection-banner">
        <ProductImage
          src={collection.image}
          alt=""
          className="collection-banner__img"
          priority
          sizes="100vw"
        />
        <div className="collection-banner__veil" />
        <div className="collection-banner__copy">
          <p className="page__eyebrow">Collection</p>
          <h1>{collection.name}</h1>
          <p className="page__lead">{collection.description}</p>
        </div>
      </header>

      {items.length > 0 ? (
        <div className="product-grid">
          {items.map((p, i) => (
            <ProductCard key={p.id} product={p} priority={i < 2} />
          ))}
        </div>
      ) : (
        <p className="empty-state">No kits in this collection yet.</p>
      )}
    </div>
  )
}
