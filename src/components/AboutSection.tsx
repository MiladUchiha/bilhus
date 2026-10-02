'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AboutSection() {
  const t = useTranslations('about');
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
        gsap.from(el, {
          y: 28,
          opacity: 0,
          duration: 1.0,
          ease: 'expo.out',
          scrollTrigger: { trigger: el, start: 'top 88%' },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-paper py-24 sm:py-32 lg:py-40 overflow-hidden"
    >
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Editorial header with floating year */}
        <div className="relative mb-20 sm:mb-28">
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 lg:col-span-3" data-reveal>
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-garnet" />
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-garnet">
                  {t('title')}
                </span>
              </div>
            </div>
            <div className="col-span-12 lg:col-span-9" data-reveal>
              <h2 className="font-display text-[clamp(2.25rem,5vw,4.5rem)] leading-[1.0] tracking-[-0.025em] text-ink max-w-[18ch]">
                {t('titleEmphasized')}
              </h2>
              <p className="mt-6 font-display text-xl sm:text-2xl italic text-ink-2 max-w-[42ch] leading-[1.35]">
                {t('subtitle')}
              </p>
            </div>
          </div>
        </div>

        {/* Image + content — asymmetric */}
        <div className="grid grid-cols-12 gap-8 lg:gap-12 mb-24 lg:mb-32">
          <div data-reveal className="col-span-12 lg:col-span-7 order-2 lg:order-1">
            <div className="relative aspect-[4/3] lg:aspect-[5/4] overflow-hidden bg-paper-2">
              <Image
                src="/bilhus.jpg"
                alt={`${t('titleEmphasized')} facility`}
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover"
                quality={92}
              />
              {/* Caption strip */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-ink/70 to-transparent p-5 sm:p-8">
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-paper/80">
                  Märsta Bilhus · Arlandastad
                </p>
              </div>
            </div>
          </div>

          <div data-reveal className="col-span-12 lg:col-span-5 order-1 lg:order-2 flex flex-col justify-center">
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-3 mb-3">
              {t('expertise.title')}
            </span>
            <p className="font-display text-2xl sm:text-[1.75rem] leading-[1.25] tracking-[-0.015em] text-ink mb-8 max-w-[26ch]">
              {t('expertise.description')}
            </p>

            <dl className="space-y-6 border-t border-line pt-8">
              {[
                { k: t('whyChoose.uniqueLocation.title'), v: t('whyChoose.uniqueLocation.description') },
                { k: t('whyChoose.aixam.title'), v: t('whyChoose.aixam.description') },
                { k: t('whyChoose.financing.title'), v: t('whyChoose.financing.description') },
              ].map((row, i) => (
                <div key={i} className="grid grid-cols-12 gap-4">
                  <dt className="col-span-12 sm:col-span-4 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-3 pt-0.5">
                    {row.k}
                  </dt>
                  <dd className="col-span-12 sm:col-span-8 text-[15px] text-ink-2 leading-[1.55]">
                    {row.v}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-garnet px-7 py-4 text-paper font-medium transition-colors duration-200 hover:bg-garnet-hover"
              >
                {t('cta.contact')}
              </Link>
              <Link
                href="/cars"
                className="inline-flex items-center justify-center gap-2 border border-ink px-7 py-4 text-ink transition-colors duration-200 hover:bg-ink hover:text-paper"
              >
                {t('cta.services')}
              </Link>
            </div>
          </div>
        </div>

        {/* Location highlight — minimal, editorial, no card */}
        <div data-reveal className="border-t border-line pt-16 lg:pt-20">
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 lg:col-span-4">
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-garnet">
                {t('locationHighlight.title')}
              </span>
            </div>
            <div className="col-span-12 lg:col-span-8">
              <p className="font-display text-2xl sm:text-3xl leading-[1.2] tracking-[-0.015em] text-ink max-w-[34ch]">
                {t('locationHighlight.description')}
              </p>
              <ul className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-y-3 gap-x-8">
                {[
                  t('locationHighlight.benefits.terminal'),
                  t('locationHighlight.benefits.city'),
                  t('locationHighlight.benefits.easy'),
                ].map((b, i) => (
                  <li key={i} className="text-sm text-ink-2 flex items-baseline gap-3">
                    <span className="font-mono text-[10px] tabular text-ink-3 shrink-0">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
