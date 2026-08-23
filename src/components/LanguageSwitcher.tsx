'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';
import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';

interface LanguageSwitcherProps {
  isScrolled?: boolean;
  hasLightBackground?: boolean;
}

export default function LanguageSwitcher({
  isScrolled = false,
  hasLightBackground = false,
}: LanguageSwitcherProps = {}) {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const languages = [
    { code: 'sv', name: 'Svenska' },
    { code: 'en', name: 'English' },
  ];

  const current = languages.find((l) => l.code === locale) ?? languages[0];

  const onDark = !isScrolled && !hasLightBackground;
  const triggerClass = onDark
    ? 'text-paper border-paper/30 hover:border-paper/60'
    : 'text-ink border-line hover:border-ink-3';

  const handleChange = (newLocale: string) => {
    const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}/, '');
    router.push(`/${newLocale}${pathWithoutLocale}`);
    setIsOpen(false);
  };

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    if (panelRef.current && isOpen) {
      gsap.fromTo(panelRef.current, { opacity: 0, y: -6 }, { opacity: 1, y: 0, duration: 0.25, ease: 'expo.out' });
    }
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen((v) => !v)}
        className={`inline-flex items-center gap-2 border px-3 py-2 transition-colors duration-200 ${triggerClass}`}
        aria-label="Change language"
      >
        <span className="font-mono text-[11px] tabular uppercase tracking-[0.12em]">
          {current.code}
        </span>
        <svg
          className={`h-3 w-3 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {isOpen && (
        <div
          ref={panelRef}
          className="absolute right-0 top-full mt-2 min-w-[160px] bg-paper border border-line z-50"
        >
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleChange(lang.code)}
              className={`w-full flex items-center justify-between px-4 py-3 text-left transition-colors duration-200 ${
                locale === lang.code ? 'text-ink' : 'text-ink-2 hover:text-ink'
              }`}
            >
              <span className="text-sm">{lang.name}</span>
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-3">
                {lang.code}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
