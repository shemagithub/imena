type Props = {
  src: string
  alt: string
  className?: string
  priority?: boolean
  sizes?: string
}

export function ProductImage({
  src,
  alt,
  className,
  priority = false,
  sizes = '(max-width: 640px) 90vw, (max-width: 1100px) 45vw, 320px',
}: Props) {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      width={1000}
      height={1250}
      sizes={sizes}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      fetchPriority={priority ? 'high' : 'auto'}
      draggable={false}
    />
  )
}
