export const LOCALES = ['en', 'tr'] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'en';

interface Localizable {
  id: string;
  data: { lang: string };
}

/**
 * Content entries are named "<slug>" for the default-locale version and
 * "<slug>.<locale>" for a translation (e.g. `gpu-inference.tr.md`); both
 * share `<slug>` as their cross-locale key.
 */
export function getSlug(id: string): string {
  return id.replace(/\.(en|tr)$/, '');
}

/** The entry matching `locale` for `slug`, falling back to the default locale. */
export function localize<T extends Localizable>(entries: T[], slug: string, locale: Locale): T | undefined {
  return (
    entries.find((entry) => getSlug(entry.id) === slug && entry.data.lang === locale) ??
    entries.find((entry) => getSlug(entry.id) === slug && entry.data.lang === DEFAULT_LOCALE)
  );
}

/** One entry per slug, preferring `locale`'s translation and falling back to the default. */
export function localizeAll<T extends Localizable>(entries: T[], locale: Locale): T[] {
  const slugs = [...new Set(entries.map((entry) => getSlug(entry.id)))];
  return slugs
    .map((slug) => localize(entries, slug, locale))
    .filter((entry): entry is T => entry !== undefined);
}
