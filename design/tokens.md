# Morland Real Estate Appraisals — design tokens

All tokens are declared as CSS custom properties in `styles.css` `:root`.

## Colour
| Token | Hex | Use |
|---|---|---|
| `--color-primary` | `#0B5CC2` | Links, stat numbers, outlined button, focus |
| `--color-primary-dark` | `#083E85` | CTA band, hero fallback, link hover |
| `--color-primary-tint` | `#EAF1FB` | Subtle fills, input focus ring |
| `--color-accent` | `#B8964E` | Gold from the logo outline: rules, top borders, nav underline |
| `--color-accent-deep` | `#8C7035` | Solid button (white text = 4.7:1), eyebrows, team titles |
| `--color-ink` | `#16202B` | Body text |
| `--color-ink-muted` | `#5A6572` | Secondary text |
| `--color-neutral` | `#F4F6F8` | Alternating section background |
| `--color-border` | `#DCE1E7` | Thin rules, form fields, card borders |
| `--color-white` | `#FFFFFF` | Page background |
| `--color-black` | `#000000` | Header, footer, Institute block (matches the logo plate) |

Hero overlay: `rgba(8, 20, 40, 0.58)` over photos.

## Type
Family: `"Public Sans"` (Google Fonts) — variation B. Variation A (`site/`) remains on `"Source Sans 3"`., fallback `"Segoe UI", system-ui, sans-serif`.
Weights: 400 regular, 600 semibold (nav, labels, buttons), 700 bold (headings, stats).

| Token | Size | Use |
|---|---|---|
| `--text-sm` | 15px | Nav, labels, eyebrows, footer |
| `--text-base` | 18px | Body |
| `--text-lg` | 20px | Ledes, list headings |
| `--text-xl` | 24px | h3, team names |
| `--text-2xl` | 32px | Institute block, CTA band h2 |
| `--text-3xl` | 40px | h2, page-hero h1, big phone |
| `--text-4xl` | 52px | Home hero h1 |

Line-height: `--leading-tight` 1.15 (headings), `--leading-snug` 1.3 (h3), `--leading-normal` 1.6 (body).
Under 600px: 4xl → 40px, 3xl → 32px, 2xl → 26px.

## Spacing
`--space-1` 4 · `--space-2` 8 · `--space-3` 12 · `--space-4` 16 · `--space-5` 24 · `--space-6` 32 · `--space-7` 48 · `--space-8` 64 · `--space-9` 96
Section padding `--section-y`: 96px desktop, 64px under 900px.

## Shape and layout
- `--radius`: 4px (buttons, cards, inputs, photos)
- `--container`: 1120px, gutter 24px
- `--header-h`: 88px desktop, 72px mobile
- Note: the Appraisal Institute of Canada logo has a white wordmark, so it always sits on `--color-black`.
- Buttons: 48px min height, 1.5px border. Primary = solid accent-deep; secondary = outlined primary (white variant on dark).
- Cards: 1px border + 3px accent top border, no shadows.
- Breakpoints: 1120px (mobile nav), 1024px (grids to 2 col), 900px (single column), 600px (single column grids, stacked buttons).

## Images
Cloudinary transforms used: `f_auto,q_auto,w_1920` heroes and bands · `w_1400` team photo · `w_1080` downtown · `w_800` AIC logo · `w_772` header logo (2x) · `w_112` icons (2x) · `w_240,h_240,c_fill,g_face` headshots.
