'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ServicesSection() {
  const t = useTranslations('servicesSection');
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

  const services = [
    {
      idx: '01',
      title: t('service1.title'),
      subtitle: t('service1.subtitle'),
      description: t('service1.description'),
      features: [t('service1.feature1'), t('service1.feature2'), t('service1.feature3')],
      highlight: t('service1.highlight'),
      href: '/service/hyundai',
    },
    {
      idx: '02',
      title: t('service2.title'),
      subtitle: t('service2.subtitle'),
      description: t('service2.description'),
      features: [t('service2.feature1'), t('service2.feature2'), t('service2.feature3')],
      highlight: t('service2.highlight'),
      href: '/service/aixam',
    },
    {
      idx: '03',
      title: t('service3.title'),
      subtitle: t('service3.subtitle'),
      description: t('service3.description'),
      features: [t('service3.feature1'), t('service3.feature2'), t('service3.feature3')],
      highlight: t('service3.highlight'),
      href: '/service',
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="bg-paper-2 py-24 sm:py-32 lg:py-40"
    >
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Header — asymmetric */}
        <div className="grid grid-cols-12 gap-8 mb-20 sm:mb-28">
          <div className="col-span-12 lg:col-span-3" data-reveal>
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-garnet" />
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-garnet">
                {t('titleEmphasis')}
              </span>
            </div>
          </div>
          <div className="col-span-12 lg:col-span-9" data-reveal>
            <h2 className="font-display text-[clamp(2.25rem,5vw,4.25rem)] leading-[1.02] tracking-[-0.025em] text-ink max-w-[16ch]">
              {t('title')}
            </h2>
          </div>
        </div>

        {/* Services — editorial list, not cards */}
        <div className="divide-y divide-line border-y border-line">
          {services.map((s) => (
            <Link
              key={s.idx}
              href={s.href}
              data-reveal
              className="group grid grid-cols-12 gap-6 lg:gap-10 py-10 lg:py-14 transition-colors duration-300 hover:bg-paper"
            >
              <div className="col-span-12 lg:col-span-1 flex items-start">
                <span className="font-mono text-[11px] tabular uppercase tracking-[0.15em] text-ink-3">
                  {s.idx}
                </span>
              </div>

              <div className="col-span-12 lg:col-span-4">
                <h3 className="font-display text-3xl lg:text-[2.5rem] leading-[1.05] tracking-[-0.02em] text-ink transition-colors duration-300 group-hover:text-garnet">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm text-ink-3 font-mono uppercase tracking-[0.12em]">
                  {s.subtitle}
                </p>
              </div>

              <div className="col-span-12 lg:col-span-5">
                <p className="text-[15px] sm:text-base text-ink-2 leading-[1.65] max-w-[55ch]">
                  {s.description}
                </p>
                <ul className="mt-5 space-y-1.5">
                  {s.features.map((f, i) => (
                    <li key={i} className="text-sm text-ink-2 flex items-baseline gap-3">
                      <span className="font-mono text-[10px] tabular text-ink-3">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="col-span-12 lg:col-span-2 flex lg:justify-end items-start">
                <span className="inline-flex items-center gap-2 text-sm font-medium text-ink transition-colors duration-300 group-hover:text-garnet">
                  <span className="link-underline">{s.highlight}</span>
                  <svg
                    className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA bar */}
        <div data-reveal className="mt-20 lg:mt-28 grid grid-cols-12 gap-8 items-end">
          <div className="col-span-12 lg:col-span-7">
            <h3 className="font-display text-3xl lg:text-4xl tracking-[-0.02em] text-ink max-w-[20ch] leading-[1.1]">
              {t('cta.title')}
            </h3>
            <p className="mt-4 text-base text-ink-2 max-w-[50ch] leading-[1.6]">
              {t('cta.description')}
            </p>
          </div>
          <div className="col-span-12 lg:col-span-5 flex flex-col sm:flex-row gap-3 lg:justify-end">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-garnet px-7 py-4 text-paper font-medium transition-colors duration-200 hover:bg-garnet-hover"
            >
              {t('cta.button')}
            </Link>
            <a
              href="tel:+46700929433"
              className="inline-flex items-center justify-center gap-2 border border-ink px-7 py-4 text-ink transition-colors duration-200 hover:bg-ink hover:text-paper"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              {t('cta.call')}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
