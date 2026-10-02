'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useTranslations } from 'next-intl';

interface BookingPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BookingPopup({ isOpen, onClose }: BookingPopupProps) {
  const t = useTranslations();
  const overlayRef = useRef<HTMLDivElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      gsap.set(overlayRef.current, { opacity: 0 });
      gsap.set(popupRef.current, { opacity: 0, y: 24 });
      gsap.to(overlayRef.current, { opacity: 1, duration: 0.25, ease: 'power2.out' });
      gsap.to(popupRef.current, { opacity: 1, y: 0, duration: 0.5, ease: 'expo.out' });
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleClose = () => {
    gsap.to(popupRef.current, { opacity: 0, y: 24, duration: 0.2, ease: 'power2.in' });
    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.25,
      onComplete: onClose,
    });
  };

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 bg-ink/60 backdrop-blur-[2px] flex items-center justify-center p-5"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        ref={popupRef}
        className="bg-paper max-w-[460px] w-full p-10 sm:p-12 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 text-ink-3 hover:text-ink transition-colors duration-200 p-1"
          aria-label={t('common.close')}
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="mb-8">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-garnet">
            {t('common.bookTime')}
          </span>
          <h3 className="mt-3 font-display text-3xl tracking-[-0.02em] text-ink leading-[1.1]">
            {t('booking.title')}
          </h3>
          <p className="mt-4 text-[15px] text-ink-2 leading-[1.55] max-w-[40ch]">
            {t('booking.description')}
          </p>
        </div>

        <div className="space-y-3">
          <a
            href="tel:+46700929433"
            className="group flex items-center justify-between border border-line hover:border-ink px-5 py-4 transition-colors duration-200"
          >
            <div>
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-3 block">
                {t('booking.phoneLabel')}
              </span>
              <span className="font-mono text-base tabular text-ink mt-0.5 block group-hover:text-garnet transition-colors duration-200">
                0700 929 433
              </span>
            </div>
            <svg className="h-4 w-4 text-ink-2 group-hover:text-ink transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </a>

          <a
            href="mailto:kundservice@marstabilhus.se"
            className="group flex items-center justify-between border border-line hover:border-ink px-5 py-4 transition-colors duration-200"
          >
            <div>
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-3 block">
                {t('booking.emailLabel')}
              </span>
              <span className="text-base text-ink mt-0.5 block group-hover:text-garnet transition-colors duration-200">
                kundservice@marstabilhus.se
              </span>
            </div>
            <svg className="h-4 w-4 text-ink-2 group-hover:text-ink transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
