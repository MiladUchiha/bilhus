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
  hasLightBackground = false 
}: LanguageSwitcherProps = {}) {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const languages = [
    { code: 'sv', name: 'Svenska', flag: '🇸🇪' },
    { code: 'en', name: 'English', flag: '🇺🇸' }
  ];

  const currentLanguage = languages.find(lang => lang.code === locale) || languages[0];

  const handleLanguageChange = (newLocale: string) => {
    const currentPathname = pathname;
    // Remove current locale from pathname and add new locale
    const pathnameWithoutLocale = currentPathname.replace(/^\/[a-z]{2}/, '');
    const newPath = `/${newLocale}${pathnameWithoutLocale}`;
    
    router.push(newPath);
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // GSAP animation for dropdown
  useEffect(() => {
    if (dropdownRef.current) {
      if (isOpen) {
        gsap.fromTo(dropdownRef.current, 
          { opacity: 0, y: -10 },
          { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }
        );
      }
    }
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        ref={buttonRef}
        onClick={toggleDropdown}
        className={`flex items-center space-x-2 px-3 py-2 rounded-lg backdrop-blur-sm border transition-all duration-300 ${
          isScrolled || hasLightBackground 
            ? 'bg-gray-100/80 border-gray-300/50 hover:bg-gray-200/80 text-gray-900 hover:text-gray-700'
            : 'bg-white/10 border-white/20 hover:bg-white/20 text-white hover:text-white/90'
        }`}
        style={{
          textShadow: isScrolled || hasLightBackground ? 'none' : '2px 2px 4px rgba(0,0,0,0.8)'
        }}
        aria-label="Change language"
      >
        <span className="text-sm">{currentLanguage.flag}</span>
        <span className="text-sm font-medium hidden sm:block">{currentLanguage.code.toUpperCase()}</span>
        <svg 
          className={`w-4 h-4 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-40 bg-white/95 backdrop-blur-lg border border-gray-200/50 rounded-lg shadow-lg overflow-hidden z-50">
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => handleLanguageChange(language.code)}
              className={`w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-100/80 transition-colors duration-200 ${
                locale === language.code 
                  ? 'bg-gray-100/80 text-gray-900 font-medium' 
                  : 'text-gray-700 hover:text-gray-900'
              }`}
            >
              <span className="text-lg">{language.flag}</span>
              <span className="text-sm">{language.name}</span>
              {locale === language.code && (
                <svg className="w-4 h-4 ml-auto text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}