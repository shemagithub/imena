import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { formatPrice, products } from '../data'
import { useShop } from '../context/ShopContext'
import { IconClose, IconSearch } from './Icons'

export function SearchModal() {
  const { searchOpen, setSearchOpen } = useShop()
  const [q, setQ] = useState('')

  useEffect(() => {
    if (!searchOpen) setQ('')
  }, [searchOpen])

  useEffect(() => {
    if (!searchOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSearchOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [searchOpen, setSearchOpen])

  const results = useMemo(() => {
    const query = q.trim().toLowerCase()
    if (!query) return products.slice(0, 6)
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.color.toLowerCase().includes(query) ||
        p.collection.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query),
    )
  }, [q])

  if (!searchOpen) return null

  return (
    <div className="search" role="dialog" aria-modal="true" aria-label="Search products">
      <div className="search__backdrop" onClick={() => setSearchOpen(false)} />
      <div className="search__panel">
        <div className="search__bar">
          <IconSearch />
          <input
            autoFocus
            type="search"
            placeholder="Search jerseys, colors, collections…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <button type="button" className="icon-btn" onClick={() => setSearchOpen(false)} aria-label="Close search">
            <IconClose />
          </button>
        </div>
        <ul className="search__results">
          {results.length === 0 && <li className="search__empty">No kits match “{q}”.</li>}
          {results.map((p) => (
            <li key={p.id}>
              <Link
                to={`/product/${p.id}`}
                onClick={() => setSearchOpen(false)}
                className="search__item"
              >
                <span>
                  {p.name} · {p.color}
                </span>
                <span>{formatPrice(p.price, p.currency)}</span>
              </Link>
            </li>
          ))}
        </ul>
        <Link to="/shop" className="search__all" onClick={() => setSearchOpen(false)}>
          Browse all kits →
        </Link>
      </div>
    </div>
  )
}
