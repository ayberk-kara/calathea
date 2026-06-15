export interface SkinMeta {
  id: string;
  label: string;
}

// Metadata only — no component imports, so skin Layouts can read this list
// (for the skin picker) without a circular import on `./skins`.
export const skinList: SkinMeta[] = [
  { id: 'swiss', label: 'Swiss Grid' },
  { id: 'western', label: 'Western' },
  { id: 'console', label: 'Console' },
];

export const DEFAULT_SKIN: string = 'swiss';
