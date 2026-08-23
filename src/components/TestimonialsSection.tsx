'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface Testimonial {
  id: number;
  name: string;
  location: string;
  service: string;
  rating: number;
  comment: string;
  date: string;
  car?: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Enis Maljici',
    location: '',
    service: 'Bilköp',
    rating: 5,
    comment:
      'Jag köpte nyligen en bil från Märsta bilhus och jag är verkligen väldigt nöjd med mitt köp. Personalens bemötande var utmärkt; de var trevliga, hjälpsamma och mycket professionella genom hela processen. De tog sig tid att svara på alla mina frågor och gjorde att jag kände mig trygg i mitt val.',
    date: '2024-02-20',
  },
  {
    id: 2,
    name: 'Ahmad Mnawar',
    location: '',
    service: 'Bilköp',
    rating: 5,
    comment:
      'Jag köpte en bil. Riktigt fin service, trevliga personal och jag fick en riktig smidig affär. Rekommenderas starkt.',
    date: '2024-01-20',
  },
  {
    id: 3,
    name: 'radkobg radkobg',
    location: 'Bulgarien',
    service: 'Bilköp · Volkswagen Touran',
    rating: 5,
    comment:
      'Jag köpte en Volkswagen Touran på gas för tre år sedan. Bilen är fortfarande felfri. Bytte bakre bromsbelägg och skivor efter 100 000 km. Körde bilen hem till Bulgarien utan problem och den fungerar fortfarande utmärkt.',
    date: '2023-11-15',
  },
  {
    id: 4,
    name: 'Dmitry Grishchenko',
    location: 'Stockholm',
    service: 'Bilservice',
    rating: 5,
    comment:
      'Använt dem två gånger för service av min bil. Bästa priset jag hittat i Stockholm, servicen är väl dokumenterad. Erbjuder gratis lånebil (KIA Picanto, automat). Du kan lita på att de bara byter lampor, torkarblad etc. om det verkligen behövs.',
    date: '2023-05-10',
  },
  {
    id: 5,
    name: 'Azad Jalil',
    location: '',
    service: 'Försäkring, service och finans',
    rating: 5,
    comment:
      'Bilhus AB hjälpte mig med allt från försäkring till service och gav jättebra finans. Fick kontakt med en super bra säljare som hjälpte oss med allt som gick smidigt och enkelt redan från första stund.',
    date: '2023-05-01',
  },
  {
    id: 6,
    name: 'JO.Joker Gamer',
    location: '',
    service: 'Bilköp',
    rating: 5,
    comment:
      'Har handlat min fina bil av detta seriösa företag. Riktigt fin service, trevliga personal och erbjöd en riktig smidig affär.',
    date: '2023-04-15',
  },
  {
    id: 7,
    name: 'Petra Wilund',
    location: 'Gävle',
    service: 'Akut bilservice',
    rating: 5,
    comment:
      'Otroligt trevliga och hjälpsamma när vi kom från Gävle och vår bil började gå dåligt. Tog in vår bil direkt, felsökte, fixade och gav goda råd.',
    date: '2019-06-10',
  },
  {
    id: 8,
    name: 'Alex K',
    location: '',
    service: 'Bilköp',
    rating: 5,
    comment:
      'Har varit i många bilsalonger i jakt efter min första bil, och kan med all säkerhet säga att det är svårt att hitta ett bättre bemötande både från ägaren och personalen än det ni får uppleva på Märsta Bilhus.',
    date: '2021-05-01',
  },
  {
    id: 9,
    name: 'Alicja Löfqvist',
    location: '',
    service: 'Bilköp',
    rating: 5,
    comment: 'En seriös bilhandlare. Mycket bra service och trevligt bemötande. Rekommenderar starkt.',
    date: '2018-04-01',
  },
];

