import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { collections, products, type CollectionId } from '../data'
import { ProductCard } from '../components/ProductCard'
import { useShop } from '../context/ShopContext'

const filters = [
  { id: 'all', label: 'All kits' },
  ...collections.map((c) => ({ id: c.id, label: c.name })),
] as const

export function Shop() {
  const [params, setParams] = useSearchParams()
  const { wishlist } = useShop()
  const wishlistOnly = params.get('wishlist') === '1'
  const active = (params.get('collection') as CollectionId | 'all') || 'all'
  const [sort, setSort] = useState<'featured' | 'price-asc' | 'price-desc'>('featured')

  const list = useMemo(() => {
    let items = [...products]
    if (wishlistOnly) items = items.filter((p) => wishlist.includes(p.id))
    if (active !== 'all') items = items.filter((p) => p.collection === active)
    if (sort === 'price-asc') items.sort((a, b) => a.price - b.price)
    if (sort === 'price-desc') items.sort((a, b) => b.price - a.price)
    if (sort === 'featured') {
      items.sort((a, b) => Number(b.featured) - Number(a.featured))
    }
    return items
  }, [active, sort, wishlist, wishlistOnly])

  const setCollection = (id: string) => {
    const next = new URLSearchParams(params)
    if (id === 'all') next.delete('collection')
    else next.set('collection', id)
    next.delete('wishlist')
    setParams(next)
  }

  return (
    <div className="page">
      <header className="page__hero">
        <p className="page__eyebrow">{wishlistOnly ? 'Saved' : 'Shop'}</p>
        <h1>{wishlistOnly ? 'Your wishlist' : 'All kits'}</h1>
        <p className="page__lead">
          {wishlistOnly
            ? 'Kits you’ve saved — add a size and checkout on WhatsApp.'
            : 'Rwanda pride jerseys in Intore, crop, and heritage fits.'}
        </p>
      </header>

      <div className="shop-toolbar">
        <div className="shop-filters" role="tablist" aria-label="Filter by collection">
          {filters.map((f) => (
            <button
              key={f.id}
              type="button"
              role="tab"
              aria-selected={!wishlistOnly && active === f.id}
              className={!wishlistOnly && active === f.id ? 'is-active' : ''}
              onClick={() => setCollection(f.id)}
            >
              {f.label}
            </button>
          ))}
          {wishlist.length > 0 && (
            <button
              type="button"
              className={wishlistOnly ? 'is-active' : ''}
              onClick={() => setParams({ wishlist: '1' })}
            >
              Wishlist ({wishlist.length})
            </button>
          )}
        </div>
        <label className="shop-sort">
          Sort
          <select value={sort} onChange={(e) => setSort(e.target.value as typeof sort)}>
            <option value="featured">Featured</option>
            <option value="price-asc">Price: low to high</option>
            <option value="price-desc">Price: high to low</option>
          </select>
        </label>
      </div>

      {list.length === 0 ? (
        <p className="empty-state">
          {wishlistOnly
            ? 'No saved kits yet. Tap the heart on a product to save it.'
            : 'No kits in this filter.'}
        </p>
      ) : (
        <div className="product-grid">
          {list.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  )
}
