# Skins

Calathea is built from three layers that never mix:

1. **Content** — `src/content/*` (projects, posts) + `src/data/profile.ts` (experience, education,
   skills) + `src/i18n/*` (UI strings). The single source of truth. Skins never define content.
2. **Behavior** — `src/behavior/*.ts`. Skin-agnostic scripts that implement every interactive
   feature once, driven entirely by `data-*` attributes. Skins never reimplement behavior.
3. **Skin** — `src/skins/<id>/*`. Per-theme markup + CSS. A skin may differ completely in layout,
   structure, type, spacing, decoration — anything visual — but supplies zero content and zero
   behavior logic, only the contract-shaped components and the attributes the behavior layer
   expects.

A page route (`src/pages/[locale]/...`) fetches content, then renders every registered skin's
components with that data. Only the active skin is visible (toggled via `data-skin` on `<html>`,
see [Skin registry & switching](#skin-registry--switching)).

---

## Skin contract

A skin is a directory `src/skins/<id>/` exporting exactly these components, plus one stylesheet.
Every component is a plain `.astro` file; props are listed below.

```
src/skins/<id>/
  Layout.astro
  HomePage.astro
  ProjectsIndexPage.astro
  ProjectDetailPage.astro
  BlogIndexPage.astro
  PostPage.astro
  NotFoundPage.astro
  ProjectCard.astro
  PostCard.astro
  ExperienceRow.astro
  EducationRow.astro
  skin.css
```

### Shell slot

#### `Layout`
Wraps every page: nav (locale switcher, section links, mode toggle, skin picker, mobile nav
toggle), `<main>` for the page slot, footer. The outermost element carries
`data-skin-root={skinId}` — this is what the switching mechanism shows/hides.

```ts
interface Props {
  skinId: string;
  active: 'home' | 'projects' | 'blog' | null;
  locale: Locale;
}
```

### Page slots

One per route. Each receives only data already fetched by the page (collection entries, profile
data, `t` = `getUI(locale)`). None of these may hardcode copy — everything user-visible comes from
`props.t` or the collection entries.

#### `HomePage`
```ts
interface Props {
  locale: Locale;
  t: UIStrings;
  featuredProjects: CollectionEntry<'projects'>[];
  recentPosts: CollectionEntry<'posts'>[];
  experience: ExperienceEntry[];
  education: EducationEntry[];
  skills: typeof skills; // { languages: string[], ml: string[], infra: string[] }
}
```
Renders hero, skills, experience/education (via `ExperienceRow`/`EducationRow` + the
all/engineering-only filter), featured projects (via `ProjectCard`), recent posts (via
`PostCard`), and the contact form.

#### `ProjectsIndexPage`
```ts
interface Props {
  locale: Locale;
  t: UIStrings;
  projects: CollectionEntry<'projects'>[];
}
```
Page header + tag filter + grid of `ProjectCard`.

#### `ProjectDetailPage`
```ts
interface Props {
  locale: Locale;
  t: UIStrings;
  project: CollectionEntry<'projects'>;
  Content: AstroComponentFactory; // rendered MDX/MD body
  relatedPosts: CollectionEntry<'posts'>[];
}
```
Title/summary/meta (role, timeline, stack, status, links), `<Prose><Content /></Prose>`, related
posts (via `PostCard`).

#### `BlogIndexPage`
```ts
interface Props {
  locale: Locale;
  t: UIStrings;
  posts: CollectionEntry<'posts'>[];
  projectTitles: Map<string, string>; // project slug -> localized title, for cross-links
}
```
Page header + tag filter + list of `PostCard`.

#### `PostPage`
```ts
interface Props {
  locale: Locale;
  t: UIStrings;
  post: CollectionEntry<'posts'>;
  Content: AstroComponentFactory;
  project?: CollectionEntry<'projects'>;
  prev?: CollectionEntry<'posts'>;
  next?: CollectionEntry<'posts'>;
}
```
Title/date/tags/reading time, optional "back to project" link, `<Prose><Content /></Prose>`,
prev/next navigation.

#### `NotFoundPage`
```ts
interface Props {
  locale: Locale;
  t: UIStrings;
}
```
Static 404 content. `src/pages/404.astro` is outside `[locale]` routing, so it always renders this
with `locale = DEFAULT_LOCALE`.

### Item slots

Reusable renderers for repeated data, used by the page slots above.

#### `ProjectCard`
```ts
interface Props {
  project: CollectionEntry<'projects'>;
  locale: Locale;
}
```

#### `PostCard`
```ts
interface Props {
  post: CollectionEntry<'posts'>;
  locale: Locale;
  projectTitle?: string;
}
```

#### `ExperienceRow`
```ts
interface Props extends ExperienceEntry {} // title, org, range, summary?, bullets?, eng
```

#### `EducationRow`
```ts
interface Props extends EducationEntry {} // degree, org, location?, range, summary?, bullets?, coursework?, highlight
```

---

## Behavior interface

Four scripts, loaded once by `BaseLayout` regardless of which skins are present, each scoped via
`querySelectorAll` so duplicate skin blocks (render-all model) don't double-register or conflict.
A skin opts into a feature purely by emitting the matching `data-*` attributes/structure — markup
shape is otherwise free.

### `src/behavior/expand.ts` — expand on hover / click / focus

- `[data-expand]` — the row/card. Skin gives it `tabindex="0"`. Script ensures
  `data-expanded="false"` and `aria-expanded="false"` initially.
- `[data-expand-region]` — descendant of `[data-expand]`; the collapsible content.
- Skin CSS shows the region when `[data-expand]:hover`, `[data-expand]:focus-within`, or
  `[data-expand][data-expanded='true']` — all pure CSS, wrapped in
  `@media (prefers-reduced-motion: no-preference)` for the transition itself so reduced-motion
  users get instant show/hide.
- Script toggles `data-expanded`/`aria-expanded` on click (ignoring clicks that land on a nested
  `a`/`button`/`input`/`textarea`/`select`/`label`) and on `Enter`/`Space` when the
  `[data-expand]` element itself has focus.

Used by `ExperienceRow` and `EducationRow`.

### `src/behavior/filter.ts` — generic tag/category filter

Powers both the projects/posts tag filter and the experience all/engineering-only toggle — same
primitive, different vocabularies.

- `[data-filter-group]` — container of `<button data-filter-value="...">`. One button's value is
  the "show everything" state (e.g. `all`).
- `[data-filter-group][data-filter-target="<id>"]` — `id` of the `[data-filter-list]` element it
  controls.
- `[data-filter-list]` — gets `data-active-filter="<value>"` written by the script.
- `[data-filter-item data-filter-tags="space separated values"]` — items inside the list. Shown
  when `data-active-filter` is `all` (or matches the group's "everything" value) or appears in the
  item's `data-filter-tags`.
- `[data-filter-status][data-filter-template="{visible} / {total} {noun}"][data-filter-noun="..."]`
  (optional) — script fills in `{visible}`/`{total}`/`{noun}`.

Script sets `aria-pressed` on the buttons and toggles each item's inline `display`. For the
experience toggle: items get `data-filter-tags="eng"` when `eng: true` and omit it otherwise; the
group has buttons `data-filter-value="all"` and `data-filter-value="eng"`. For project/post tag
filters: items get `data-filter-tags` set to their full tag list; the group has one button per tag
plus `all`.

### `src/behavior/contact-form.ts` — Web3Forms submission

- `[data-contact-form][data-sending-text][data-success-text][data-error-text]` — the `<form>`.
  Fields named `name`, `email`, `subject`, `message`, plus a honeypot `botcheck`.
- `[data-contact-status]` — element the script writes status text into and sets
  `data-state="success" | "error"` on (skin styles these states).
- `button[type="submit"]` inside the form — disabled and re-labeled with `data-sending-text`
  during submission, restored after.

Posts to `https://api.web3forms.com/submit` with `PUBLIC_WEB3FORMS_KEY` from the env, exactly as
the old `BlogContact.astro` script did, just rehomed to `querySelectorAll`.

### `src/behavior/site-controls.ts` — mode, skin, mobile nav

- `[data-mode-toggle]` — button; flips `html[data-mode]` between `light`/`dark`, persists to
  `localStorage.mode`.
- `[data-skin-select]` — `<select>` of registered skins; only rendered by a skin's `Layout` when
  `skins.length > 1`. Sets `html[data-skin]`, persists to `localStorage.skin`.
- `[data-nav-toggle][aria-controls="<id>"]` — mobile nav burger; toggles its own `aria-expanded`
  and an `is-open` class on the target element. Skin CSS shows/hides the nav based on `.is-open`.

### EN/TR locale switching — not a behavior script

Pure link-based, via the existing `src/lib/i18n.ts` helpers and Astro's i18n routing. Each skin's
`Layout`/nav renders `<a href={...}>EN</a>` / `<a href={...}>TR</a>` directly — no JS, no shared
script, graceful fallback already handled by `localize()`.

---

## Prose token contract

`src/components/Prose.astro` and `src/components/Callout.astro` stay outside `src/skins/` because
MDX content imports `Callout` directly (`src/content/**/*.mdx`). Since `<Content />` is rendered
once per visible skin block, both components are styled entirely from CSS custom properties that
**every skin must define**, scoped under `[data-skin='<id>'][data-mode='light']` and
`[data-skin='<id>'][data-mode='dark']`:

| Token | Used for |
|---|---|
| `--prose-text` | body text, list text |
| `--prose-heading` | `h2`/`h3`/`strong` |
| `--prose-link` | `a` color/underline; also feeds `--astro-code-token-link` |
| `--prose-accent` | `Callout` left border; tints inline `code` background |
| `--prose-surface` | base color blended with `--prose-accent` for `code`/`Callout` backgrounds |
| `--prose-border` | `pre`/`code`/`Callout` borders |
| `--prose-font-mono` | `code`/`pre` font |
| `--prose-code-bg` | Shiki block background |
| `--prose-code-fg` | Shiki default text |
| `--prose-code-comment` | Shiki comments |
| `--prose-code-keyword` | Shiki keywords |
| `--prose-code-type` | Shiki strings/types |
| `--prose-code-number` | Shiki constants/numbers |
| `--prose-code-function` | Shiki function names |

Each skin's `skin.css` also maps the 8 code tokens onto Astro's Shiki `css-variables` theme
(mechanical, identical in every skin):

```css
--astro-code-foreground: var(--prose-code-fg);
--astro-code-background: var(--prose-code-bg);
--astro-code-token-constant: var(--prose-code-number);
--astro-code-token-string: var(--prose-code-type);
--astro-code-token-comment: var(--prose-code-comment);
--astro-code-token-keyword: var(--prose-code-keyword);
--astro-code-token-parameter: var(--prose-code-fg);
--astro-code-token-function: var(--prose-code-function);
--astro-code-token-string-expression: var(--prose-code-type);
--astro-code-token-punctuation: var(--prose-code-fg);
--astro-code-token-link: var(--prose-link);
```

Spacing/sizing inside `Prose`/`Callout` (margins, radii, border widths, max-width) is hardcoded —
it's structural, not part of any skin's design language, and doesn't need to vary.

---

## Skin registry & switching

`src/config/skins.ts`:

```ts
import SwissLayout from '../skins/swiss/Layout.astro';
import SwissHomePage from '../skins/swiss/HomePage.astro';
// ...one import per contract component
import '../skins/swiss/skin.css';

const swiss = {
  Layout: SwissLayout,
  HomePage: SwissHomePage,
  // ...
};

export type SkinComponents = typeof swiss;

export interface SkinDefinition {
  id: string;
  label: string;
  components: SkinComponents;
}

export const skins: SkinDefinition[] = [
  { id: 'swiss', label: 'Swiss Grid', components: swiss },
];

export const DEFAULT_SKIN: string = 'swiss';
```

Adding a skin = new `src/skins/<id>/` directory implementing the contract + one entry in `skins`.
`SkinComponents` is derived from the first skin's shape, so TypeScript flags any future skin
that's missing a slot.

**Switching mechanism** (mirrors the old `data-theme`/`data-mode` pattern): every page renders
**all** registered skins' markup:

```astro
{skins.map(({ id, components: Skin }) => (
  <Skin.Layout skinId={id} active="home" locale={locale}>
    <Skin.HomePage {...homeProps} />
  </Skin.Layout>
))}
```

Each `Layout` wraps its output in `data-skin-root={skinId}`. Each skin's `skin.css` carries one
self-contained visibility rule:

```css
html:not([data-skin='swiss']) [data-skin-root='swiss'] {
  display: none;
}
```

`<html data-skin="...">` is set by an inline no-flash script in `BaseLayout` (same pattern as the
existing `data-mode` script): reads `localStorage.skin`, validates it against the registry, falls
back to `DEFAULT_SKIN`. The skin `<select>` (`[data-skin-select]`) is only rendered when
`skins.length > 1` — with a single registered skin today, no picker appears and the
`display: none` rule is a no-op.

This keeps "add a skin" to *one directory + one registry entry* — no shared file needs to know the
list of skins.

---

## Open questions for review

- Confirm the 11-slot contract above covers everything the Swiss design (and the pages it doesn't
  show) will need — landing, projects index, project detail, blog index, blog post, contact, 404.
- Confirm the render-all-skins + `data-skin` visibility-toggle switching mechanism, vs. alternatives
  (e.g. server-side selection, which isn't possible on a static site without per-skin routes).
- Confirm the generic `filter` primitive is an acceptable unification of the tag filter and the
  experience all/engineering-only toggle.
