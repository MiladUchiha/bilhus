'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslations } from 'next-intl';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ContactSection() {
  const t = useTranslations('contact');
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
        gsap.from(el, {
          y: 24,
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
      className="bg-paper py-24 sm:py-32 lg:py-40"
    >
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="grid grid-cols-12 gap-8 mb-20 sm:mb-24">
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
            <p className="mt-6 font-display italic text-xl text-ink-2 max-w-[44ch] leading-[1.4]">
              {t('subtitle')}
            </p>
          </div>
        </div>

        {/* Main content — 2 columns */}
        <div className="grid grid-cols-12 gap-12 lg:gap-16 mb-24 lg:mb-32">
          {/* Left: contact methods */}
          <div data-reveal className="col-span-12 lg:col-span-6">
            <ChannelBlock
              label={t('phone.title')}
              eyebrow="01"
              description={t('phone.description')}
              rows={[
                { label: t('phone.carSales'), value: '0700 929 433', href: 'tel:+46700929433' },
                { label: t('phone.workshop'), value: '08-59 120 541', href: 'tel:+46859120541' },
              ]}
            />
            <ChannelBlock
              label={t('email.title')}
              eyebrow="02"
              description={t('email.description')}
              rows={[
                { label: t('email.sales'), value: 'info@marstabilhus.se', href: 'mailto:info@marstabilhus.se' },
                { label: t('email.workshop'), value: 'kundservice@marstabilhus.se', href: 'mailto:kundservice@marstabilhus.se' },
              ]}
            />
            <ChannelBlock
              label={t('visit.title')}
              eyebrow="03"
              description={t('visit.description')}
              rows={[
                { label: t('information.address'), value: t('visit.address') },
                { label: '', value: t('visit.postal') },
                { label: t('visit.benefits'), value: '' },
              ]}
              last
            />
          </div>

          {/* Right: opening hours */}
          <div data-reveal className="col-span-12 lg:col-span-6">
            <div className="lg:sticky lg:top-28">
              <h3 className="font-display text-3xl tracking-[-0.02em] text-ink mb-10">
                {t('openingHours.title')}
              </h3>

              <div className="border-t border-line">
                <HoursBlock
                  title={t('openingHours.carSales')}
                  rows={[
                    [t('openingHours.mondayThursday'), '09:00 – 18:00'],
                    [t('openingHours.friday'), '09:00 – 17:00'],
                    [t('openingHours.saturday'), '11:00 – 15:00'],
                    [t('openingHours.sunday'), t('openingHours.byAgreement')],
                  ]}
                />
                <HoursBlock
                  title={t('openingHours.workshop')}
                  rows={[
                    [t('openingHours.mondayFriday'), '07:30 – 16:30'],
                    [t('openingHours.weekends'), t('openingHours.closed')],
                  ]}
                />
              </div>

              <p className="mt-8 text-sm text-ink-2 leading-[1.6] max-w-[40ch]">
                {t('openingHours.tip')}
              </p>

              {/* Location benefits */}
              <div className="mt-12 pt-8 border-t border-line">
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-3 mb-5 block">
                  {t('locationBenefits.title')}
                </span>
                <ul className="space-y-4">
                  {[
                    [t('locationBenefits.travelers.title'), t('locationBenefits.travelers.description')],
                    [t('locationBenefits.highway.title'), t('locationBenefits.highway.description')],
                    [t('locationBenefits.parking.title'), t('locationBenefits.parking.description')],
                  ].map(([title, desc], i) => (
                    <li key={i} className="grid grid-cols-12 gap-3">
                      <span className="col-span-12 sm:col-span-4 text-sm font-medium text-ink">
                        {title}
                      </span>
                      <span className="col-span-12 sm:col-span-8 text-sm text-ink-2 leading-[1.55]">
                        {desc}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Map — full-bleed editorial */}
        <div data-reveal className="border-t border-line pt-16 lg:pt-20 mb-20 lg:mb-28">
          <div className="grid grid-cols-12 gap-8 mb-10">
            <div className="col-span-12 lg:col-span-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-garnet">
                {t('map.title')}
              </span>
            </div>
            <div className="col-span-12 lg:col-span-9">
              <h3 className="font-display text-3xl lg:text-4xl tracking-[-0.02em] text-ink leading-[1.1] max-w-[26ch]">
                {t('map.addressTitle')}
              </h3>
            </div>
          </div>

          <div className="relative aspect-[16/9] sm:aspect-[21/9] overflow-hidden bg-paper-2 border border-line">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2026.5962836474654!2d17.9163447!3d59.6520228!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x465f9d46c2f3e3d5%3A0x41e7c7c7c7c7c7c7!2sMaskingatan%2012%2C%20195%2060%20Arlandastad%2C%20Sweden!5e0!3m2!1sen!2sse!4v1703123456789!5m2!1sen!2sse"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Märsta Bilhus AB - Maskingatan 12, Arlandastad"
              className="grayscale-[60%] hover:grayscale-0 transition-all duration-500"
            />
          </div>

          <div className="mt-8 grid grid-cols-12 gap-8">
            <div className="col-span-12 md:col-span-4 lg:col-span-4">
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-3">
                {t('map.company')}
              </span>
              <address className="not-italic mt-3 text-base text-ink leading-[1.55]">
                {t('visit.address')}<br />
                <span className="font-mono tabular text-sm">{t('visit.postal')}</span><br />
                {t('visit.country')}
              </address>
            </div>
            <div className="col-span-12 md:col-span-8 lg:col-span-8">
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-3 block mb-3">
                {t('map.directionsTitle')}
              </span>
              <ul className="space-y-2 text-sm text-ink-2 leading-[1.55]">
                <li className="flex items-baseline gap-3">
                  <span className="font-mono text-[10px] tabular text-ink-3 shrink-0">01</span>
                  {t('map.fromE4')}
                </li>
                <li className="flex items-baseline gap-3">
                  <span className="font-mono text-[10px] tabular text-ink-3 shrink-0">02</span>
                  {t('map.fromAirport')}
                </li>
                <li className="flex items-baseline gap-3">
                  <span className="font-mono text-[10px] tabular text-ink-3 shrink-0">03</span>
                  {t('map.freeParking')}
                </li>
              </ul>
              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm">
                <a
                  href="https://maps.google.com/?q=Märsta+Bilhus+AB,+Maskingatan+12,+195+60+Arlandastad"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-ink hover:text-garnet transition-colors duration-200"
                >
                  <span className="link-underline">{t('map.googleMaps')}</span>
                  <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5h5v5M19 5l-9 9" />
                  </svg>
                </a>
                <a
                  href="https://www.apple.com/maps/?q=Märsta+Bilhus+AB,+Maskingatan+12,+195+60+Arlandastad"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-ink hover:text-garnet transition-colors duration-200"
                >
                  <span className="link-underline">{t('map.appleMaps')}</span>
                  <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5h5v5M19 5l-9 9" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom block — call us directly */}
        <div data-reveal className="border-t border-line pt-16">
          <div className="grid grid-cols-12 gap-8 items-end">
            <div className="col-span-12 lg:col-span-7">
              <h3 className="font-display text-3xl lg:text-4xl tracking-[-0.02em] text-ink leading-[1.1] max-w-[26ch]">
                {t('emergency.title')}
              </h3>
              <p className="mt-4 text-base text-ink-2 max-w-[52ch] leading-[1.6]">
                {t('emergency.description')}
              </p>
            </div>
            <div className="col-span-12 lg:col-span-5 flex flex-col sm:flex-row gap-3 lg:justify-end">
              <a
                href="tel:+46700929433"
                className="inline-flex items-center justify-center gap-2 bg-garnet px-7 py-4 text-paper font-medium transition-colors duration-200 hover:bg-garnet-hover"
              >
                {t('emergency.carSales')}
              </a>
              <a
                href="tel:+46859120541"
                className="inline-flex items-center justify-center gap-2 border border-ink px-7 py-4 text-ink transition-colors duration-200 hover:bg-ink hover:text-paper"
              >
                {t('emergency.workshop')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ChannelBlock({
  label,
  eyebrow,
  description,
  rows,
  last,
}: {
  label: string;
  eyebrow: string;
  description: string;
  rows: { label: string; value: string; href?: string }[];
  last?: boolean;
}) {
  return (
    <div className={`py-8 ${last ? '' : 'border-b border-line'} ${eyebrow === '01' ? 'pt-0' : ''}`}>
      <div className="grid grid-cols-12 gap-4 items-baseline mb-4">
        <span className="col-span-2 font-mono text-[10px] tabular text-ink-3 uppercase tracking-[0.16em]">
          {eyebrow}
        </span>
        <h3 className="col-span-10 font-display text-2xl tracking-[-0.015em] text-ink">
          {label}
        </h3>
      </div>
      <p className="text-sm text-ink-2 max-w-[44ch] leading-[1.55] mb-6 pl-[calc(16.666%+1rem)]">
        {description}
      </p>
      <ul className="space-y-3 pl-[calc(16.666%+1rem)]">
        {rows.map((row, i) => (
          <li key={i} className="grid grid-cols-12 gap-3 items-baseline">
            {row.label && (
              <span className="col-span-12 sm:col-span-4 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-3">
                {row.label}
              </span>
            )}
            {row.value && (
              row.href ? (
                <a
                  href={row.href}
                  className={`${row.label ? 'col-span-12 sm:col-span-8' : 'col-span-12'} text-base text-ink hover:text-garnet transition-colors duration-200`}
                >
                  <span className="font-mono tabular">{row.value}</span>
                </a>
              ) : (
                <span className={`${row.label ? 'col-span-12 sm:col-span-8' : 'col-span-12'} text-base text-ink`}>
                  {row.value}
                </span>
              )
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

function HoursBlock({ title, rows }: { title: string; rows: [string, string][] }) {
  return (
    <div className="py-8 border-b border-line last:border-0">
      <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-3 block mb-4">
        {title}
      </span>
      <ul className="space-y-2">
        {rows.map(([day, hours], i) => (
          <li key={i} className="flex items-baseline justify-between gap-4">
            <span className="text-base text-ink">{day}</span>
            <span className="font-mono text-sm tabular text-ink-2">{hours}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
