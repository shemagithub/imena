import { useId } from 'react'
import type { Theme } from '../data'

type Props = {
  theme: Theme
  crop?: boolean
  className?: string
}

const palette = {
  black: { body: '#121212', ink: '#F2F2EE', trim: '#E8E8E2' },
  white: { body: '#F7F7F4', ink: '#111111', trim: '#1A1A1A' },
  cream: { body: '#E8E0D2', ink: '#1A1A1A', trim: '#2A2A2A' },
}

export function JerseyVisual({ theme, crop = false, className }: Props) {
  const c = palette[theme]
  const uid = useId().replace(/:/g, '')

  return (
    <svg
      className={className ?? 'jersey-visual'}
      viewBox={crop ? '0 18 200 165' : '0 0 200 220'}
      role="img"
      aria-label={`${theme} IMENA RWANDA jersey`}
    >
      <defs>
        <pattern id={uid} width="12" height="12" patternUnits="userSpaceOnUse">
          <path
            d="M0 6h12M6 0v12M2 2l8 8M10 2l-8 8"
            stroke={c.ink}
            strokeWidth="0.6"
            opacity="0.18"
          />
        </pattern>
        <filter id={`${uid}-soft`} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="10" stdDeviation="8" floodOpacity="0.18" />
        </filter>
      </defs>

      <g filter={`url(#${uid}-soft)`}>
        <path
          d={
            crop
              ? 'M55 28 L70 22 L100 26 L130 22 L145 28 L155 55 L148 70 L148 175 L52 175 L52 70 L45 55 Z'
              : 'M55 28 L70 22 L100 26 L130 22 L145 28 L155 55 L148 70 L148 210 L52 210 L52 70 L45 55 Z'
          }
          fill={c.body}
        />
        <path
          d={
            crop
              ? 'M55 28 L70 22 L100 26 L130 22 L145 28 L155 55 L148 70 L148 175 L52 175 L52 70 L45 55 Z'
              : 'M55 28 L70 22 L100 26 L130 22 L145 28 L155 55 L148 70 L148 210 L52 210 L52 70 L45 55 Z'
          }
          fill={`url(#${uid})`}
        />

        <path
          d="M78 30 Q100 42 122 30 L118 48 Q100 56 82 48 Z"
          fill={c.trim}
          opacity="0.9"
        />
        <rect x="45" y="52" width="14" height="8" fill={c.trim} opacity="0.85" />
        <rect x="141" y="52" width="14" height="8" fill={c.trim} opacity="0.85" />

        <text
          x="100"
          y={crop ? 105 : 118}
          textAnchor="middle"
          fill={c.ink}
          fontFamily="Barlow Condensed, sans-serif"
          fontWeight="800"
          fontSize="28"
          letterSpacing="3"
        >
          RWANDA
        </text>

        <g transform="translate(138 78)">
          <rect width="14" height="3.2" fill="#00A1DE" />
          <rect y="3.2" width="14" height="3.2" fill="#FAD201" />
          <rect y="6.4" width="14" height="3.2" fill="#20603D" />
        </g>
      </g>
    </svg>
  )
}
