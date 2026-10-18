export const WHATSAPP = '250780814163'
export const INSTAGRAM = 'https://www.instagram.com/imena_luxe_prints/'
export const PHONE_DISPLAY = '+250 780 814 163'

export type Theme = 'black' | 'white' | 'cream' | 'navy' | 'yellow'
export type CollectionId = 'intore' | 'crop' | 'heritage' | 'pride'

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
  image: string
  gallery?: string[]
  badge?: string
  sizes: string[]
  featured?: boolean
}

export type Collection = {
  id: CollectionId
  name: string
  tagline: string
  description: string
  image: string
}

const IMG = '/images/products'

export const collections: Collection[] = [
  {
    id: 'intore',
    name: 'Intore Jerseys',
    tagline: 'Signature RWANDA kits',
    description:
      'Flagship jerseys with bold RWANDA wordmark, flag crest, and geometric heritage trim.',
    image: `${IMG}/collection-trio.jpg`,
  },
  {
    id: 'crop',
    name: 'Crop Collection',
    tagline: 'Fitted street cuts',
    description:
      'Cropped silhouettes with cultural figure prints and Imigongo collar trim.',
    image: `${IMG}/crop-black-mannequin.jpg`,
  },
  {
    id: 'pride',
    name: 'Pride Colors',
    tagline: 'Navy · Yellow · Flag kits',
    description:
      'Bold colorways celebrating Rwanda — from deep navy to sunshine yellow.',
    image: `${IMG}/jersey-navy-iziza.jpg`,
  },
  {
    id: 'heritage',
    name: 'Heritage Lookbook',
    tagline: 'Worn with pride',
    description:
      'Lifestyle shots of IMENA kits — street, studio, and stadium energy.',
    image: `${IMG}/lookbook-duo-bw.jpg`,
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
      'Signature black jersey with RWANDA wordmark, IMENA crest, flag badge, and geometric body print.',
    fit: 'Unisex · Regular fit',
    theme: 'black',
    collection: 'intore',
    image: `${IMG}/jersey-black-outdoor.jpg`,
    gallery: [
      `${IMG}/jersey-black-outdoor.jpg`,
      `${IMG}/jersey-black-curtains.jpg`,
      `${IMG}/jersey-black-lifestyle.jpg`,
    ],
    badge: 'New Drop',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    featured: true,
  },
  {
    id: 'intore-figures',
    name: 'Intore Figures',
    color: 'Black',
    price: 35000,
    currency: 'RWF',
    description:
      'Black jersey with cultural figure grid print, geometric collar and cuff trim, and bold RWANDA chest type.',
    fit: 'Unisex · Regular fit',
    theme: 'black',
    collection: 'intore',
    image: `${IMG}/jersey-black-figures.jpg`,
    gallery: [`${IMG}/jersey-black-figures.jpg`, `${IMG}/jersey-black-curtains.jpg`],
    badge: 'Heritage Print',
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
      'Clean white jersey with navy RWANDA print, flag crest, and subtle geometric sublimation.',
    fit: 'Unisex · Regular fit',
    theme: 'white',
    collection: 'intore',
    image: `${IMG}/jersey-white-studio.jpg`,
    gallery: [`${IMG}/jersey-white-studio.jpg`, `${IMG}/jersey-white-stadium.jpg`],
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
      'Cropped black jersey with RWANDA wordmark, figure motifs, and full geometric collar, cuff, and hem trim.',
    fit: 'Women · Crop fit',
    theme: 'black',
    collection: 'crop',
    image: `${IMG}/crop-black-mannequin.jpg`,
    gallery: [`${IMG}/crop-black-mannequin.jpg`],
    badge: 'New',
    sizes: ['XS', 'S', 'M', 'L'],
    featured: true,
  },
  {
    id: 'pride-navy',
    name: 'Rwanda Iziza',
    color: 'Navy',
    price: 38000,
    currency: 'RWF',
    description:
      'Deep navy kit with yellow RWANDA / IZIZA type, blue geometric columns, and Inyambo horn icons.',
    fit: 'Unisex · Regular fit',
    theme: 'navy',
    collection: 'pride',
    image: `${IMG}/jersey-navy-iziza.jpg`,
    gallery: [`${IMG}/jersey-navy-iziza.jpg`, `${IMG}/collection-trio.jpg`],
    badge: 'Pride',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    featured: true,
  },
  {
    id: 'pride-yellow',
    name: 'Sunshine Jersey',
    color: 'Yellow',
    price: 38000,
    currency: 'RWF',
    description:
      'Vivid yellow jersey with forest-green RWANDA type, orange Imigongo diamonds, and white Inyambo icons.',
    fit: 'Unisex · Regular fit',
    theme: 'yellow',
    collection: 'pride',
    image: `${IMG}/jersey-yellow-close.jpg`,
    gallery: [`${IMG}/jersey-yellow-close.jpg`, `${IMG}/collection-trio.jpg`],
    badge: 'Limited',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    featured: true,
  },
  {
    id: 'heritage-duo',
    name: 'Heritage Pair Look',
    color: 'Black / White',
    price: 35000,
    currency: 'RWF',
    description:
      'Matching his & hers RWANDA kits with IMENA hex logo and geometric side panels — as seen in the lookbook.',
    fit: 'Unisex · Regular fit',
    theme: 'cream',
    collection: 'heritage',
    image: `${IMG}/lookbook-duo-bw.jpg`,
    gallery: [`${IMG}/lookbook-duo-bw.jpg`, `${IMG}/jersey-white-stadium.jpg`],
    sizes: ['S', 'M', 'L', 'XL'],
    featured: true,
  },
  {
    id: 'white-stadium',
    name: 'Stadium White',
    color: 'White',
    price: 35000,
    currency: 'RWF',
    description:
      'White RWANDA jersey styled for match-day energy — flag crest and subtle geometric print.',
    fit: 'Unisex · Regular fit',
    theme: 'white',
    collection: 'heritage',
    image: `${IMG}/jersey-white-stadium.jpg`,
    gallery: [`${IMG}/jersey-white-stadium.jpg`, `${IMG}/jersey-white-studio.jpg`],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
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