export default function TestimonialsSection() {
  const t = useTranslations('testimonials');
  const sectionRef = useRef<HTMLElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

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

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentIndex((p) => (p + 1) % testimonials.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const formatDate = (s: string) =>
    new Date(s).toLocaleDateString('sv-SE', { year: 'numeric', month: 'long' });

  const current = testimonials[currentIndex];

  return (
    <section
      ref={sectionRef}
      className="bg-paper-2 py-24 sm:py-32 lg:py-40"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="grid grid-cols-12 gap-8 mb-16 sm:mb-20">
          <div className="col-span-12 lg:col-span-3" data-reveal>
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-garnet" />
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-garnet">
                {t('title')}
              </span>
            </div>
          </div>
          <div className="col-span-12 lg:col-span-9" data-reveal>
            <h2 className="font-display text-[clamp(2.25rem,5vw,4.5rem)] leading-[1.0] tracking-[-0.025em] text-ink max-w-[20ch]">
              {t('titleEmphasized')}
            </h2>
            <p className="mt-6 font-display italic text-xl text-ink-2 max-w-[44ch] leading-[1.4]">
              {t('subtitle')}
            </p>
          </div>
        </div>

        {/* Featured testimonial — editorial pull quote */}
        <div data-reveal className="grid grid-cols-12 gap-8 mb-20 lg:mb-28">
          <div className="col-span-12 lg:col-span-2 flex lg:flex-col">
            <span className="font-display text-[6rem] lg:text-[8rem] leading-none text-garnet/40 italic">
              &ldquo;
            </span>
          </div>
          <div className="col-span-12 lg:col-span-10">
            <blockquote className="font-display text-2xl sm:text-3xl lg:text-[2.5rem] leading-[1.25] tracking-[-0.015em] text-ink max-w-[42ch]">
              {current.comment}
            </blockquote>

            <div className="mt-10 grid grid-cols-12 gap-4 items-baseline border-t border-line pt-6">
              <div className="col-span-12 sm:col-span-4">
                <p className="font-display text-lg italic text-ink">{current.name}</p>
                {current.location && (
                  <p className="font-mono text-xs uppercase tracking-[0.14em] text-ink-3 mt-1">
                    {current.location}
                  </p>
                )}
              </div>
              <div className="col-span-12 sm:col-span-4 font-mono text-xs uppercase tracking-[0.14em] text-ink-3">
                {current.service}
              </div>
              <div className="col-span-12 sm:col-span-4 sm:text-right font-mono text-xs tabular uppercase tracking-[0.14em] text-ink-3">
                {formatDate(current.date)}
              </div>
            </div>

            {/* Pagination */}
            <div className="mt-10 flex items-center gap-6">
              <span className="font-mono text-xs tabular text-ink-3">
                {String(currentIndex + 1).padStart(2, '0')} / {String(testimonials.length).padStart(2, '0')}
              </span>
              <div className="flex-1 flex gap-1">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentIndex(i)}
                    className={`flex-1 h-px transition-colors duration-500 ${
                      i === currentIndex ? 'bg-ink' : 'bg-line hover:bg-ink/40'
                    }`}
                    aria-label={`Review ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Excerpts — three short reviews as marginalia */}
        <div data-reveal className="border-t border-line pt-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 lg:gap-16">
            {testimonials.slice(0, 3).map((tm) => (
              <figure key={tm.id} className="flex flex-col">
                <p className="text-[15px] text-ink leading-[1.6]">
                  &ldquo;{tm.comment.length > 160 ? tm.comment.slice(0, 160) + '…' : tm.comment}&rdquo;
                </p>
                <figcaption className="mt-5 pt-5 border-t border-line">
                  <p className="font-display italic text-ink">{tm.name}</p>
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-3 mt-1">
                    {tm.service}
                  </p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div data-reveal className="grid grid-cols-12 gap-8 mt-24 lg:mt-32 pt-16 border-t border-line items-end">
          <div className="col-span-12 lg:col-span-7">
            <h3 className="font-display text-3xl lg:text-4xl tracking-[-0.02em] text-ink leading-[1.1] max-w-[22ch]">
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
              {t('cta.contact')}
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center justify-center gap-2 border border-ink px-7 py-4 text-ink transition-colors duration-200 hover:bg-ink hover:text-paper"
            >
              {t('cta.readMore')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
