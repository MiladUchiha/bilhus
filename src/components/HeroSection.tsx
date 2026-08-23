'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import BookingPopup from './BookingPopup';

const heroImages = [
  '/heropics/1.jpg',
  '/heropics/2.jpg',
  '/heropics/3.jpg',
  '/heropics/4.jpg',
  '/heropics/5.jpg',
  '/heropics/6.jpg',
];

export default function HeroSection() {
  const t = useTranslations('hero');
  const tCommon = useTranslations('common');
  const heroRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showBookingPopup, setShowBookingPopup] = useState(false);

  useEffect(() => {
    const targets = [
      eyebrowRef.current,
      titleRef.current,
      taglineRef.current,
      actionsRef.current,
      metaRef.current,
    ];

    gsap.set(targets, { opacity: 0, y: 28 });

    const tl = gsap.timeline({ defaults: { ease: 'expo.out', duration: 1.1 } });
    tl.to(eyebrowRef.current, { opacity: 1, y: 0, duration: 0.6 })
      .to(titleRef.current, { opacity: 1, y: 0 }, '-=0.2')
      .to(taglineRef.current, { opacity: 1, y: 0, duration: 0.9 }, '-=0.7')
      .to(actionsRef.current, { opacity: 1, y: 0, duration: 0.7 }, '-=0.6')
      .to(metaRef.current, { opacity: 1, y: 0, duration: 0.7 }, '-=0.5');
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-[100svh] overflow-hidden"
      aria-label={t('title')}
    >
      {/* Background slideshow — sole hero medium */}
      <div className="absolute inset-0 z-0">
        {heroImages.map((image, index) => (
          <div
            key={image}
            className={`absolute inset-0 transition-opacity duration-2000 ease-out ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={image}
              alt=""
              fill
              className="object-cover"
              priority={index === 0}
              loading={index === 0 ? 'eager' : 'lazy'}
              quality={index === 0 ? 95 : 85}
              sizes="100vw"
            />
          </div>
        ))}
        {/* Layered scrim — preserves photography at top, ensures title legibility at bottom */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, oklch(0.18 0.012 60 / 0.50) 0%, oklch(0.18 0.012 60 / 0.10) 28%, oklch(0.18 0.012 60 / 0.55) 55%, oklch(0.18 0.012 60 / 0.90) 80%, oklch(0.10 0.012 60 / 0.95) 100%)',
          }}
        />
      </div>

      {/* Content — bottom-left aligned, editorial */}
      <div className="relative z-10 flex min-h-[100svh] flex-col">
        <div className="flex-1" />

        <div className="px-5 pb-12 sm:px-10 sm:pb-16 lg:px-16 lg:pb-20 xl:px-24">
          <div className="max-w-[1280px] mx-auto">
            {/* Eyebrow */}
            <div
              ref={eyebrowRef}
              className="mb-6 flex items-center gap-3 text-paper/85"
            >
              <span className="h-px w-10 bg-paper/60" />
              <span className="font-mono text-[11px] uppercase tracking-[0.18em]">
                Märsta Bilhus · {t('footer.location')}
              </span>
            </div>

            {/* Title — Fraunces display */}
            <h1
              ref={titleRef}
              className="font-display text-paper text-[clamp(2.75rem,8vw,7rem)] leading-[0.95] tracking-[-0.03em] max-w-[20ch] [text-shadow:_0_2px_30px_rgba(0,0,0,0.35)]"
              style={{ fontVariationSettings: "'opsz' 144, 'SOFT' 30" }}
            >
              {t('title')}
            </h1>

            {/* Tagline */}
            <p
              ref={taglineRef}
              className="mt-8 max-w-[42ch] text-paper/90 text-lg sm:text-xl leading-[1.5] font-light"
            >
              {t('tagline')}
              <span className="block text-paper/70 mt-1">{t('services')}</span>
            </p>

            {/* Actions */}
            <div
              ref={actionsRef}
              className="mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4"
            >
              <button
                onClick={() => setShowBookingPopup(true)}
                className="group inline-flex items-center justify-center gap-3 bg-paper px-7 py-4 text-ink font-medium tracking-tight transition-colors duration-200 hover:bg-garnet hover:text-paper"
              >
                <span>{t('cta')}</span>
                <svg
                  className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </button>
              <a
                href="/cars"
                className="inline-flex items-center justify-center gap-2 border border-paper/40 px-7 py-4 text-paper transition-colors duration-200 hover:bg-paper hover:text-ink"
              >
                {tCommon('seeCars')}
              </a>
            </div>
          </div>
        </div>

        {/* Meta strip — bottom edge */}
        <div
          ref={metaRef}
          className="border-t border-paper/15 bg-ink/30 backdrop-blur-[2px]"
        >
          <div className="max-w-[1280px] mx-auto px-5 sm:px-10 lg:px-16 xl:px-24 py-5">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-10 text-paper/85">
              <MetaItem label={t('footer.authorizedService')} value={t('footer.brands')} />
              <MetaItem label={t('footer.location')} value={t('footer.country')} />
              <MetaItem label="Tel" value="08-59 120 541" mono />
              <MetaItem label="Est." value="1979" mono />
            </div>
          </div>
        </div>

        {/* Slide indicators — subtle, bottom-right */}
        <div className="absolute right-5 sm:right-10 lg:right-16 xl:right-24 bottom-32 sm:bottom-36 z-20 flex flex-col items-end gap-3">
          <span className="font-mono text-[11px] text-paper/70 tabular">
            {String(currentImageIndex + 1).padStart(2, '0')} / {String(heroImages.length).padStart(2, '0')}
          </span>
          <div className="flex gap-1.5">
            {heroImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`h-px transition-all duration-500 ease-out ${
                  index === currentImageIndex ? 'w-10 bg-paper' : 'w-5 bg-paper/40 hover:bg-paper/70'
                }`}
                aria-label={`${t('navigation.showImage')} ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      <BookingPopup
        isOpen={showBookingPopup}
        onClose={() => setShowBookingPopup(false)}
      />
    </section>
  );
}

function MetaItem({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-paper/55">
        {label}
      </span>
      <span className={`text-sm ${mono ? 'font-mono tabular text-paper' : 'text-paper'}`}>
        {value}
      </span>
    </div>
  );
}
