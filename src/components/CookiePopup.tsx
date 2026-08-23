'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

export default function CookiePopup() {
  const t = useTranslations('cookies.popup');
  const popupRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem('cookies-accepted') && !localStorage.getItem('cookies-rejected')) {
        const timer = setTimeout(() => setIsVisible(true), 1200);
        return () => clearTimeout(timer);
      }
    } catch {
      /* localStorage unavailable */
    }
  }, []);

  useEffect(() => {
    if (isVisible && popupRef.current) {
      gsap.fromTo(
        popupRef.current,
        { opacity: 0, y: 32 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'expo.out' }
      );
    }
  }, [isVisible]);

  const close = (action: 'accept' | 'reject' | 'dismiss') => {
    try {
      if (action === 'accept') localStorage.setItem('cookies-accepted', 'true');
      if (action === 'reject') localStorage.setItem('cookies-rejected', 'true');
    } catch {
      /* localStorage unavailable */
    }
    gsap.to(popupRef.current, {
      opacity: 0,
      y: 32,
      duration: 0.3,
      ease: 'power2.in',
      onComplete: () => setIsVisible(false),
    });
  };

  if (!isVisible) return null;

  return (
    <div
      ref={popupRef}
      className="fixed bottom-5 left-5 right-5 sm:left-auto sm:right-6 sm:bottom-6 sm:max-w-[420px] z-50 bg-paper border border-line shadow-[0_30px_60px_-25px_oklch(0.18_0.012_60_/_0.35)]"
      role="dialog"
      aria-modal="false"
    >
      <div className="p-7">
        <div className="flex items-start justify-between gap-4 mb-5">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-garnet">
              {t('title')}
            </span>
          </div>
          <button
            onClick={() => close('dismiss')}
            className="text-ink-3 hover:text-ink transition-colors duration-200 -mt-1 -mr-1 p-1"
            aria-label={t('close')}
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <p className="text-[14px] text-ink-2 leading-[1.6] mb-7 max-w-[40ch]">
          {t('description')}
        </p>

        <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
          <button
            onClick={() => close('accept')}
            className="inline-flex items-center justify-center gap-2 bg-ink px-5 py-2.5 text-paper text-sm font-medium transition-colors duration-200 hover:bg-garnet"
          >
            {t('accept')}
          </button>
          <button
            onClick={() => close('reject')}
            className="text-sm text-ink-2 hover:text-ink transition-colors duration-200"
          >
            <span className="link-underline">{t('reject')}</span>
          </button>
          <button
            onClick={() => router.push('/cookies')}
            className="text-sm text-ink-2 hover:text-ink transition-colors duration-200"
          >
            <span className="link-underline">{t('moreInfo')}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
