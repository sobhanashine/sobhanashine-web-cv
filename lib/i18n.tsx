"use client";

/**
 * Language layer for the bilingual site.
 *
 * Holds the active locale, persists it to localStorage, and keeps the
 * <html> element's `lang` / `dir` / `data-lang` attributes in sync so the
 * CSS in globals.css can swap to RTL + the Vazirmatn font for Persian.
 *
 * Components read copy via `useContent()` and switch language via `useLang()`.
 */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { content, type Content, type Lang } from "@/lib/content";

const STORAGE_KEY = "lang";

type LangContextValue = {
  lang: Lang;
  dir: "ltr" | "rtl";
  setLang: (lang: Lang) => void;
  toggle: () => void;
  t: Content;
};

const LangContext = createContext<LangContextValue | null>(null);

function applyToDocument(lang: Lang) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  root.lang = lang;
  root.dir = lang === "fa" ? "rtl" : "ltr";
  root.dataset.lang = lang;
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  // Hydrate from the value the no-flash script already applied to <html>.
  useEffect(() => {
    const fromDom = document.documentElement.dataset.lang;
    let initial: Lang = fromDom === "fa" ? "fa" : "en";
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "fa" || saved === "en") initial = saved;
    } catch {
      /* localStorage unavailable — fall back to the DOM value */
    }
    setLangState(initial);
    applyToDocument(initial);
  }, []);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    applyToDocument(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore persistence failures */
    }
  }, []);

  const toggle = useCallback(() => {
    setLang(lang === "en" ? "fa" : "en");
  }, [lang, setLang]);

  const value: LangContextValue = {
    lang,
    dir: lang === "fa" ? "rtl" : "ltr",
    setLang,
    toggle,
    t: content[lang],
  };

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) {
    throw new Error("useLang must be used within a LanguageProvider");
  }
  return ctx;
}

/** Convenience hook for components that only need the active copy. */
export function useContent() {
  return useLang().t;
}

/**
 * Inline script string that sets <html> lang/dir before first paint,
 * preventing a flash of LTR/English when Persian was previously chosen.
 */
export const noFlashScript = `(function(){try{var l=localStorage.getItem('${STORAGE_KEY}');if(l==='fa'){var e=document.documentElement;e.lang='fa';e.dir='rtl';e.dataset.lang='fa';}}catch(e){}})();`;
