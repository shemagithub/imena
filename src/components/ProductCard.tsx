import { Link } from 'react-router-dom'
import { formatPrice, type Product } from '../data'
import { useShop } from '../context/ShopContext'
import { JerseyVisual } from './JerseyVisual'
import { IconHeart } from './Icons'

type Props = {
  product: Product
  showCrest?: boolean
}

export function ProductCard({ product, showCrest = true }: Props) {
  const { wishlist, toggleWishlist } = useShop()
  const loved = wishlist.includes(product.id)

  return (
    <article className="pcard">
      <div className={`pcard__media pcard__media--${product.theme}`}>
        <button
          type="button"
          className={`pcard__wish ${loved ? 'is-active' : ''}`}
          aria-label={loved ? 'Remove from wishlist' : 'Add to wishlist'}
          onClick={() => toggleWishlist(product.id)}
        >
          <IconHeart filled={loved} size={18} />
        </button>
        {product.badge && <span className="pcard__badge">{product.badge}</span>}
        <Link to={`/product/${product.id}`} className="pcard__link-visual">
          <JerseyVisual theme={product.theme} crop={product.collection === 'crop'} />
        </Link>
        {showCrest && (
          <span className="pcard__crest" aria-hidden>
            IM
          </span>
        )}
      </div>
      <div className="pcard__body">
        <Link to={`/product/${product.id}`} className="pcard__title">
          {product.name}
        </Link>
        <p className="pcard__meta">
          {product.color} · {formatPrice(product.price, product.currency)}
        </p>
        <Link to={`/product/${product.id}`} className="pcard__cta">
          View kit →
        </Link>
      </div>
    </article>
  )
}
