export type Locale =
  | 'en'
  | 'hi'
  | 'bn'
  | 'te'
  | 'mr'
  | 'ta'
  | 'es'
  | 'fr'
  | 'de'
  | 'ar'
  | 'pt';

export interface Language {
  code: Locale;
  /** English name */
  label: string;
  /** Native name */
  native: string;
  dir: 'ltr' | 'rtl';
}

export const LANGUAGES: Language[] = [
  { code: 'en', label: 'English', native: 'English', dir: 'ltr' },
  { code: 'hi', label: 'Hindi', native: 'हिन्दी', dir: 'ltr' },
  { code: 'bn', label: 'Bengali', native: 'বাংলা', dir: 'ltr' },
  { code: 'te', label: 'Telugu', native: 'తెలుగు', dir: 'ltr' },
  { code: 'mr', label: 'Marathi', native: 'मराठी', dir: 'ltr' },
  { code: 'ta', label: 'Tamil', native: 'தமிழ்', dir: 'ltr' },
  { code: 'es', label: 'Spanish', native: 'Español', dir: 'ltr' },
  { code: 'fr', label: 'French', native: 'Français', dir: 'ltr' },
  { code: 'de', label: 'German', native: 'Deutsch', dir: 'ltr' },
  { code: 'ar', label: 'Arabic', native: 'العربية', dir: 'rtl' },
  { code: 'pt', label: 'Portuguese', native: 'Português', dir: 'ltr' },
];

export const DEFAULT_LOCALE: Locale = 'en';
export const STORAGE_KEY = 'eirion-lang';

export function isLocale(v: string | null): v is Locale {
  return LANGUAGES.some((l) => l.code === v);
}
