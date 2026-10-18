import { formatPrice, whatsappCartUrl } from '../data'
import { useShop } from '../context/ShopContext'
import { JerseyVisual } from './JerseyVisual'
import { IconClose } from './Icons'

export function CartDrawer() {
  const { cartOpen, setCartOpen, cartProducts, updateQty, removeFromCart } = useShop()

  const total = cartProducts.reduce(
    (sum, { item, product }) => sum + product.price * item.qty,
    0,
  )

  return (
    <>
      <div
        className={`drawer-backdrop ${cartOpen ? 'is-open' : ''}`}
        onClick={() => setCartOpen(false)}
        aria-hidden={!cartOpen}
      />
      <aside
        className={`drawer ${cartOpen ? 'is-open' : ''}`}
        aria-hidden={!cartOpen}
        aria-label="Shopping bag"
      >
        <header className="drawer__head">
          <h2>Your bag</h2>
          <button type="button" className="icon-btn" onClick={() => setCartOpen(false)} aria-label="Close bag">
            <IconClose />
          </button>
        </header>

        {cartProducts.length === 0 ? (
          <div className="drawer__empty">
            <p>Your bag is empty.</p>
            <button type="button" className="btn btn--primary" onClick={() => setCartOpen(false)}>
              Continue shopping
            </button>
          </div>
        ) : (
          <>
            <ul className="drawer__list">
              {cartProducts.map(({ item, product }) => (
                <li key={item.key} className="drawer__item">
                  <div className={`drawer__thumb drawer__thumb--${product.theme}`}>
                    <JerseyVisual theme={product.theme} crop={product.collection === 'crop'} />
                  </div>
                  <div className="drawer__info">
                    <p className="drawer__name">
                      {product.name} · {product.color}
                    </p>
                    <p className="drawer__size">Size {item.size}</p>
                    <p className="drawer__price">
                      {formatPrice(product.price * item.qty, product.currency)}
                    </p>
                    <div className="drawer__qty">
                      <button type="button" onClick={() => updateQty(item.key, item.qty - 1)} aria-label="Decrease quantity">
                        −
                      </button>
                      <span>{item.qty}</span>
                      <button type="button" onClick={() => updateQty(item.key, item.qty + 1)} aria-label="Increase quantity">
                        +
                      </button>
                      <button
                        type="button"
                        className="drawer__remove"
                        onClick={() => removeFromCart(item.key)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <footer className="drawer__foot">
              <div className="drawer__total">
                <span>Total</span>
                <strong>{formatPrice(total)}</strong>
              </div>
              <a
                className="btn btn--primary btn--block"
                href={whatsappCartUrl(
                  cartProducts.map(({ item, product }) => ({
                    product,
                    size: item.size,
                    qty: item.qty,
                  })),
                )}
                target="_blank"
                rel="noreferrer"
              >
                Checkout on WhatsApp
              </a>
              <p className="drawer__note">We’ll confirm size & delivery in chat.</p>
            </footer>
          </>
        )}
      </aside>
    </>
  )
}
