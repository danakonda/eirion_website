import { ApplicationRef, Injectable, inject, signal } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { DEFAULT_LOCALE, LANGUAGES, STORAGE_KEY, isLocale, type Locale } from './languages';
import { en } from './en';

export type Dict = Record<string, string>;

/** Non-English dictionaries are lazy-loaded so they don't bloat the initial bundle. */
const LOADERS: Record<Locale, () => Promise<Dict>> = {
  en: () => Promise.resolve(en),
  hi: () => import('./hi').then((m) => m.hi),
  bn: () => import('./bn').then((m) => m.bn),
  te: () => import('./te').then((m) => m.te),
  mr: () => import('./mr').then((m) => m.mr),
  ta: () => import('./ta').then((m) => m.ta),
  es: () => import('./es').then((m) => m.es),
  fr: () => import('./fr').then((m) => m.fr),
  de: () => import('./de').then((m) => m.de),
  ar: () => import('./ar').then((m) => m.ar),
  pt: () => import('./pt').then((m) => m.pt),
};

const TITLE_KEYS: Array<[RegExp, string]> = [
  [/^\/contact\/?$/, 'meta.title.contact'],
  [/^\/terms\/?$/, 'meta.title.terms'],
  [/^\/?$/, 'meta.title.home'],
];

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private readonly appRef = inject(ApplicationRef);
  private readonly title = inject(Title);

  readonly lang = signal<Locale>(DEFAULT_LOCALE);
  readonly languages = LANGUAGES;

  private readonly dicts = new Map<Locale, Dict>([[DEFAULT_LOCALE, en]]);
  private readonly pending = new Map<Locale, Promise<Dict>>();

  constructor() {
    let saved: Locale = DEFAULT_LOCALE;
    try {
      const s = window.localStorage.getItem(STORAGE_KEY);
      if (isLocale(s)) saved = s;
    } catch {
      /* storage unavailable */
    }
    this.lang.set(saved);
    if (saved === DEFAULT_LOCALE) {
      this.apply();
    } else {
      // render in English first, switch as soon as the dictionary arrives
      this.load(saved).then(() => {
        this.apply();
        this.appRef.tick();
      });
    }
  }

  setLang(code: Locale): void {
    if (this.lang() === code && this.dicts.has(code)) return;
    if (this.dicts.has(code)) {
      this.switchTo(code);
      return;
    }
    this.load(code).then(() => this.switchTo(code));
  }

  /** Translate a key; falls back to English, then the key itself. */
  t(key: string): string {
    const code = this.lang();
    return this.dicts.get(code)?.[key] ?? en[key] ?? key;
  }

  private switchTo(code: Locale): void {
    this.lang.set(code);
    try {
      window.localStorage.setItem(STORAGE_KEY, code);
    } catch {
      /* storage unavailable */
    }
    this.apply();
    // re-render impure translate pipes across OnPush components
    this.appRef.tick();
  }

  private load(code: Locale): Promise<Dict> {
    let p = this.pending.get(code);
    if (!p) {
      p = LOADERS[code]().then((d) => {
        this.dicts.set(code, d);
        return d;
      });
      this.pending.set(code, p);
    }
    return p;
  }

  private apply(): void {
    const code = this.lang();
    const meta = LANGUAGES.find((l) => l.code === code) ?? LANGUAGES[0];
    document.documentElement.lang = code;
    document.documentElement.dir = meta.dir;
    const path = window.location.pathname;
    const match = TITLE_KEYS.find(([re]) => re.test(path));
    this.title.setTitle(this.t(match ? match[1] : 'meta.title.home'));
  }
}
