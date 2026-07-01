import type { Locale } from '../lib/i18n';
import { en, type UIStrings } from './en';
import { tr } from './tr';

const dictionaries: Record<Locale, UIStrings> = { en, tr };

export function getUI(locale: Locale): UIStrings {
  return dictionaries[locale];
}

export type { UIStrings };
