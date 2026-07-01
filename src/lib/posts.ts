import type { CollectionEntry } from 'astro:content';

export interface PostPill {
  label: string;
  kind: 'release' | 'docs' | 'deep-dive' | 'note';
  major: boolean;
}

/** Derives a VersionPill's label/kind from a post's tags (and, for releases, its title). */
export function getPostPill(post: CollectionEntry<'posts'>): PostPill {
  const { title, tags } = post.data;

  if (tags.includes('release')) {
    const version = title.match(/v\d+\.\d+\.\d+/i)?.[0] ?? 'RELEASE';
    return { label: version, kind: 'release', major: version.endsWith('.0.0') };
  }

  if (tags.includes('deep-dive')) {
    return { label: 'DEEP DIVE', kind: 'deep-dive', major: false };
  }

  return { label: 'DEV NOTE', kind: 'note', major: false };
}

const DAY_MS = 24 * 60 * 60 * 1000;

/** Coarse "time ago" string for feed rows, relative to `now` (defaults to build time). */
export function formatRelativeDate(date: Date, now: Date = new Date()): string {
  const days = Math.floor((now.getTime() - date.getTime()) / DAY_MS);

  if (days < 1) return 'today';
  if (days < 7) return `${days}d ago`;
  if (days < 30) return `${Math.floor(days / 7)}w ago`;
  if (days < 365) return `${Math.floor(days / 30)}mo ago`;
  return `${Math.floor(days / 365)}y ago`;
}

const WORDS_PER_MINUTE = 200;

/** Estimated reading time in minutes for a post's raw MD/MDX body. */
export function getReadingTime(body: string): number {
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

/** "Sep 28, 2025" (short) or "September 28, 2025" (long). */
export function formatPostDate(date: Date, style: 'short' | 'long' = 'short'): string {
  return date.toLocaleDateString('en-US', { month: style, day: 'numeric', year: 'numeric' });
}
