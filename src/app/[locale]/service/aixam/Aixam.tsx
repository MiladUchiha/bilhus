'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import Link from 'next/link';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AixamOriginalServicePage() {
  const rootRef = useRef<HTMLDivElement>(null);

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

      gsap.set(['.hero-eyebrow', '.hero-title', '.hero-sub', '.hero-cta'], { opacity: 0, y: 28 });
      const tl = gsap.timeline({ defaults: { ease: 'expo.out', duration: 1.0 } });
      tl.to('.hero-eyebrow', { opacity: 1, y: 0, duration: 0.6 })
        .to('.hero-title', { opacity: 1, y: 0 }, '-=0.2')
        .to('.hero-sub', { opacity: 1, y: 0, duration: 0.8 }, '-=0.6')
        .to('.hero-cta', { opacity: 1, y: 0, duration: 0.7 }, '-=0.5');
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="bg-paper">
      <section className="relative min-h-[80vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/heropics/2.jpg"
            alt="Aixam mopedbil service"
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/30 to-ink/90" />
        </div>

        <div className="relative z-10 w-full px-5 sm:px-8 lg:px-12 pb-16 sm:pb-20 pt-32">
          <div className="max-w-[1280px] mx-auto">
            <div className="hero-eyebrow flex items-center gap-3 text-paper/80">
              <span className="h-px w-10 bg-paper/60" />
              <span className="font-mono text-[11px] uppercase tracking-[0.18em]">
                Auktoriserad service — Aixam
              </span>
            </div>
            <h1 className="hero-title mt-6 font-display text-paper text-[clamp(2.75rem,8vw,7rem)] leading-[0.95] tracking-[-0.03em] max-w-[14ch]">
              Aixam <span className="italic">service</span>
            </h1>
            <p className="hero-sub mt-6 font-display italic text-2xl sm:text-3xl text-paper/85 max-w-[36ch] leading-[1.3]">
              Specialiserad service för Aixam mopedbilar — för 15-åringar och alla andra.
            </p>
            <div className="hero-cta mt-10 flex flex-col sm:flex-row gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-paper px-7 py-4 text-ink font-medium transition-colors duration-200 hover:bg-garnet hover:text-paper"
              >
                Boka service
              </Link>
              <a
                href="tel:+46700929433"
                className="inline-flex items-center justify-center gap-2 border border-paper/40 px-7 py-4 text-paper transition-colors duration-200 hover:bg-paper hover:text-ink"
              >
                <span className="font-mono tabular">0700 929 433</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-paper-2 border-b border-line">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-12 py-16 sm:py-20">
          <div className="grid grid-cols-12 gap-8" data-reveal>
            <div className="col-span-12 lg:col-span-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-garnet">
                Varför Aixam-service hos oss
              </span>
            </div>
            <div className="col-span-12 lg:col-span-9 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-8">
              {[
                ['01', 'Auktoriserad partner', 'Officiell Aixam-verkstad i Stockholmsområdet.'],
                ['02', 'Specialiserad teknik', 'Tekniker med utbildning för mopedbilars system.'],
                ['03', 'Originaldelar', 'Direkt från Aixams reservdelslager.'],
                ['04', 'Snabb service', 'Oftast färdigt samma dag eller inom 24 h.'],
              ].map(([n, title, desc]) => (
                <div key={n}>
                  <span className="font-mono text-[10px] tabular text-ink-3">{n}</span>
                  <h3 className="mt-2 font-display text-xl text-ink tracking-[-0.015em]">{title}</h3>
                  <p className="mt-2 text-[13px] text-ink-2 leading-[1.55] max-w-[32ch]">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 sm:py-32">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-12 gap-8 mb-16" data-reveal>
            <div className="col-span-12 lg:col-span-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-garnet">
                Vad vi servar
              </span>
            </div>
            <div className="col-span-12 lg:col-span-9">
              <h2 className="font-display text-[clamp(2.25rem,5vw,4rem)] leading-[1.0] tracking-[-0.025em] text-ink max-w-[20ch]">
                Hela bilen — inifrån och ut
              </h2>
              <p className="mt-6 font-display italic text-xl text-ink-2 max-w-[48ch] leading-[1.4]">
                Vi servar hela Aixam-flottan enligt tillverkarens specifikation.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-10 gap-y-12 border-t border-line pt-12" data-reveal>
            <ServiceBlock
              idx="01"
              title="Motor & transmission"
              items={['Dieselmotorservice', 'Variator-system', 'Bromssystem', 'Kylsystem', 'Avgassystem']}
            />
            <ServiceBlock
              idx="02"
              title="Elsystem"
              items={['Belysning', 'Batterisystem', 'Elektronik', 'Säkringar', 'Kabeldragning']}
            />
            <ServiceBlock
              idx="03"
              title="Säkerhet & komfort"
              items={['Säkerhetsbälten', 'Bromsar', 'Värme/ventilation', 'Ljudsystem', 'Karosseri']}
            />
          </div>
        </div>
      </section>

      <section className="bg-paper-2 py-24 sm:py-32">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-12 gap-8 mb-16" data-reveal>
            <div className="col-span-12 lg:col-span-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-garnet">
                Prisexempel
              </span>
            </div>
            <div className="col-span-12 lg:col-span-9">
              <h2 className="font-display text-[clamp(2.25rem,5vw,4rem)] leading-[1.0] tracking-[-0.025em] text-ink max-w-[18ch]">
                Service för <span className="italic">Aixam</span>
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8" data-reveal>
            <PriceTier
              idx="01"
              title="Grundservice"
              from="1 295 kr"
              detail="Årlig service med olja, filter och säkerhetskontroller."
              points={['Oljebyte (motor & variator)', 'Filterbyte', 'Bromskontroll', 'Säkerhetsbälten & belysning']}
            />
            <PriceTier
              idx="02"
              title="Stor service"
              from="1 895 kr"
              detail="Större service med fler kontroller och vätskebyten."
              points={['Allt i grundservice', 'Bromsvätskebyte', 'Kylvätskekontroll', 'Komplett genomgång']}
              variant="dark"
            />
          </div>
        </div>
      </section>

      <section className="py-24 sm:py-32">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-12 gap-8 lg:gap-16 items-start">
            <div className="col-span-12 lg:col-span-6" data-reveal>
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-garnet">
                Specialiteter
              </span>
              <h2 className="mt-3 font-display text-[clamp(2rem,4vw,3rem)] leading-[1.05] tracking-[-0.025em] text-ink max-w-[20ch]">
                Mer än bara service
              </h2>

              <dl className="mt-10 border-t border-line">
                <IntervalRow title="Vinterberedskap" v="Förberedelse av bilen för kalla månader" />
                <IntervalRow title="Skadeverkstad" v="Reparation av krockskador och kosmetiska skador" />
                <IntervalRow title="Karosseriarbete" v="Plåt- och lackeringsarbeten för din mopedbil" />
                <IntervalRow title="Accessoarer" v="Montering av original Aixam-tillbehör" />
              </dl>

              <h3 className="mt-12 font-display text-xl text-ink tracking-[-0.015em]">Det här ingår alltid</h3>
              <ul className="mt-5 space-y-3">
                {[
                  'Auktoriserad Aixam-verkstad',
                  'Specialiserade tekniker',
                  'Originaldelar från Aixam',
                  'Garanti på utfört arbete',
                ].map((line, i) => (
                  <li key={i} className="flex items-baseline gap-3 text-[15px] text-ink leading-[1.55]">
                    <span className="font-mono text-[10px] tabular text-ink-3 shrink-0">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {line}
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-span-12 lg:col-span-6" data-reveal>
              <div className="relative aspect-[5/6] overflow-hidden bg-paper-2">
                <Image
                  src="/heropics/4.jpg"
                  alt="Aixam mopedbilar service"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  quality={92}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-ink text-paper">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-12 py-24 sm:py-32">
          <div className="grid grid-cols-12 gap-8 items-end" data-reveal>
            <div className="col-span-12 lg:col-span-7">
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-paper/50">
                Boka tid
              </span>
              <h2 className="mt-4 font-display text-[clamp(2rem,5vw,4.5rem)] leading-[1.0] tracking-[-0.03em] text-paper max-w-[18ch]">
                Boka din Aixam-service <span className="italic">idag</span>.
              </h2>
              <p className="mt-6 text-base text-paper/70 max-w-[52ch] leading-[1.6]">
                Auktoriserad service för alla Aixam mopedbilar. Lediga tider denna vecka.
              </p>
            </div>
            <div className="col-span-12 lg:col-span-5 flex flex-col sm:flex-row gap-3 lg:justify-end">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-paper px-7 py-4 text-ink font-medium transition-colors duration-200 hover:bg-garnet hover:text-paper"
              >
                Kontakta oss
              </Link>
              <a
                href="tel:+46700929433"
                className="inline-flex items-center justify-center gap-2 border border-paper/40 px-7 py-4 text-paper transition-colors duration-200 hover:bg-paper hover:text-ink"
              >
                <span className="font-mono tabular">0700 929 433</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function ServiceBlock({ idx, title, items }: { idx: string; title: string; items: string[] }) {
  return (
    <div>
      <div className="flex items-baseline gap-3 mb-5">
        <span className="font-mono text-[10px] tabular text-ink-3">{idx}</span>
        <h3 className="font-display text-2xl tracking-[-0.015em] text-ink">{title}</h3>
      </div>
      <ul className="space-y-2.5">
        {items.map((item, i) => (
          <li key={i} className="flex items-baseline gap-3 text-[14px] text-ink-2 leading-[1.55]">
            <span className="font-mono text-[9px] tabular text-ink-3 shrink-0">
              {String(i + 1).padStart(2, '0')}
            </span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function PriceTier({
  idx,
  title,
  from,
  detail,
  points,
  variant = 'light',
}: {
  idx: string;
  title: string;
  from: string;
  detail: string;
  points: string[];
  variant?: 'light' | 'dark';
}) {
  const isDark = variant === 'dark';
  return (
    <div className={`p-10 ${isDark ? 'bg-ink text-paper' : 'bg-paper border border-line text-ink'}`}>
      <div className="flex items-baseline justify-between mb-6">
        <span className={`font-mono text-[10px] tabular ${isDark ? 'text-paper/50' : 'text-ink-3'}`}>{idx}</span>
        <span className={`font-mono text-[10px] uppercase tracking-[0.16em] ${isDark ? 'text-paper/50' : 'text-ink-3'}`}>Från</span>
      </div>
      <h3 className={`font-display text-3xl tracking-[-0.015em] mb-2 ${isDark ? 'text-paper' : 'text-ink'}`}>{title}</h3>
      <p className={`font-mono text-3xl tabular mb-4 ${isDark ? 'text-paper' : 'text-garnet'}`}>{from}</p>
      <p className={`text-sm leading-[1.55] mb-8 max-w-[40ch] ${isDark ? 'text-paper/70' : 'text-ink-2'}`}>{detail}</p>
      <ul className={`space-y-3 border-t pt-6 ${isDark ? 'border-paper/15' : 'border-line'}`}>
        {points.map((p, i) => (
          <li key={i} className={`flex items-baseline gap-3 text-sm leading-[1.55] ${isDark ? 'text-paper/85' : 'text-ink'}`}>
            <span className={`font-mono text-[9px] tabular shrink-0 ${isDark ? 'text-paper/40' : 'text-ink-3'}`}>
              {String(i + 1).padStart(2, '0')}
            </span>
            {p}
          </li>
        ))}
      </ul>
    </div>
  );
}

function IntervalRow({ title, v }: { title: string; v: string }) {
  return (
    <div className="grid grid-cols-12 gap-4 py-5 border-b border-line items-baseline">
      <dt className="col-span-12 sm:col-span-4 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-3">
        {title}
      </dt>
      <dd className="col-span-12 sm:col-span-8 text-[15px] text-ink leading-[1.55]">{v}</dd>
    </div>
  );
}
