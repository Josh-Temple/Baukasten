import React, { createContext, useContext, useEffect, useState } from 'react';
import { COPY, selectLanguage } from './localization.js';

export type Language = 'ja' | 'en';
type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  copy: typeof COPY.en;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);
const STORAGE_KEY = 'baukasten-language';

function initialLanguage(): Language {
  let stored: string | null = null;
  try {
    stored = window.localStorage.getItem(STORAGE_KEY);
  } catch {
    // Private browsing and storage restrictions must not block rendering.
  }
  return selectLanguage(window.location.search, stored, navigator.language) as Language;
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, updateLanguage] = useState<Language>(initialLanguage);

  const setLanguage = (next: Language) => {
    if (next !== 'en' && next !== 'ja') return;
    updateLanguage(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // The URL remains a shareable, persistent preference when storage fails.
    }
    const url = new URL(window.location.href);
    url.searchParams.set('lang', next);
    window.history.replaceState(window.history.state, '', url.pathname + url.search + url.hash);
  };

  useEffect(() => {
    document.documentElement.lang = language;
    for (const selector of ['meta[name="description"]', 'meta[property="og:description"]']) {
      document.querySelector<HTMLMetaElement>(selector)?.setAttribute('content', COPY[language].metaDescription);
    }
    document.querySelector<HTMLMetaElement>('meta[property="og:locale"]')
      ?.setAttribute('content', language === 'ja' ? 'ja_JP' : 'en_US');
    document.querySelector<HTMLLinkElement>('link[rel="canonical"]')
      ?.setAttribute('href', 'https://josh-temple.github.io/Baukasten/?lang=' + language);
    // The site is a client-rendered, hash-routed gallery. This updates metadata
    // for the active language, but does not claim independently indexed detail pages.
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, copy: COPY[language] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('LanguageProvider is required');
  return context;
}

export function LanguageSwitcher() {
  const { language, setLanguage, copy } = useLanguage();
  return (
    <div role="group" aria-label={copy.language} className="inline-flex shrink-0 items-center gap-1 rounded-xl border border-slate-300 bg-white p-1">
      {([
        ['ja', '日本語'],
        ['en', 'EN'],
      ] as const).map(([value, label]) => (
        <button
          key={value}
          type="button"
          lang={value}
          aria-pressed={language === value}
          onClick={() => setLanguage(value)}
          className={
            'min-h-11 rounded-lg px-3 text-xs font-bold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 ' +
            (language === value ? 'bg-[#1A1A1A] text-white' : 'text-slate-700 hover:bg-slate-100')
          }
        >
          {label}
        </button>
      ))}
    </div>
  );
}
