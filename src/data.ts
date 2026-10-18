export const WHATSAPP = '250780814163'
export const INSTAGRAM = 'https://www.instagram.com/imena_luxe_prints/'
export const PHONE_DISPLAY = '+250 780 814 163'

export type Theme = 'black' | 'white' | 'cream'
export type CollectionId = 'intore' | 'crop' | 'heritage' | 'custom'

export type Product = {
  id: string
  name: string
  color: string
  price: number
  currency: string
  description: string
  fit: string
  theme: Theme
  collection: CollectionId
  badge?: string
  sizes: string[]
  featured?: boolean
}

export type Collection = {
  id: CollectionId
  name: string
  tagline: string
  description: string
}

export const collections: Collection[] = [
  {
    id: 'intore',
    name: 'Intore Jerseys',
    tagline: 'Signature RWANDA kits',
    description: 'Our flagship jerseys with bold wordmark and geometric trim.',
  },
  {
    id: 'crop',
    name: 'Crop Collection',
    tagline: 'Fitted street cuts',
    description: 'Cropped silhouettes for a sharp, modern Intore look.',
  },
  {
    id: 'heritage',
    name: 'Heritage',
    tagline: 'Everyday pride tees',
    description: 'Relaxed tees carrying Rwandan identity into daily wear.',
  },
  {
    id: 'custom',
    name: 'Custom Prints',
    tagline: 'Clothes · bags · caps',
    description: 'Design and print services for your team, event, or brand.',
  },
]

export const products: Product[] = [
  {
    id: 'intore-black',
    name: 'Intore Jersey',
    color: 'Black',
    price: 35000,
    currency: 'RWF',
    description:
      'Signature black jersey with RWANDA wordmark, flag accent, and geometric collar trim. Premium print for match day and street.',
    fit: 'Unisex · Regular fit',
    theme: 'black',
    collection: 'intore',
    badge: 'New Drop',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    featured: true,
  },
  {
    id: 'intore-white',
    name: 'Intore Jersey',
    color: 'White',
    price: 35000,
    currency: 'RWF',
    description:
      'Clean white jersey with bold black RWANDA print and patterned cuffs. Crisp contrast for everyday pride.',
    fit: 'Unisex · Regular fit',
    theme: 'white',
    collection: 'intore',
    badge: 'Bestseller',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    featured: true,
  },
  {
    id: 'intore-crop',
    name: 'Intore Crop',
    color: 'Black',
    price: 32000,
    currency: 'RWF',
    description:
      'Cropped silhouette with the same heritage pattern and chest wordmark. Built for movement and style.',
    fit: 'Women · Crop fit',
    theme: 'black',
    collection: 'crop',
    badge: 'New',
    sizes: ['XS', 'S', 'M', 'L'],
    featured: true,
  },
  {
    id: 'heritage-cream',
    name: 'Heritage Tee',
    color: 'Cream',
    price: 28000,
    currency: 'RWF',
    description:
      'Soft cream tee with RWANDA graphic and subtle all-over texture. Easy everyday wear.',
    fit: 'Unisex · Relaxed',
    theme: 'cream',
    collection: 'heritage',
    sizes: ['S', 'M', 'L', 'XL'],
    featured: true,
  },
  {
    id: 'intore-cream',
    name: 'Intore Jersey',
    color: 'Cream',
    price: 35000,
    currency: 'RWF',
    description:
      'Warm cream jersey with charcoal RWANDA print and flag detail on the chest.',
    fit: 'Unisex · Regular fit',
    theme: 'cream',
    collection: 'intore',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
  },
  {
    id: 'crop-white',
    name: 'Intore Crop',
    color: 'White',
    price: 32000,
    currency: 'RWF',
    description: 'White crop jersey with black wordmark and geometric sleeve trim.',
    fit: 'Women · Crop fit',
    theme: 'white',
    collection: 'crop',
    sizes: ['XS', 'S', 'M', 'L'],
  },
]

export function getProduct(id: string) {
  return products.find((p) => p.id === id)
}

export function getCollection(id: string) {
  return collections.find((c) => c.id === id)
}

export function productsByCollection(id: CollectionId) {
  return products.filter((p) => p.collection === id)
}

export function formatPrice(amount: number, currency = 'RWF') {
  return new Intl.NumberFormat('en-RW', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function whatsappOrderUrl(product: Product, size?: string) {
  const sizeLine = size ? `\n• Size: ${size}` : ''
  const text = encodeURIComponent(
    `Muraho! I want to order:\n\n• ${product.name} (${product.color})${sizeLine}\n• Price: ${formatPrice(product.price, product.currency)}\n\nFrom the IMENA Brand website.`,
  )
  return `https://wa.me/${WHATSAPP}?text=${text}`
}

export function whatsappCartUrl(
  items: { product: Product; size: string; qty: number }[],
) {
  const lines = items
    .map(
      (i) =>
        `• ${i.product.name} (${i.product.color}) — Size ${i.size} × ${i.qty} — ${formatPrice(i.product.price * i.qty, i.product.currency)}`,
    )
    .join('\n')
  const total = items.reduce((sum, i) => sum + i.product.price * i.qty, 0)
  const text = encodeURIComponent(
    `Muraho! I want to order from IMENA Brand:\n\n${lines}\n\nTotal: ${formatPrice(total)}\n\nPlease confirm availability.`,
  )
  return `https://wa.me/${WHATSAPP}?text=${text}`
}

export function whatsappGeneralUrl() {
  const text = encodeURIComponent(
    'Muraho! I want to order an IMENA jersey / custom print.',
  )
  return `https://wa.me/${WHATSAPP}?text=${text}`
}
