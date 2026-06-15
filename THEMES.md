# Theming

The site's visual identity is split into two independent axes:

- **theme** — a palette + font family ("Western", and later others), set via
  `data-theme="<id>"` on `<html>`.
- **mode** — light or dark, set via `data-mode="light"` or `data-mode="dark"`
  on `<html>`.

Components consume only **semantic, role-based tokens**. A theme file
provides the values for those tokens for both modes. Switching theme or mode
must only ever change colors and font families — never layout, spacing,
markup, or behavior.

## Token contract

Every theme file (`src/styles/themes/<id>.css`) must define **all** of the
tokens below, inside both a `[data-theme='<id>'][data-mode='light']` block and
a `[data-theme='<id>'][data-mode='dark']` block. The two blocks do not cascade
into each other — repeat a value in both blocks if it doesn't change between
modes.

### Surfaces
- `--bg` — page background
- `--surface` — card / panel background
- `--surface-alt` — input / nested-field background
- `--surface-alt-border` — border for `--surface-alt` elements
- `--border` — default hairline border
- `--border-strong` — heavier border (header rules, card outlines)

### Text
- `--text` — primary text color
- `--text-muted` — secondary / de-emphasized text

### Accents
- `--accent` — primary accent (e.g. section headers, primary buttons)
- `--accent-shade` — a deeper tone of `--accent`, used for resting-state
  accent surfaces (e.g. social-link buttons before hover)
- `--on-accent` — text/icon color on top of `--accent`
- `--accent-2` — secondary accent
- `--on-accent-2` — text/icon color on top of `--accent-2`
- `--accent-3` — tertiary accent
- `--on-accent-3` — text/icon color on top of `--accent-3`

There is deliberately no separate `--section-header` token. Section headers,
eyebrows, and page headers already cycle through `--accent` / `--accent-2` /
`--accent-3` via a `color` prop — that three-way rhythm is part of the fixed
visual identity (CLAUDE.md: "reproduce it, never reinterpret it"), and a
single header token would collapse it.

### Status
- `--success` — affirmative status text (e.g. contact form success message)
- `--danger` — error status text (e.g. contact form error message)

These may simply alias existing accents (e.g. `--success: var(--accent)`,
`--danger: var(--accent-2)`) if the palette doesn't have dedicated
success/danger colors.

### Decorative stripes
- `--stripe-a`, `--stripe-b` — the two colors used in the diagonal-stripe
  video/media placeholders

### Code blocks (Shiki `css-variables` theme)
- `--code-bg`, `--code-fg`, `--code-comment`, `--code-keyword`, `--code-type`,
  `--code-number`, `--code-function`
- The `--astro-code-*` variables, mapped from the tokens above (copy these
  mappings as-is from `western.css` — they rarely need to change):
  - `--astro-code-foreground: var(--code-fg)`
  - `--astro-code-background: var(--code-bg)`
  - `--astro-code-token-constant: var(--code-number)`
  - `--astro-code-token-string: var(--code-type)`
  - `--astro-code-token-comment: var(--code-comment)`
  - `--astro-code-token-keyword: var(--code-keyword)`
  - `--astro-code-token-parameter: var(--code-fg)`
  - `--astro-code-token-function: var(--code-function)`
  - `--astro-code-token-string-expression: var(--code-type)`
  - `--astro-code-token-punctuation: var(--code-fg)`
  - `--astro-code-token-link: var(--accent-2)`

### Typography
- `--font-display` — display/heading font (e.g. logo, large headings)
- `--font-body` — body text font
- `--font-mono` — monospace font (labels, nav, code)

If a theme needs different web fonts than the ones already loaded, add the
relevant `<link>`/`@font-face` to `src/layouts/BaseLayout.astro` and reference
the family names here.

## Theme-agnostic layer

Everything that is **not** color or font lives once, for every theme, in
`src/styles/tokens.css`: border widths, radii, content measures, and the
spacing scale. Theme files must not redefine these.

## Adding a theme

1. Copy `src/styles/themes/_template.css` to `src/styles/themes/<id>.css` and
   fill in every token above for both `[data-mode='light']` and
   `[data-mode='dark']`.
2. Import the new file from `src/styles/global.css`.
3. Add `{ id: '<id>', label: '<Display Name>' }` to the `themes` array in
   `src/config/themes.ts`. It appears in the theme picker automatically.
4. (Optional) Change `DEFAULT_THEME` in `src/config/themes.ts` to make the new
   theme the default.

No component, layout, or content file should need to change.

## Persistence and no-flash loading

`src/layouts/BaseLayout.astro` sets `data-theme` and `data-mode` on `<html>`
as static fallback attributes, then runs an inline `<script>` (before first
paint) that:

- reads `theme` and `mode` from `localStorage`,
- falls back to `DEFAULT_THEME` (theme) and `prefers-color-scheme` (mode) when
  unset,
- sets both attributes on `document.documentElement`.

The theme picker and mode toggle in `src/components/Header.astro` update
these attributes and persist the new values to `localStorage` under the same
`theme` / `mode` keys.
