import type { Locale } from '../lib/i18n';
import { en, type UIStrings } from './en';

const dictionaries: Record<Locale, UIStrings> = { en, tr: en };

export function getUI(locale: Locale): UIStrings {
  return dictionaries[locale];
}

export type { UIStrings };
