export interface SkinMeta {
  id: string;
  label: string;
  defaultMode: 'light' | 'dark';
}

// Metadata only — no component imports, so skin Layouts can read this list
// (for the skin picker) without a circular import on `./skins`.
export const skinList: SkinMeta[] = [
  { id: 'swiss', label: 'Swiss Grid', defaultMode: 'light' },
  { id: 'western', label: 'Western', defaultMode: 'light' },
  { id: 'console', label: 'Console', defaultMode: 'dark' },
];

export const DEFAULT_SKIN: string = 'swiss';
