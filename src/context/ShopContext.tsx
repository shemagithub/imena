import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { getProduct, type Product } from '../data'

export type CartItem = {
  key: string
  productId: string
  size: string
  qty: number
}

type ShopContextValue = {
  cart: CartItem[]
  wishlist: string[]
  searchOpen: boolean
  cartOpen: boolean
  setSearchOpen: (open: boolean) => void
  setCartOpen: (open: boolean) => void
  addToCart: (productId: string, size: string, qty?: number) => void
  removeFromCart: (key: string) => void
  updateQty: (key: string, qty: number) => void
  toggleWishlist: (productId: string) => void
  cartCount: number
  cartProducts: { item: CartItem; product: Product }[]
}

const ShopContext = createContext<ShopContextValue | null>(null)

function loadList(key: string): string[] {
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as string[]) : []
  } catch {
    return []
  }
}

function loadCart(): CartItem[] {
  try {
    const raw = localStorage.getItem('imena-cart')
    return raw ? (JSON.parse(raw) as CartItem[]) : []
  } catch {
    return []
  }
}

export function ShopProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() => loadCart())
  const [wishlist, setWishlist] = useState<string[]>(() => loadList('imena-wishlist'))
  const [searchOpen, setSearchOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)

  useEffect(() => {
    localStorage.setItem('imena-cart', JSON.stringify(cart))
  }, [cart])

  useEffect(() => {
    localStorage.setItem('imena-wishlist', JSON.stringify(wishlist))
  }, [wishlist])

  const addToCart = useCallback((productId: string, size: string, qty = 1) => {
    const key = `${productId}__${size}`
    setCart((prev) => {
      const existing = prev.find((i) => i.key === key)
      if (existing) {
        return prev.map((i) =>
          i.key === key ? { ...i, qty: i.qty + qty } : i,
        )
      }
      return [...prev, { key, productId, size, qty }]
    })
    setCartOpen(true)
  }, [])

  const removeFromCart = useCallback((key: string) => {
    setCart((prev) => prev.filter((i) => i.key !== key))
  }, [])

  const updateQty = useCallback((key: string, qty: number) => {
    if (qty < 1) {
      setCart((prev) => prev.filter((i) => i.key !== key))
      return
    }
    setCart((prev) => prev.map((i) => (i.key === key ? { ...i, qty } : i)))
  }, [])

  const toggleWishlist = useCallback((productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId],
    )
  }, [])

  const cartProducts = useMemo(
    () =>
      cart
        .map((item) => {
          const product = getProduct(item.productId)
          return product ? { item, product } : null
        })
        .filter((x): x is { item: CartItem; product: Product } => Boolean(x)),
    [cart],
  )

  const cartCount = useMemo(
    () => cart.reduce((sum, i) => sum + i.qty, 0),
    [cart],
  )

  const value = useMemo(
    () => ({
      cart,
      wishlist,
      searchOpen,
      cartOpen,
      setSearchOpen,
      setCartOpen,
      addToCart,
      removeFromCart,
      updateQty,
      toggleWishlist,
      cartCount,
      cartProducts,
    }),
    [
      cart,
      wishlist,
      searchOpen,
      cartOpen,
      addToCart,
      removeFromCart,
      updateQty,
      toggleWishlist,
      cartCount,
      cartProducts,
    ],
  )

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>
}

export function useShop() {
  const ctx = useContext(ShopContext)
  if (!ctx) throw new Error('useShop must be used within ShopProvider')
  return ctx
}
