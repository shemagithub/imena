import { Link, useParams } from 'react-router-dom'
import {
  collections,
  getCollection,
  productsByCollection,
  type CollectionId,
} from '../data'
import { ProductCard } from '../components/ProductCard'

export function CollectionsIndex() {
  return (
    <div className="page">
      <header className="page__hero">
        <p className="page__eyebrow">Collections</p>
        <h1>Find your kit</h1>
        <p className="page__lead">
          From signature Intore jerseys to custom prints for your team.
        </p>
      </header>
      <div className="collection-grid">
        {collections.map((c) => {
          const count = productsByCollection(c.id).length
          return (
            <Link key={c.id} to={`/collections/${c.id}`} className="collection-card">
              <p className="collection-card__tag">{c.tagline}</p>
              <h2>{c.name}</h2>
              <p>{c.description}</p>
              <span>
                {count > 0 ? `${count} kits` : 'Custom order'} →
              </span>
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
      <header className="page__hero">
        <p className="page__eyebrow">Collection</p>
        <h1>{collection.name}</h1>
        <p className="page__lead">{collection.description}</p>
        {collection.id === 'custom' && (
          <Link to="/contact" className="btn btn--accent" style={{ marginTop: '1rem' }}>
            Start a custom order
          </Link>
        )}
      </header>

      {items.length > 0 ? (
        <div className="product-grid">
          {items.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      ) : (
        <p className="empty-state">
          Custom prints are made to order — message us with your design brief.
        </p>
      )}
    </div>
  )
}
