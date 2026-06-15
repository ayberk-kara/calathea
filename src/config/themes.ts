/*
  Theme registry. Each entry corresponds to a src/styles/themes/<id>.css file
  that defines the full token contract (see THEMES.md) for both light and
  dark modes via [data-theme="<id>"][data-mode="light|dark"].

  To add a theme:
  1. Copy src/styles/themes/_template.css to src/styles/themes/<id>.css and
     fill in every token for both modes.
  2. Import that file from src/styles/global.css.
  3. Add an entry below — it will appear in the theme picker automatically.
*/

export interface ThemeDefinition {
  id: string;
  label: string;
}

export const themes: ThemeDefinition[] = [
  { id: 'western', label: 'Western' },
  { id: 'swiss', label: 'Swiss Grid' },
  { id: 'console', label: 'Console' },
  { id: 'editorial', label: 'Editorial' },
  { id: 'brutalist', label: 'Brutalist' },
];

export const DEFAULT_THEME = 'western';

export type ThemeId = (typeof themes)[number]['id'];
