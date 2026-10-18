import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { INSTAGRAM, collections, whatsappGeneralUrl } from '../data'
import { useShop } from '../context/ShopContext'
import { CartDrawer } from './CartDrawer'
import { SearchModal } from './SearchModal'
import { IconBag, IconChevron, IconHeart, IconSearch, IconUser } from './Icons'

export function Layout() {
  const { pathname } = useLocation()
  const { cartCount, wishlist, setSearchOpen, setCartOpen } = useShop()
  const [menuOpen, setMenuOpen] = useState(false)
  const [collectionsOpen, setCollectionsOpen] = useState(false)

  useEffect(() => {
    setMenuOpen(false)
    setCollectionsOpen(false)
    window.scrollTo(0, 0)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const navClass = ({ isActive }: { isActive: boolean }) =>
    `nav__link ${isActive ? 'is-active' : ''}`

  return (
    <div className="site">
      <div className="announce">
        <span>New season</span>
        <span className="announce__dot" />
        <span>Free delivery in Kigali over 50,000 RWF</span>
        <span className="announce__dot" />
        <span>Authentic IMENA prints only</span>
      </div>

      <header className="nav">
        <Link to="/" className="nav__brand" onClick={() => setMenuOpen(false)}>
          <span className="nav__mark">IM</span>
          <span>IMENA</span>
        </Link>

        <button
          type="button"
          className={`nav__burger ${menuOpen ? 'is-open' : ''}`}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav className={`nav__center ${menuOpen ? 'is-open' : ''}`}>
          <NavLink to="/shop" className={navClass} onClick={() => setMenuOpen(false)}>
            Shop
          </NavLink>

          <div
            className={`nav__dropdown ${collectionsOpen ? 'is-open' : ''}`}
            onMouseEnter={() => setCollectionsOpen(true)}
            onMouseLeave={() => setCollectionsOpen(false)}
          >
            <button
              type="button"
              className="nav__link nav__link--btn"
              aria-expanded={collectionsOpen}
              onClick={() => setCollectionsOpen((v) => !v)}
            >
              Collections <IconChevron size={16} />
            </button>
            <div className="nav__menu">
              {collections.map((c) => (
                <Link
                  key={c.id}
                  to={`/collections/${c.id}`}
                  onClick={() => {
                    setMenuOpen(false)
                    setCollectionsOpen(false)
                  }}
                >
                  <strong>{c.name}</strong>
                  <span>{c.tagline}</span>
                </Link>
              ))}
              <Link
                to="/collections"
                onClick={() => {
                  setMenuOpen(false)
                  setCollectionsOpen(false)
                }}
              >
                <strong>All collections</strong>
                <span>Browse everything</span>
              </Link>
            </div>
          </div>

          <NavLink to="/heritage" className={navClass} onClick={() => setMenuOpen(false)}>
            Heritage
          </NavLink>
          <NavLink to="/contact" className={navClass} onClick={() => setMenuOpen(false)}>
            Contact
          </NavLink>
        </nav>

        <div className="nav__utils">
          <button type="button" className="icon-btn" aria-label="Search" onClick={() => setSearchOpen(true)}>
            <IconSearch />
          </button>
          <a
            className="icon-btn nav__util-hide"
            href={whatsappGeneralUrl()}
            target="_blank"
            rel="noreferrer"
            aria-label="Order account / WhatsApp"
          >
            <IconUser />
          </a>
          <Link to="/shop?wishlist=1" className="icon-btn nav__util-hide" aria-label={`Wishlist, ${wishlist.length} items`}>
            <IconHeart filled={wishlist.length > 0} />
          </Link>
          <button
            type="button"
            className="icon-btn nav__bag"
            aria-label={`Shopping bag, ${cartCount} items`}
            onClick={() => setCartOpen(true)}
          >
            <IconBag />
            <span className="nav__badge">{cartCount}</span>
          </button>
        </div>
      </header>

      <main>
        <Outlet />
      </main>

      <footer className="footer">
        <div className="footer__grid">
          <div>
            <p className="footer__brand">IMENA</p>
            <p className="footer__tag">Rwanda pride jerseys & custom luxe prints.</p>
          </div>
          <div>
            <p className="footer__label">Shop</p>
            <Link to="/shop">All kits</Link>
            <Link to="/collections/intore">Intore jerseys</Link>
            <Link to="/collections/crop">Crop collection</Link>
          </div>
          <div>
            <p className="footer__label">Brand</p>
            <Link to="/heritage">Heritage</Link>
            <Link to="/contact">Contact</Link>
            <a href={INSTAGRAM} target="_blank" rel="noreferrer">
              Instagram
            </a>
          </div>
          <div>
            <p className="footer__label">Order</p>
            <a href={whatsappGeneralUrl()} target="_blank" rel="noreferrer">
              WhatsApp chat
            </a>
            <a href="tel:+250780814163">+250 780 814 163</a>
          </div>
        </div>
        <p className="footer__copy">© {new Date().getFullYear()} IMENA Brand · @imena_luxe_prints</p>
      </footer>

      <a
        className="wa-fab"
        href={whatsappGeneralUrl()}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
      >
        WhatsApp
      </a>

      <SearchModal />
      <CartDrawer />
    </div>
  )
}
